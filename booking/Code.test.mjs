// Run: node --test booking/
import { test } from 'node:test'
import assert from 'node:assert/strict'
import { createGas } from './gas-stub.mjs'

const guest = { action: 'book', date: '2026-11-25', time: '19:00', guests: 4, name: 'Lan', phone: '0912 345 678' }

test('a valid booking is saved and the owner is emailed', () => {
  const gas = createGas({ props: { NOTIFY_EMAIL: 'owner@example.com' } })
  const res = gas.post(guest)
  assert.equal(res.ok, true)
  const rows = gas.sheet().cells
  assert.equal(rows.length, 2) // header + booking
  assert.deepEqual(rows[1].slice(2, 7), ['2026-11-25', '19:00', '4', 'Lan', '0912 345 678'])
  assert.equal(gas.state.mails.length, 1)
  assert.equal(gas.state.mails[0].to, 'owner@example.com')
  assert.match(gas.state.mails[0].subject, /4 khách · 25\/11\/2026 19:00 · Lan/)
  assert.match(gas.state.mails[0].body, /Chỗ còn lại khung 19:00: 26\/30/)
  assert.match(gas.state.mails[0].body, /SĐT: 0912 345 678\n\nChỗ còn lại/) // no blank line for missing optional fields
})

test('the 30-guest cap counts overlapping bookings and walk-ins', () => {
  const gas = createGas({ now: '2026-11-25T18:00:00+07:00', props: { STAFF_PIN: '246810' } })
  assert.equal(gas.post({ ...guest, phone: '0900000001', guests: 10, time: '18:30' }).ok, true)
  assert.equal(gas.post({ ...guest, phone: '0900000002', guests: 10, time: '19:30' }).ok, true)
  assert.equal(gas.post({ action: 'walkin', pin: '246810', guests: 8 }).ok, true) // 18:00, stays until 20:00

  // 19:30–21:30 overlaps the 18:30 booking until 20:30 and the walk-in until 20:00: peak 28 seated.
  const full = gas.post({ ...guest, phone: '0900000003', guests: 3, time: '19:30' })
  assert.deepEqual(full, { ok: false, error: 'full', remaining: 2 })
  assert.equal(gas.post({ ...guest, phone: '0900000003', guests: 2, time: '19:30' }).ok, true)

  // 20:30: the 18:30 booking and the walk-in have left; only the 19:30 groups (12) remain.
  const slot = gas.get({ action: 'availability', date: '2026-11-25' }).slots.find(s => s.time === '20:30')
  assert.equal(slot.remaining, 18)
})

test('manual rows typed by staff count, cancelled ones do not', () => {
  const gas = createGas()
  const sheet = gas.sheet()
  sheet.cells.push(['', '', '25/11/2026', '19h00', '20', 'Tiệc', '', '', '', 'phone', ''])
  sheet.cells.push(['', '', '25/11', '19:00', '10', 'Huỷ', '', '', '', 'phone', 'Huỷ'])
  const slot = gas.get({ action: 'availability', date: '2026-11-25' }).slots.find(s => s.time === '19:00')
  assert.equal(slot.remaining, 10)
})

test('rejects past dates, too-soon slots, bad input, and bots', () => {
  const gas = createGas({ now: '2026-11-25T18:50:00+07:00' })
  assert.equal(gas.post({ ...guest, date: '2026-11-24' }).error, 'invalid_date')
  assert.equal(gas.post({ ...guest, time: '19:00' }).error, 'too_soon')
  assert.equal(gas.post({ ...guest, time: '19:15' }).error, 'invalid_time')
  assert.equal(gas.post({ ...guest, time: '21:00' }).error, 'invalid_time')
  assert.equal(gas.post({ ...guest, time: '19:30', guests: 11 }).error, 'invalid_guests')
  assert.equal(gas.post({ ...guest, time: '19:30', phone: 'abc' }).error, 'invalid_phone')
  assert.equal(gas.post({ ...guest, time: '19:30', name: '  ' }).error, 'invalid_name')
  assert.equal(gas.post({ ...guest, time: '19:30', website: 'spam.example' }).ok, true)
  assert.equal(gas.sheet().cells.length, 1) // only the header: nothing was saved
  const today = gas.get({ action: 'availability', date: '2026-11-25' }).slots
  assert.equal(today.find(s => s.time === '19:00').open, false)
  assert.equal(today.find(s => s.time === '19:30').open, true)
})

test('formula-looking input is stored as text', () => {
  const gas = createGas()
  assert.equal(gas.post({ ...guest, name: '=IMPORTXML("x")', phone: '+84 912 345 678' }).ok, true)
  const row = gas.sheet().cells[1]
  assert.equal(row[5], '=IMPORTXML("x")') // the stub strips the leading apostrophe, as Sheets displays it
})

test('one phone number gets at most two bookings per day', () => {
  const gas = createGas()
  assert.equal(gas.post(guest).ok, true)
  assert.equal(gas.post({ ...guest, time: '12:00' }).ok, true)
  assert.equal(gas.post({ ...guest, time: '13:00' }).error, 'duplicate')
})

test('staff actions need the right PIN; 10 wrong tries lock only that IP', () => {
  const gas = createGas({ props: { STAFF_PIN: '246810' } })
  assert.equal(gas.post({ action: 'status', pin: '246810', ip: '1.1.1.1' }).ok, true)
  for (let i = 0; i < 10; i++) assert.equal(gas.post({ action: 'walkin', pin: '000000', guests: 2, ip: '6.6.6.6' }).error, 'wrong_pin')
  assert.equal(gas.post({ action: 'walkin', pin: '246810', guests: 2, ip: '6.6.6.6' }).error, 'locked')
  assert.equal(gas.post({ action: 'walkin', pin: '246810', guests: 2, ip: '1.1.1.1' }).ok, true)
  assert.equal(createGas().post({ action: 'status', pin: '' }).error, 'staff_disabled')
})

test('one IP can save at most 3 bookings in 6 hours, but may retry failed attempts', () => {
  const gas = createGas()
  const from = (n, extra = {}) => gas.post({ ...guest, phone: `09000000${n}0`, ip: '7.7.7.7', ...extra })
  for (let i = 0; i < 5; i++) assert.equal(from(1, { phone: 'typo' }).error, 'invalid_phone')
  assert.equal(from(1).ok, true)
  assert.equal(from(2).ok, true)
  assert.equal(from(3).ok, true)
  assert.equal(from(4).error, 'limit')
  assert.equal(gas.post({ ...guest, phone: '0911111111', ip: '8.8.8.8' }).ok, true)
})
