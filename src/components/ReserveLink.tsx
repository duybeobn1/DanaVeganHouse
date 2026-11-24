import type { ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { bookingEnabled, PHONE } from '../lib/booking'

/** "Đặt bàn" button target: the online form once the booking backend is configured, otherwise a phone call. */
export default function ReserveLink(props: { className?: string; onClick?: () => void; children: ReactNode }) {
  return bookingEnabled ? <Link to="/reserve" {...props} /> : <a href={`tel:${PHONE}`} {...props} />
}
