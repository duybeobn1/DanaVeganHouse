import { useEffect, useState } from 'react'
import type { FormEvent } from 'react'
import { useLanguage } from '../context/LanguageContext'
import { bookingEnabled, getAvailability, post, todayInHanoi, PHONE, PHONE_DISPLAY } from '../lib/booking'
import type { Slot } from '../lib/booking'

const MAX_GUESTS = 10
const MAX_DAYS_AHEAD = 60

const field = 'w-full bg-cream border border-rice-dark rounded-2xl px-4 py-3 text-earth placeholder:text-earth/30 focus:outline-none focus:border-brand transition-colors'
const label = 'block text-xs font-bold tracking-[0.2em] uppercase text-brand mb-2'

export default function Reserve() {
  const { t } = useLanguage()
  const [date, setDate] = useState(todayInHanoi())
  const [guests, setGuests] = useState(2)
  const [time, setTime] = useState('')
  const [slots, setSlots] = useState<Slot[] | null>(null)
  const [loadError, setLoadError] = useState(false)
  const [reload, setReload] = useState(0)
  const [form, setForm] = useState({ name: '', phone: '', email: '', note: '', website: '' })
  const [sending, setSending] = useState(false)
  const [error, setError] = useState('')
  const [done, setDone] = useState<{ id: string } | null>(null)

  useEffect(() => {
    if (!bookingEnabled) return
    let live = true
    setSlots(null)
    setLoadError(false)
    getAvailability(date)
      .then(res => {
        if (!live) return
        if (res.ok) setSlots(res.slots)
        else setLoadError(true)
      })
      .catch(() => { if (live) setLoadError(true) })
    return () => { live = false }
  }, [date, reload])

  const usable = (s: Slot) => s.open && s.remaining >= guests

  // A time picked earlier may no longer fit after the date, party size or availability changes.
  useEffect(() => {
    if (time && !slots?.some(s => s.time === time && usable(s))) setTime('')
  }, [slots, guests]) // eslint-disable-line react-hooks/exhaustive-deps

  const messages: Record<string, string> = {
    full: t('Khung giờ này không còn đủ chỗ. Vui lòng chọn giờ khác.', 'Not enough seats left at this time. Please pick another time.'),
    too_soon: t('Khung giờ này đã quá gần. Vui lòng chọn giờ khác hoặc gọi cho Dāna.', 'This time is too soon. Please pick another time or call Dāna.'),
    invalid_date: t(`Vui lòng chọn ngày trong ${MAX_DAYS_AHEAD} ngày tới.`, `Please choose a date within the next ${MAX_DAYS_AHEAD} days.`),
    invalid_time: t('Vui lòng chọn giờ.', 'Please choose a time.'),
    invalid_guests: t(`Nhóm trên ${MAX_GUESTS} khách vui lòng gọi ${PHONE_DISPLAY}.`, `For groups over ${MAX_GUESTS}, please call ${PHONE_DISPLAY}.`),
    invalid_name: t('Vui lòng nhập tên.', 'Please enter your name.'),
    invalid_phone: t('Số điện thoại chưa đúng.', 'Please check your phone number.'),
    invalid_email: t('Email chưa đúng.', 'Please check your email.'),
    duplicate: t(`Số điện thoại này đã có 2 lượt đặt trong ngày. Vui lòng gọi ${PHONE_DISPLAY} để thay đổi.`, `This phone number already has 2 bookings that day. Please call ${PHONE_DISPLAY} to change them.`),
    busy: t('Hệ thống đang bận. Vui lòng thử lại sau ít phút.', 'The system is busy. Please try again in a few minutes.'),
    limit: t(`Bạn đã đặt nhiều bàn liên tiếp. Vui lòng gọi ${PHONE_DISPLAY} để đặt thêm.`, `You have made several bookings in a row. Please call ${PHONE_DISPLAY} to book more.`),
  }
  const failMessage = t(`Chưa gửi được. Vui lòng thử lại hoặc gọi ${PHONE_DISPLAY}.`, `Could not send. Please try again or call ${PHONE_DISPLAY}.`)

  async function submit(e: FormEvent) {
    e.preventDefault()
    if (!time) return setError(messages.invalid_time)
    setSending(true)
    setError('')
    try {
      const res = await post({ action: 'book', date, time, guests, ...form })
      if (res.ok) setDone({ id: res.id })
      else {
        setError(messages[res.error] ?? failMessage)
        if (res.error === 'full' || res.error === 'too_soon') setReload(n => n + 1)
      }
    } catch {
      setError(failMessage)
    } finally {
      setSending(false)
    }
  }

  const set = (k: keyof typeof form) => (e: { target: { value: string } }) => setForm(f => ({ ...f, [k]: e.target.value }))
  const dmy = date.split('-').reverse().join('/')

  return (
    <main>
      <section className="relative pt-20 pb-14 md:pt-28 md:pb-20 overflow-hidden">
        <div className="absolute inset-0" style={{ backgroundImage: 'url(/images/farmers_green_wallpaper.png)', backgroundSize: 'cover', backgroundPosition: 'center' }} />
        <div className="absolute inset-0" style={{ background: 'radial-gradient(ellipse at 50% 50%, rgba(42, 92, 52, 0.9) 0%, rgba(20, 48, 24, 0.95) 60%, rgba(12, 32, 15, 1) 100%)' }} />
        <div className="max-w-3xl mx-auto px-6 text-center relative z-10">
          <p className="text-xs font-bold tracking-[0.4em] uppercase text-forest-light mb-4">{t('Giữ Chỗ Tại Dāna', 'Book Your Table')}</p>
          <h1 className="text-5xl md:text-7xl font-black text-cream leading-none mb-4" style={{ fontFamily: 'var(--font-display-wide)' }}>{t('ĐẶT BÀN', 'RESERVE')}</h1>
          <p className="text-cream/60 text-sm">{t('Mở cửa hằng ngày 11:00 – 22:00', 'Open daily 11:00 – 22:00')}</p>
        </div>
      </section>

      <section className="bg-cream py-12 md:py-24">
        <div className="max-w-2xl mx-auto px-4 md:px-6">
          {!bookingEnabled ? (
            <div className="bg-rice rounded-[2rem] p-8 text-center shadow-ambient">
              <p className="text-earth/70 mb-4">{t('Vui lòng gọi để đặt bàn', 'Please call to reserve')}</p>
              <a href={`tel:${PHONE}`} className="text-3xl font-black text-earth hover:text-brand transition-colors">{PHONE_DISPLAY}</a>
            </div>
          ) : done ? (
            <div className="bg-rice rounded-[2rem] p-8 md:p-10 text-center shadow-ambient" role="status">
              <p className="text-xs font-bold tracking-[0.3em] uppercase text-forest mb-3">{t('Đặt bàn thành công', 'Booking received')}</p>
              <p className="text-3xl md:text-4xl font-black text-earth mb-2">{time} · {dmy}</p>
              <p className="text-earth/70 mb-6">{t(`${guests} khách · ${form.name}`, `${guests} guests · ${form.name}`)}</p>
              <p className="text-earth/60 text-sm">{t('Mã đặt bàn', 'Booking code')}: <span className="font-bold text-earth">{done.id}</span></p>
              <p className="text-earth/60 text-sm mt-4">
                {t('Dāna giữ bàn cho bạn. Cần thay đổi hoặc huỷ, vui lòng gọi', 'Your table is held. To change or cancel, please call')}{' '}
                <a href={`tel:${PHONE}`} className="font-bold text-earth underline">{PHONE_DISPLAY}</a>
              </p>
            </div>
          ) : (
            <form onSubmit={submit} className="bg-rice rounded-[2rem] p-6 md:p-10 shadow-ambient space-y-8">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="date" className={label}>{t('Ngày', 'Date')}</label>
                  <input id="date" type="date" required className={field} value={date}
                    min={todayInHanoi()} max={todayInHanoi(MAX_DAYS_AHEAD)}
                    onChange={e => e.target.value && setDate(e.target.value)} />
                </div>
                <div>
                  <label htmlFor="guests" className={label}>{t('Số khách', 'Guests')}</label>
                  <select id="guests" className={field} value={guests} onChange={e => setGuests(Number(e.target.value))}>
                    {Array.from({ length: MAX_GUESTS }, (_, i) => i + 1).map(n => (
                      <option key={n} value={n}>{t(`${n} khách`, `${n} ${n === 1 ? 'guest' : 'guests'}`)}</option>
                    ))}
                  </select>
                  <p className="text-earth/50 text-xs mt-2">
                    {t(`Trên ${MAX_GUESTS} khách, vui lòng gọi`, `Over ${MAX_GUESTS} guests, please call`)}{' '}
                    <a href={`tel:${PHONE}`} className="underline">{PHONE_DISPLAY}</a>
                  </p>
                </div>
              </div>

              <fieldset>
                <legend className={label}>{t('Giờ', 'Time')}</legend>
                {loadError ? (
                  <p className="text-sm text-brand-dark">
                    {t('Không tải được giờ trống.', 'Could not load available times.')}{' '}
                    <button type="button" className="underline font-bold" onClick={() => setReload(n => n + 1)}>{t('Thử lại', 'Retry')}</button>
                  </p>
                ) : !slots ? (
                  <p className="text-sm text-earth/50" aria-live="polite">{t('Đang tải giờ trống…', 'Loading available times…')}</p>
                ) : !slots.some(usable) ? (
                  <p className="text-sm text-earth/70">
                    {t('Ngày này không còn khung giờ phù hợp. Vui lòng chọn ngày khác hoặc gọi', 'No times left for this party size on this day. Please pick another day or call')}{' '}
                    <a href={`tel:${PHONE}`} className="underline font-bold">{PHONE_DISPLAY}</a>
                  </p>
                ) : (
                  <div className="grid grid-cols-4 sm:grid-cols-5 gap-2">
                    {slots.filter(s => s.open).map(s => {
                      const ok = usable(s)
                      const selected = s.time === time
                      return (
                        <button key={s.time} type="button" disabled={!ok} aria-pressed={selected} onClick={() => setTime(s.time)}
                          className={`rounded-2xl py-2 text-sm font-bold transition-all duration-200 ${
                            selected ? 'bg-forest text-cream' : ok ? 'bg-cream text-earth hover:bg-forest-pale' : 'bg-cream/50 text-earth/25 line-through cursor-not-allowed'
                          }`}>
                          {s.time}
                          {ok && s.remaining <= 8 && <span className={`block text-[10px] font-semibold ${selected ? 'text-cream/80' : 'text-brand'}`}>{t(`còn ${s.remaining}`, `${s.remaining} left`)}</span>}
                        </button>
                      )
                    })}
                  </div>
                )}
              </fieldset>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="name" className={label}>{t('Tên', 'Name')}</label>
                  <input id="name" required maxLength={80} autoComplete="name" className={field} value={form.name} onChange={set('name')} />
                </div>
                <div>
                  <label htmlFor="phone" className={label}>{t('Số điện thoại', 'Phone')}</label>
                  <input id="phone" type="tel" required maxLength={20} autoComplete="tel" inputMode="tel" pattern="[+]?[0-9 .()\-]{9,20}"
                    className={field} value={form.phone} onChange={set('phone')} />
                </div>
              </div>
              <div>
                <label htmlFor="email" className={label}>{t('Email (không bắt buộc)', 'Email (optional)')}</label>
                <input id="email" type="email" maxLength={120} autoComplete="email" className={field} value={form.email} onChange={set('email')} />
              </div>
              <div>
                <label htmlFor="note" className={label}>{t('Ghi chú (không bắt buộc)', 'Note (optional)')}</label>
                <textarea id="note" rows={3} maxLength={500} className={field}
                  placeholder={t('Dị ứng, dịp đặc biệt, ghế trẻ em…', 'Allergies, special occasion, high chair…')}
                  value={form.note} onChange={set('note')} />
              </div>
              {/* Honeypot: hidden from people, filled in by spam bots. */}
              <input type="text" name="website" tabIndex={-1} autoComplete="off" aria-hidden="true"
                className="absolute -left-[9999px] h-0 w-0 opacity-0" value={form.website} onChange={set('website')} />

              {error && <p role="alert" className="text-sm font-semibold text-brand-dark">{error}</p>}

              <button type="submit" disabled={sending}
                className="w-full py-4 text-sm font-bold tracking-widest uppercase bg-brand text-cream rounded-full hover:bg-brand-dark disabled:opacity-60 transition-all duration-300">
                {sending ? t('Đang gửi…', 'Sending…') : time ? t(`Đặt bàn ${time} · ${guests} khách`, `Book ${time} · ${guests} guests`) : t('Đặt bàn', 'Book table')}
              </button>
            </form>
          )}
        </div>
      </section>
    </main>
  )
}
