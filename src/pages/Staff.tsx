import { useCallback, useEffect, useState } from 'react'
import type { FormEvent } from 'react'
import { bookingEnabled, post } from '../lib/booking'
import type { StaffStatus } from '../lib/booking'

// Staff-only page (not linked from the site): log walk-in guests and see today's bookings and free seats.
// The PIN is checked by the backend; it is kept in sessionStorage so a page refresh does not ask again.

const PIN_KEY = 'dana_staff_pin'
const readPin = () => { try { return sessionStorage.getItem(PIN_KEY) ?? '' } catch { return '' } }
const savePin = (pin: string) => { try { if (pin) sessionStorage.setItem(PIN_KEY, pin); else sessionStorage.removeItem(PIN_KEY) } catch { /* private mode */ } }

const errors: Record<string, string> = {
  wrong_pin: 'Sai mã PIN.',
  locked: 'Nhập sai quá nhiều lần. Thử lại sau 10 phút.',
  staff_disabled: 'Chưa cài STAFF_PIN cho hệ thống đặt bàn.',
  invalid_guests: 'Số khách không hợp lệ.',
}
const failed = 'Không kết nối được. Kiểm tra mạng rồi thử lại.'

type Status = Extract<StaffStatus, { ok: true }>

export default function Staff() {
  const [pin, setPin] = useState(readPin)
  const [pinInput, setPinInput] = useState('')
  const [status, setStatus] = useState<Status | null>(null)
  const [guests, setGuests] = useState(2)
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState('')
  const [notice, setNotice] = useState('')

  const load = useCallback(async (p: string) => {
    try {
      const res = await post<StaffStatus>({ action: 'status', pin: p })
      if (res.ok) {
        setStatus(res)
        setError('')
        savePin(p)
        setPin(p)
      } else {
        setError(errors[res.error] ?? failed)
        if (res.error === 'wrong_pin' || res.error === 'locked') { savePin(''); setPin(''); setStatus(null) }
      }
    } catch {
      setError(failed)
    }
  }, [])

  useEffect(() => {
    if (!bookingEnabled || !pin) return
    load(pin)
    const id = setInterval(() => load(pin), 60000)
    return () => clearInterval(id)
  }, [pin, load])

  async function addWalkin() {
    setBusy(true)
    setNotice('')
    try {
      const res = await post<{ ok: true; occupancyNow: number } | { ok: false; error: string }>({ action: 'walkin', pin, guests })
      if (res.ok) {
        setNotice(`Đã ghi nhận ${guests} khách. Đang ngồi: ${res.occupancyNow}/${status?.capacity ?? 30}.`)
        setGuests(2)
        await load(pin)
      } else setError(errors[res.error] ?? failed)
    } catch {
      setError(failed)
    } finally {
      setBusy(false)
    }
  }

  const login = (e: FormEvent) => { e.preventDefault(); if (pinInput) load(pinInput) }
  const card = 'bg-rice rounded-[2rem] p-6 shadow-ambient'
  const step = 'w-14 h-14 rounded-full bg-cream text-earth text-2xl font-black disabled:opacity-30'

  return (
    <main className="bg-cream min-h-screen pt-24 md:pt-32 pb-16">
      <div className="max-w-xl mx-auto px-4 space-y-6">
        <h1 className="text-3xl font-black text-earth">Quầy · Khách tại quán</h1>

        {!bookingEnabled ? (
          <p className={card}>Hệ thống đặt bàn online chưa được bật.</p>
        ) : !status ? (
          <form onSubmit={login} className={`${card} space-y-4`}>
            <label htmlFor="pin" className="block text-sm font-bold text-earth">Mã PIN nhân viên</label>
            <input id="pin" type="password" inputMode="numeric" autoComplete="off" value={pinInput} onChange={e => setPinInput(e.target.value)}
              className="w-full bg-cream border border-rice-dark rounded-2xl px-4 py-3 text-2xl tracking-[0.5em] text-earth focus:outline-none focus:border-brand" />
            {error && <p role="alert" className="text-sm font-semibold text-brand-dark">{error}</p>}
            <button className="w-full py-3 font-bold uppercase tracking-widest bg-forest text-cream rounded-full">Vào</button>
          </form>
        ) : (
          <>
            <div className={`${card} flex items-end justify-between`}>
              <div>
                <p className="text-xs font-bold tracking-[0.2em] uppercase text-brand">Đang ngồi</p>
                <p className="text-5xl font-black text-earth">{status.occupancyNow}<span className="text-2xl text-earth/40">/{status.capacity}</span></p>
              </div>
              <button type="button" onClick={() => load(pin)} className="text-sm font-bold underline text-earth/60">Làm mới</button>
            </div>

            <div className={`${card} space-y-4`}>
              <p className="text-xs font-bold tracking-[0.2em] uppercase text-brand">Khách vãng lai vừa đến</p>
              <div className="flex items-center justify-between">
                <button type="button" className={step} aria-label="Bớt 1 khách" disabled={guests <= 1} onClick={() => setGuests(g => g - 1)}>−</button>
                <p className="text-5xl font-black text-earth" aria-live="polite">{guests}</p>
                <button type="button" className={step} aria-label="Thêm 1 khách" disabled={guests >= 30} onClick={() => setGuests(g => g + 1)}>+</button>
              </div>
              <button type="button" disabled={busy} onClick={addWalkin}
                className="w-full py-4 font-bold uppercase tracking-widest bg-brand text-cream rounded-full disabled:opacity-60">
                {busy ? 'Đang lưu…' : `Ghi nhận ${guests} khách`}
              </button>
              {notice && <p role="status" className="text-sm font-semibold text-forest">{notice}</p>}
              {error && <p role="alert" className="text-sm font-semibold text-brand-dark">{error}</p>}
              <p className="text-xs text-earth/50">Mỗi lượt tính ngồi 2 tiếng. Khách về sớm hoặc ghi nhầm: sửa cột "Trạng thái" thành "Đã về" hoặc "Huỷ" trong Google Sheet.</p>
            </div>

            <div className={card}>
              <p className="text-xs font-bold tracking-[0.2em] uppercase text-brand mb-3">Chỗ trống hôm nay</p>
              <div className="grid grid-cols-4 gap-2">
                {status.slots.map(s => (
                  <div key={s.time} className={`rounded-2xl py-2 text-center ${s.open ? 'bg-cream' : 'bg-cream/40 text-earth/30'}`}>
                    <p className="text-sm font-bold">{s.time}</p>
                    <p className={`text-xs ${s.remaining === 0 ? 'text-brand-dark font-bold' : 'text-earth/60'}`}>{s.remaining === 0 ? 'Hết' : `còn ${s.remaining}`}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className={card}>
              <p className="text-xs font-bold tracking-[0.2em] uppercase text-brand mb-3">Danh sách hôm nay ({status.bookings.length})</p>
              {status.bookings.length === 0 ? <p className="text-sm text-earth/50">Chưa có.</p> : (
                <ul className="divide-y divide-rice-dark">
                  {status.bookings.map((b, i) => (
                    <li key={i} className="py-3 flex items-center justify-between gap-3 text-sm">
                      <span className="font-bold text-earth w-12">{b.time}</span>
                      <span className="flex-1 text-earth">
                        {b.guests} khách · {b.name || '—'}
                        <span className="ml-2 text-xs text-earth/50">{b.source}</span>
                      </span>
                      {b.phone && <a href={`tel:${b.phone}`} className="text-forest font-bold">{b.phone}</a>}
                    </li>
                  ))}
                </ul>
              )}
            </div>

            <button type="button" onClick={() => { savePin(''); setPin(''); setStatus(null) }} className="text-sm underline text-earth/50">Thoát</button>
          </>
        )}
      </div>
    </main>
  )
}
