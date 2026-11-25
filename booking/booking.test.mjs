// Run: node --test booking/
// Exercises api/booking.ts end to end through its HTTP handlers, with fake Redis and Telegram.
import { test } from 'node:test'
import assert from 'node:assert/strict'
import { createHash } from 'node:crypto'
import { installFakes, REDIS_URL } from './fake-services.mjs'

process.env.KV_REST_API_URL = REDIS_URL
process.env.KV_REST_API_TOKEN = 'test'
process.env.TELEGRAM_BOT_TOKEN = '123:test'
const { GET, POST } = await import('../api/booking.ts')
const SECRET = createHash('sha256').update('webhook:123:test').digest('hex').slice(0, 48)
const STAFF = -1001
const DAY = '2026-11-25'
const guest = { action: 'book', date: DAY, time: '19:00', guests: 4, name: 'Lan', phone: '0912 345 678' }
const OWNER = { id: 1, first_name: 'Duy' }
const STAFF_USER = { id: 2, first_name: 'Hoa' }
const MANAGER = { id: 3, first_name: 'Minh' }

let fakes
/** Fresh fake services, a fixed Hanoi clock, and (unless told otherwise) a registered staff group. */
function setup(t, { now = `${DAY}T12:00:00+07:00`, staff = true } = {}) {
  fakes = installFakes()
  t.after(fakes.restore)
  t.mock.timers.enable({ apis: ['Date'], now: new Date(now) })
  if (staff) {
    fakes.data.set('tg:chat', String(STAFF))
    fakes.data.set('tg:roles', new Map([[String(OWNER.id), JSON.stringify({ role: 'owner', name: 'Duy' })]]))
  }
}

const http = (body, headers) => POST(new Request('https://dana.test/api/booking', { method: 'POST', headers, body: JSON.stringify(body) }))
const post = async (body, ip = '203.0.113.1') => (await http(body, { 'x-real-ip': ip })).json()
const get = async params => (await GET(new Request(`https://dana.test/api/booking?${new URLSearchParams(params)}`))).json()
const seats = async (time, date = DAY) => (await get({ action: 'availability', date })).slots.find(s => s.time === time).remaining
const bot = (update, secret = SECRET) => http(update, { 'x-telegram-bot-api-secret-token': secret })
const say = (text, { chat = STAFF, from = OWNER, replyTo } = {}) => bot({ message: {
  message_id: 1, chat: { id: chat }, from, text, ...(replyTo && { reply_to_message: { message_id: 0, chat: { id: chat }, from: replyTo } }),
} })
const press = (data, { chat = STAFF, from = OWNER } = {}) => bot({ callback_query: { id: 'q1', from, data, message: { message_id: 1, chat: { id: chat } } } })
const calls = method => fakes.telegram.filter(c => c.method === method)
const lastText = () => calls('sendMessage').at(-1)?.body.text

test('a web booking is saved and posted to the staff group with buttons', async t => {
  setup(t)
  const res = await post(guest)
  assert.equal(res.ok, true)
  assert.match(res.id, /^D[0-9A-F]{6}$/)
  assert.equal(await seats('19:00'), 26)
  const msg = calls('sendMessage').at(-1).body
  assert.equal(msg.chat_id, String(STAFF))
  assert.match(msg.text, /25\/11\/2026 · 19:00 · 4 khách\nLan · 0912 345 678\nMã: D[0-9A-F]{6} · Chờ xác nhận\nChỗ còn lại khung 19:00: 26\/30/)
  assert.deepEqual(msg.reply_markup.inline_keyboard.map(row => row.map(b => b.text)), [['✅ Xác nhận'], ['Đã về', 'Không đến', 'Huỷ']])
})

test('before a staff group is registered, bookings still work and nothing is sent', async t => {
  setup(t, { staff: false })
  assert.equal((await post(guest)).ok, true)
  assert.equal(calls('sendMessage').length, 0)
})

test('the 30-guest cap counts overlapping bookings and walk-ins from /khach', async t => {
  setup(t, { now: `${DAY}T18:00:00+07:00` })
  assert.equal((await post({ ...guest, phone: '0900000001', guests: 10, time: '18:30' })).ok, true)
  assert.equal((await post({ ...guest, phone: '0900000002', guests: 10, time: '19:30' })).ok, true)
  await say('/khach 8') // 18:00, stays until 20:00
  assert.match(lastText(), /Khách vãng lai[\s\S]*Đang ngồi: 8\/30/)

  // 19:30–21:30 overlaps the 18:30 booking until 20:30 and the walk-in until 20:00: peak 28 seated.
  assert.deepEqual(await post({ ...guest, phone: '0900000003', guests: 3, time: '19:30' }), { ok: false, error: 'full', remaining: 2 })
  assert.equal((await post({ ...guest, phone: '0900000003', guests: 2, time: '19:30' })).ok, true)
  // 20:30: the 18:30 booking and the walk-in have left; only the 19:30 groups (12) remain.
  assert.equal(await seats('20:30'), 18)
})

test('rejects bad dates, too-soon slots, bad input, and bots', async t => {
  setup(t)
  const err = async patch => (await post({ ...guest, ...patch })).error
  assert.equal(await err({ date: '2026-11-24' }), 'invalid_date')
  assert.equal(await err({ date: '2026-02-30' }), 'invalid_date')
  assert.equal(await err({ date: '2027-03-01' }), 'invalid_date') // more than 60 days ahead
  assert.equal(await err({ time: '12:00' }), 'too_soon')
  assert.equal(await err({ time: '19:15' }), 'invalid_time')
  assert.equal(await err({ time: '23:00' }), 'invalid_time')
  assert.equal(await err({ guests: 11 }), 'invalid_guests')
  assert.equal(await err({ guests: 0 }), 'invalid_guests')
  assert.equal(await err({ name: '   ' }), 'invalid_name')
  assert.equal(await err({ phone: 'call me' }), 'invalid_phone')
  assert.equal(await err({ email: 'nope' }), 'invalid_email')
  assert.deepEqual(await post({ ...guest, website: 'spam.example' }), { ok: true, id: 'ok' }) // honeypot
  assert.equal(await seats('19:00'), 30)
})

test('one phone number gets at most two bookings per day', async t => {
  setup(t)
  assert.equal((await post(guest)).ok, true)
  assert.equal((await post({ ...guest, time: '13:00' })).ok, true)
  assert.equal((await post({ ...guest, time: '15:00' })).error, 'duplicate')
})

test('one IP can save at most 3 bookings in 6 hours, but may retry failed attempts', async t => {
  setup(t)
  assert.equal((await post({ ...guest, phone: 'x' })).error, 'invalid_phone')
  for (const n of [1, 2, 3]) assert.equal((await post({ ...guest, phone: `090000000${n}` })).ok, true)
  assert.equal((await post({ ...guest, phone: '0900000004' })).error, 'limit')
  assert.equal((await post({ ...guest, phone: '0900000004' }, '198.51.100.9')).ok, true)
})

test('a guest cancels with booking code + phone: seats are freed and staff are told', async t => {
  setup(t)
  const { id } = await post({ ...guest, guests: 10 })
  assert.equal(await seats('19:00'), 20)
  assert.equal((await post({ action: 'cancel', id, phone: '0999 999 999' })).error, 'not_found') // right code, wrong phone
  assert.equal((await post({ action: 'cancel', id: 'DABCDEF', phone: guest.phone })).error, 'not_found')
  // Code is case-insensitive; +84 and 0 forms of the same number match.
  assert.deepEqual(await post({ action: 'cancel', id: ` ${id.toLowerCase()} `, phone: '+84 912 345 678' }),
    { ok: true, date: DAY, time: '19:00', guests: 10 })
  assert.equal(await seats('19:00'), 30)
  assert.match(lastText(), /Khách tự huỷ: 19:00 25\/11\/2026 · 10 khách · Lan/)
  const edit = calls('editMessageText').at(-1).body
  assert.match(edit.text, /Khách tự huỷ$/)
  assert.deepEqual(edit.reply_markup.inline_keyboard, []) // buttons removed from the original message
  assert.equal(calls('sendMessage').at(-1).body.reply_parameters.message_id, 101) // replies to the original
  assert.equal((await post({ action: 'cancel', id, phone: guest.phone })).error, 'inactive')
})

test('a booking cannot be cancelled online once its time has come', async t => {
  setup(t)
  const { id } = await post({ ...guest, time: '13:00' })
  t.mock.timers.setTime(Date.parse(`${DAY}T13:00:00+07:00`))
  assert.equal((await post({ action: 'cancel', id, phone: guest.phone })).error, 'past')
})

test('cancel attempts are limited to 10 per hour per IP', async t => {
  setup(t)
  const attempt = ip => post({ action: 'cancel', id: 'D000000', phone: guest.phone }, ip)
  for (let i = 0; i < 10; i++) assert.equal((await attempt('1.2.3.4')).error, 'not_found')
  assert.equal((await attempt('1.2.3.4')).error, 'busy')
  assert.equal((await attempt('5.6.7.8')).error, 'not_found')
})

test('the bot ignores forged webhooks and strangers; /batdau registers only the first chat', async t => {
  setup(t, { staff: false })
  await bot({ message: { message_id: 1, chat: { id: STAFF }, from: OWNER, text: '/batdau' } }, 'wrong-secret')
  assert.equal(fakes.data.get('tg:chat'), undefined)
  await say('/batdau')
  assert.equal(fakes.data.get('tg:chat'), String(STAFF))
  assert.match(lastText(), /Đã gắn bot với nhóm này\. Duy là chủ quán\./)
  assert.equal(JSON.parse(fakes.data.get('tg:roles').get('1')).role, 'owner')
  await say('/batdau', { chat: 777, from: STAFF_USER })
  assert.equal(lastText(), 'Bot đã được gắn với một nhóm khác.')
  assert.equal(fakes.data.get('tg:chat'), String(STAFF))
  const before = fakes.telegram.length
  await say('/khach 5', { chat: 777 })
  await say('/homnay', { chat: 777 })
  assert.equal(fakes.telegram.length, before) // no reply, nothing recorded
  assert.equal(await seats('12:30'), 30)
})

test('staff buttons change a booking’s status, free its seats, and update the message', async t => {
  setup(t)
  const { id } = await post(guest)
  await press(`s:${id}:noshow`, { chat: 777 }) // not the staff group: ignored
  assert.equal(await seats('19:00'), 26)
  await press(`s:${id}:noshow`)
  assert.equal(await seats('19:00'), 30)
  assert.match(calls('editMessageText').at(-1).body.text, /Không đến \(Duy\)$/)
  assert.equal(calls('answerCallbackQuery').at(-1).body.text, `${id}: Không đến`)
})

test('/dat records a phone booking, warns when over capacity, and explains bad syntax', async t => {
  setup(t)
  await say('/dat 25/11 19h 6 Bàn anh Hùng 0987.654.321')
  assert.match(lastText(), /📞 Đặt bàn qua điện thoại\n25\/11\/2026 · 19:00 · 6 khách\nBàn anh Hùng · 0987\.654\.321[\s\S]*Chỗ còn lại khung 19:00: 24\/30/)
  assert.equal(await seats('19:00'), 24)
  await say('/dat nay 19:30 30 Tiệc công ty')
  assert.match(lastText(), /⚠️ Vượt sức chứa 6 khách/)
  await say('/dat mai 19:00')
  assert.match(lastText(), /^Cú pháp: \/dat/)
})

test('/homnay shows who is seated, free seats and today’s list; /huy cancels by code', async t => {
  setup(t, { now: `${DAY}T19:00:00+07:00` })
  await say('/dat nay 18:00 4 Minh')
  const id = /Mã: (D[0-9A-F]{6})/.exec(lastText())[1]
  await say('/khach 3')
  await say('/homnay')
  assert.match(lastText(), /^Hôm nay 25\/11\/2026 · đang ngồi 7\/30/)
  assert.match(lastText(), /18:00 · 4 khách · Minh · D[0-9A-F]{6}\n19:00 · 3 khách · vãng lai/)
  await say(`/huy ${id.toLowerCase()}`)
  assert.match(lastText(), /^Đã huỷ D[0-9A-F]{6}: 18:00 25\/11\/2026 · 4 khách · Minh/)
  await say('/homnay')
  assert.match(lastText(), /đang ngồi 3\/30/)
})

test('telegram-setup points the webhook at this deployment with the derived secret', async t => {
  setup(t)
  assert.equal((await get({ action: 'telegram-setup' })).ok, true)
  assert.deepEqual(calls('setWebhook')[0].body, {
    url: 'https://dana.test/api/booking', secret_token: SECRET, allowed_updates: ['message', 'callback_query'],
  })
  assert.equal(calls('setMyCommands').length, 1)
})

test('roles: staff log walk-ins and mark tables left; only managers and owners cancel or mark no-shows', async t => {
  setup(t)
  const { id } = await post(guest)
  await press(`s:${id}:cancelled`, { from: STAFF_USER })
  assert.equal(calls('answerCallbackQuery').at(-1).body.text, 'Chỉ quản lý ca hoặc chủ quán mới làm được việc này.')
  await say(`/huy ${id}`, { from: STAFF_USER })
  assert.match(lastText(), /^Chỉ quản lý ca hoặc chủ quán/)
  assert.equal(await seats('19:00'), 26)
  await press(`s:${id}:left`, { from: STAFF_USER })
  assert.equal(await seats('19:00'), 30)

  await say('/quyen Quản lý ca', { replyTo: MANAGER })
  assert.equal(lastText(), 'Minh: Quản lý ca')
  const second = await post({ ...guest, phone: '0900000009' })
  await press(`s:${second.id}:noshow`, { from: MANAGER })
  assert.equal(calls('answerCallbackQuery').at(-1).body.text, `${second.id}: Không đến`)
})

test('roles: only owners change roles, a second owner can be added, and one owner always remains', async t => {
  setup(t)
  const LAN = { id: 4, first_name: 'Lan' }
  await say('/quyen chu', { from: STAFF_USER, replyTo: STAFF_USER })
  assert.equal(lastText(), 'Chỉ chủ quán mới đổi quyền được.')
  await say('/quyen chu') // owner, but not replying to anyone
  assert.match(lastText(), /^Trả lời \(reply\) tin nhắn/)
  await say('/quyen chủ quán', { replyTo: LAN })
  assert.equal(lastText(), 'Lan: Chủ quán')
  await say('/quyen nhanvien', { replyTo: OWNER }) // two owners, so Duy may step down
  assert.equal(lastText(), 'Duy: Nhân viên')
  await say('/quyen nhân viên', { from: LAN, replyTo: LAN })
  assert.equal(lastText(), 'Quán cần ít nhất một chủ quán.')
  await say('/quyen', { from: STAFF_USER }) // anyone may see the list
  assert.match(lastText(), /^Chủ quán: Lan\nMọi người khác trong nhóm: Nhân viên\./)
})

test('/dat over capacity needs a manager or owner', async t => {
  setup(t)
  await say('/dat nay 19:00 28 Tiệc', { from: STAFF_USER })
  assert.match(lastText(), /Chỗ còn lại khung 19:00: 2\/30/)
  await say('/dat nay 19:00 4 Lan', { from: STAFF_USER })
  assert.match(lastText(), /^Không thêm được: vượt sức chứa 2 khách/)
  assert.equal(await seats('19:00'), 2)
  await say('/dat nay 19:00 4 Lan')
  assert.match(lastText(), /⚠️ Vượt sức chứa 2 khách/)
  assert.equal(await seats('19:00'), 0)
})

test('telegram-setup reports Telegram\'s own reason when it refuses', async t => {
  setup(t)
  fakes.telegramErrors.setWebhook = 'Unauthorized'
  const res = await get({ action: 'telegram-setup' })
  assert.equal(res.ok, false)
  assert.equal(res.telegram, 'Unauthorized')
  assert.match(res.error, /^Token sai hoặc đã bị thu hồi/)
})

test('a token pasted with spaces or quotes still works', async t => {
  setup(t)
  process.env.TELEGRAM_BOT_TOKEN = ' "123:test"\n'
  t.after(() => { process.env.TELEGRAM_BOT_TOKEN = '123:test' })
  assert.equal((await get({ action: 'telegram-setup' })).ok, true)
  assert.equal(calls('setWebhook')[0].body.secret_token, SECRET)
  await say('/quyen')
  assert.match(lastText(), /^Chủ quán: Duy/)
})

test('any staff member can confirm a web booking; the seats stay held and closed bookings stay closed', async t => {
  setup(t)
  const { id } = await post(guest)
  await press(`s:${id}:confirmed`, { from: STAFF_USER })
  const edit = calls('editMessageText').at(-1).body
  assert.match(edit.text, /Mã: D[0-9A-F]{6} · Đã xác nhận \(Hoa\)$/)
  assert.deepEqual(edit.reply_markup.inline_keyboard.map(row => row.map(b => b.text)), [['Đã về', 'Không đến', 'Huỷ']])
  assert.equal(await seats('19:00'), 26)

  await press(`s:${id}:cancelled`)
  assert.equal(await seats('19:00'), 30)
  await press(`s:${id}:confirmed`, { from: STAFF_USER }) // stale button on an old message
  assert.equal(calls('answerCallbackQuery').at(-1).body.text, `${id}: Huỷ`)
  assert.equal(await seats('19:00'), 30)
  await say(`/huy ${id}`)
  assert.match(lastText(), /^Đã huỷ /)
})

test('phone bookings from /dat start confirmed and /homnay flags web bookings still to confirm', async t => {
  setup(t)
  await say('/dat nay 18:00 2 Minh')
  assert.match(lastText(), /Mã: D[0-9A-F]{6} · Đã xác nhận\n/)
  assert.deepEqual(calls('sendMessage').at(-1).body.reply_markup.inline_keyboard.map(row => row.map(b => b.text)), [['Đã về', 'Không đến', 'Huỷ']])
  await post(guest)
  await say('/homnay')
  assert.match(lastText(), /18:00 · 2 khách · Minh · D[0-9A-F]{6}\n19:00 · 4 khách · Lan · 0912 345 678 · D[0-9A-F]{6} · ⏳ chờ xác nhận/)
})
