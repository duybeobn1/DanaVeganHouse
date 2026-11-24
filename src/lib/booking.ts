// Client for the booking backend, reached through the /api/booking proxy (api/booking.ts → booking/Code.gs).
// Online booking stays hidden until VITE_BOOKING_ENABLED=true is set in Vercel; until then the site keeps tel: links.
const API_URL = '/api/booking'

export const bookingEnabled = import.meta.env.VITE_BOOKING_ENABLED === 'true'
export const PHONE = '0828744931'
export const PHONE_DISPLAY = '0828.744.931'

export type Slot = { time: string; remaining: number; open: boolean }
export type Availability = { ok: true; date: string; maxGuests: number; slots: Slot[] } | ApiError
export type ApiError = { ok: false; error: string; remaining?: number }

export type StaffBooking = { time: string; guests: number; name: string; phone: string; source: string; status: string }
export type StaffStatus =
  | { ok: true; date: string; occupancyNow: number; capacity: number; slots: Slot[]; bookings: StaffBooking[] }
  | ApiError

/** Today's date in Hanoi as yyyy-MM-dd, whatever the visitor's own timezone. */
export function todayInHanoi(offsetDays = 0): string {
  return new Intl.DateTimeFormat('en-CA', { timeZone: 'Asia/Ho_Chi_Minh' }).format(new Date(Date.now() + offsetDays * 86400000))
}

export async function getAvailability(date: string): Promise<Availability> {
  const res = await fetch(`${API_URL}?action=availability&date=${encodeURIComponent(date)}`)
  return res.json()
}

export async function post<T = { ok: true; id: string } | ApiError>(body: Record<string, unknown>): Promise<T> {
  const res = await fetch(API_URL, { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify(body) })
  return res.json()
}
