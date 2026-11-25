// Vercel Function: table bookings for /reserve, plus the staff Telegram bot (webhook on this same URL).
// Data lives in Upstash Redis (Vercel → Storage). Staff get each booking in their Telegram group, mark
// tables with buttons, and log walk-ins with /khach. Setup: booking/README.md.
import { createHash, randomUUID } from 'node:crypto'

const CAPACITY = 30             // max guests in the restaurant at the same time (bookings + walk-ins)
const STAY_MINUTES = 120        // how long a table is assumed to stay
const SLOT_MINUTES = 30
const FIRST_SLOT = 11 * 60
const LAST_SLOT = 20 * 60 + 30  // open 11:00–22:00, last online seating 20:30
const MAX_ONLINE_GUESTS = 10    // bigger groups call or email
const MAX_DAYS_AHEAD = 60
const MIN_LEAD_MINUTES = 30     // no online booking for a slot starting sooner than this
const TZ = 'Asia/Ho_Chi_Minh'

type Status = 'booked' | 'confirmed' | 'seated' | 'left' | 'noshow' | 'cancelled' | 'guest_cancelled'
type Source = 'web' | 'phone' | 'walk-in'
type Booking = {
  id: string; createdAt: string; date: string; time: string; guests: number; name: string; phone: string
  email: string; note: string; source: Source; status: Status
  msg?: number // its Telegram message
  by?: string  // staff member who last changed the status
  prev?: Status // status before it was closed, for undo
  chat?: string // staff chat its message was posted in (message ids are only unique within a chat)
}
type Now = { date: string; min: number }
type Req = Record<string, unknown>
type Fail = { ok: false; error: string; remaining?: number }

const STATUS_VI: Record<Status, string> = {
  booked: 'Chờ xác nhận', confirmed: 'Đã xác nhận', seated: 'Đang ngồi', left: 'Đã về', noshow: 'Không đến', cancelled: 'Huỷ', guest_cancelled: 'Khách tự huỷ',
}
const TITLE: Record<Source, string> = { web: '🆕 Đặt bàn qua website', phone: '📞 Đặt bàn qua điện thoại', 'walk-in': '🚶 Khách vãng lai' }
const BUTTON_STATUSES: Status[] = ['confirmed', 'left', 'noshow', 'cancelled']
const MANAGER_STATUSES: Status[] = ['noshow', 'cancelled']
const busy: Fail = { ok: false, error: 'busy' }
const notFound: Fail = { ok: false, error: 'not_found' }

// ───────────────────────── Rules (pure, unit-tested) ─────────────────────────

const pad2 = (n: number) => String(n).padStart(2, '0')
const digits = (v: unknown) => String(v ?? '').replace(/\D/g, '')
const isActive = (b: Booking) => b.status === 'booked' || b.status === 'confirmed' || b.status === 'seated'
// A guest's own online cancellation is final; staff mistakes can be undone.
const canUndo = (b: Booking) => !isActive(b) && b.status !== 'guest_cancelled' && !!b.prev
const dmy = (date: string) => date.split('-').reverse().join('/')
const addDays = (date: string, n: number) => new Date(Date.parse(date) + n * 86400000).toISOString().slice(0, 10)
const dayDiff = (a: string, b: string) => (Date.parse(b) - Date.parse(a)) / 86400000
const toInt = (v: unknown) => { const n = parseInt(String(v), 10); return isNaN(n) ? 0 : n }
const clean = (v: unknown, max: number) => String(v ?? '').replace(/\s+/g, ' ').trim().slice(0, max)

/** "19:00", "19h", "19h30", "19.30" → minutes after midnight; NaN if not a time. */
function toMinutes(s: string) {
  const m = /^(\d{1,2})(?:[:hH.](\d{2})?)?$/.exec(String(s).trim())
  if (!m || +m[1] > 23 || +(m[2] ?? 0) > 59) return NaN
  return +m[1] * 60 + +(m[2] ?? 0)
}
const fromMinutes = (min: number) => `${pad2(Math.floor(min / 60))}:${pad2(min % 60)}`

/** Staff-typed dates: "nay", "mai", 26/11, 26/11/2026, 2026-11-26 → yyyy-MM-dd ('' if unreadable). */
function parseDate(s: string, now: Now) {
  const t = s.trim().toLowerCase()
  if (t === 'nay') return now.date
  if (t === 'mai') return addDays(now.date, 1)
  if (/^\d{4}-\d{2}-\d{2}$/.test(t)) return t
  const m = /^(\d{1,2})\/(\d{1,2})(?:\/(\d{4}))?$/.exec(t)
  if (!m) return ''
  const date = `${m[3] ?? now.date.slice(0, 4)}-${pad2(+m[2])}-${pad2(+m[1])}`
  return !m[3] && date < now.date ? `${+date.slice(0, 4) + 1}${date.slice(4)}` : date // "05/01" typed in December
}

function dateError(date: unknown, now: Now) {
  const d = String(date)
  const real = /^\d{4}-\d{2}-\d{2}$/.test(d) && new Date(`${d}T00:00:00Z`).toISOString().startsWith(d) // rejects 31/02
  const ahead = real ? dayDiff(now.date, d) : NaN
  return ahead >= 0 && ahead <= MAX_DAYS_AHEAD ? '' : 'invalid_date'
}

/** Guests seated at minute `min`, from the rows of one day. */
function occupancyAt(rows: Booking[], min: number) {
  return rows.reduce((sum, b) => {
    const start = toMinutes(b.time)
    return isActive(b) && start <= min && min < start + STAY_MINUTES ? sum + b.guests : sum
  }, 0)
}

/** Most guests seated at once during [start, start + stay). Exact: occupancy only rises when a booking starts. */
function peakOccupancy(rows: Booking[], start: number) {
  const starts = rows.filter(isActive).map(b => toMinutes(b.time)).filter(s => s > start && s < start + STAY_MINUTES)
  return Math.max(occupancyAt(rows, start), ...starts.map(s => occupancyAt(rows, s)))
}

function slotTimes() {
  const out: number[] = []
  for (let m = FIRST_SLOT; m <= LAST_SLOT; m += SLOT_MINUTES) out.push(m)
  return out
}

function availability(rows: Booking[], date: string, now: Now) {
  return {
    ok: true as const,
    date,
    maxGuests: MAX_ONLINE_GUESTS,
    slots: slotTimes().map(m => ({
      time: fromMinutes(m),
      remaining: Math.max(0, CAPACITY - peakOccupancy(rows, m)),
      open: !(date === now.date && m < now.min + MIN_LEAD_MINUTES),
    })),
  }
}

/** Validates a web booking against the rules and the 30-guest cap, given the rows of that day. */
function checkBooking(rows: Booking[], req: Req, now: Now) {
  const start = toMinutes(String(req.time ?? ''))
  if (!slotTimes().includes(start)) return { ok: false, error: 'invalid_time' } as Fail
  if (req.date === now.date && start < now.min + MIN_LEAD_MINUTES) return { ok: false, error: 'too_soon' } as Fail
  const guests = toInt(req.guests)
  if (!(guests >= 1 && guests <= MAX_ONLINE_GUESTS)) return { ok: false, error: 'invalid_guests' } as Fail
  const name = clean(req.name, 80)
  if (!name) return { ok: false, error: 'invalid_name' } as Fail
  const phone = clean(req.phone, 20)
  if (!/^\+?[\d\s.\-()]+$/.test(phone) || digits(phone).length < 9 || digits(phone).length > 15) return { ok: false, error: 'invalid_phone' } as Fail
  const email = clean(req.email, 120)
  if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return { ok: false, error: 'invalid_email' } as Fail
  if (rows.filter(b => isActive(b) && digits(b.phone) === digits(phone)).length >= 2) return { ok: false, error: 'duplicate' } as Fail
  const remaining = CAPACITY - peakOccupancy(rows, start)
  if (guests > remaining) return { ok: false, error: 'full', remaining: Math.max(0, remaining) } as Fail
  return { ok: true as const, time: fromMinutes(start), guests, name, phone, email, note: clean(req.note, 500), remaining }
}

function nowHanoi(): Now {
  const p = Object.fromEntries(new Intl.DateTimeFormat('en-GB', {
    timeZone: TZ, year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', hourCycle: 'h23',
  }).formatToParts(new Date()).map(x => [x.type, x.value]))
  return { date: `${p.year}-${p.month}-${p.day}`, min: +p.hour * 60 + +p.minute }
}

// ───────────────────────── Upstash Redis (REST) ─────────────────────────

const redisUrl = () => process.env.KV_REST_API_URL ?? process.env.UPSTASH_REDIS_REST_URL
const redisToken = () => process.env.KV_REST_API_TOKEN ?? process.env.UPSTASH_REDIS_REST_TOKEN

async function redis<T = unknown>(...command: (string | number)[]): Promise<T> {
  const res = await fetch(redisUrl()!, {
    method: 'POST', headers: { authorization: `Bearer ${redisToken()}` }, body: JSON.stringify(command),
  })
  const out = (await res.json()) as { result?: T; error?: string }
  if (out.error) throw new Error(`redis ${command[0]}: ${out.error}`)
  return out.result as T
}

// One hash per day (day:yyyy-MM-dd → id → booking JSON) plus id:<ID> → date, so a code finds its day.
async function dayRows(date: string): Promise<Booking[]> {
  const flat = await redis<string[]>('HGETALL', `day:${date}`)
  return flat.filter((_, i) => i % 2 === 1).map(json => JSON.parse(json) as Booking)
}

const save = (b: Booking) => redis('HSET', `day:${b.date}`, b.id, JSON.stringify(b))

async function findById(id: string): Promise<Booking | null> {
  const date = await redis<string | null>('GET', `id:${id}`)
  const json = date && await redis<string | null>('HGET', `day:${date}`, id)
  return json ? (JSON.parse(json) as Booking) : null
}

async function insert(fields: Omit<Booking, 'id' | 'createdAt'>): Promise<Booking> {
  for (let i = 0; i < 5; i++) {
    const id = 'D' + randomUUID().slice(0, 6).toUpperCase()
    if (!(await redis('SET', `id:${id}`, fields.date, 'NX'))) continue // code already taken
    const b: Booking = { id, createdAt: new Date().toISOString(), ...fields }
    await save(b)
    return b
  }
  throw new Error('could not pick a free booking code')
}

/** Counts calls of `key` in a fixed window of `seconds`; true once over `max`. */
async function tooMany(key: string, max: number, seconds: number) {
  const n = await redis<number>('INCR', `rl:${key}`)
  if (n === 1) await redis('EXPIRE', `rl:${key}`, seconds)
  return n > max
}

/** One web booking per day at a time, so two guests cannot both take the last seats. */
async function withDayLock<T>(date: string, fn: () => Promise<T>): Promise<T | Fail> {
  for (let i = 0; i < 25; i++) {
    if (await redis('SET', `lock:${date}`, '1', 'NX', 'PX', 5000)) {
      try { return await fn() } finally { await redis('DEL', `lock:${date}`) }
    }
    await new Promise(r => setTimeout(r, 200))
  }
  return busy
}

// ───────────────────────── Telegram ─────────────────────────

// Pasted tokens often carry spaces or quotes; Telegram then answers "Not Found".
const botToken = () => (process.env.TELEGRAM_BOT_TOKEN ?? '').trim().replace(/^["']|["']$/g, '')

async function tgCall<T>(method: string, body: object): Promise<{ ok: boolean; result?: T; description?: string }> {
  const token = botToken()
  if (!token) return { ok: false, description: 'no token' }
  try {
    const res = await fetch(`https://api.telegram.org/bot${token}/${method}`, {
      method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify(body),
    })
    const out = (await res.json()) as { ok: boolean; result?: T; description?: string }
    if (!out.ok) console.error(`telegram ${method}: ${out.description}`)
    return out
  } catch (err) {
    console.error(`telegram ${method}: ${err}`)
    return { ok: false, description: String(err) }
  }
}

/** Bot API call that never throws: a failed message never undoes a saved booking. */
async function tg<T = unknown>(method: string, body: object): Promise<T | null> {
  const out = await tgCall<T>(method, body)
  return out.ok ? (out.result ?? null) : null
}

/** Telegram sends this back in a header on every webhook call; derived from the token so there is nothing else to configure. */
const webhookSecret = () => {
  const token = botToken()
  return token ? createHash('sha256').update(`webhook:${token}`).digest('hex').slice(0, 48) : null
}
const staffChat = () => redis<string | null>('GET', 'tg:chat')

function bookingText(b: Booking) {
  return [
    TITLE[b.source],
    `${dmy(b.date)} · ${b.time} · ${b.guests} khách`,
    b.source === 'walk-in' ? null : `${b.name}${b.phone ? ` · ${b.phone}` : ''}`,
    b.email ? `Email: ${b.email}` : null,
    b.note ? `Ghi chú: ${b.note}` : null,
    `Mã: ${b.id} · ${STATUS_VI[b.status]}${b.by ? ` (${b.by})` : ''}`,
  ].filter(Boolean).join('\n')
}

function buttons(b: Booking) {
  const row = (choices: [string, string][]) => choices.map(([action, text]) => ({ text, callback_data: `s:${b.id}:${action}` }))
  if (!isActive(b)) return { inline_keyboard: canUndo(b) ? [row([['undo', '↩️ Hoàn tác']])] : [] }
  if (b.source === 'walk-in') return { inline_keyboard: [row([['left', 'Đã về']])] }
  const main = row([['left', 'Đã về'], ['noshow', 'Không đến'], ['cancelled', 'Huỷ']])
  return { inline_keyboard: b.status === 'booked' ? [row([['confirmed', '✅ Xác nhận']]), main] : [main] }
}

/** Posts a booking to the staff group and remembers the message so later status changes can edit it. */
async function announce(b: Booking, extra: string) {
  const chat = await staffChat()
  if (!chat) return
  const sent = await tg<{ message_id: number }>('sendMessage', { chat_id: chat, text: `${bookingText(b)}\n${extra}`, reply_markup: buttons(b) })
  if (sent) await save({ ...b, msg: sent.message_id, chat })
}

/** Saves a booking and updates its message in the staff group. */
async function commit(b: Booking) {
  await save(b)
  const chat = await staffChat()
  // After the bot moves to another group, old messages are left alone rather than editing a wrong one there.
  if (chat && b.msg && b.chat === chat) await tg('editMessageText', { chat_id: chat, message_id: b.msg, text: bookingText(b), reply_markup: buttons(b) })
  return b
}

async function setStatus(id: string, status: Status, by?: string) {
  const b = await findById(id)
  if (!b || !isActive(b)) return b // a stale button or repeat /huy must not bring a closed booking back; Hoàn tác does that
  return commit({ ...b, prev: b.status, status, by })
}

/** Reopens a booking closed by mistake, back to the status it had. */
async function undo(id: string, by: string) {
  const b = await findById(id)
  if (!b || !canUndo(b)) return null
  return commit({ ...b, status: b.prev!, prev: undefined, by: `${by} hoàn tác` })
}

// ───────────────────────── Website actions ─────────────────────────

async function book(req: Req, ip: string) {
  if (req.website) return { ok: true, id: 'ok' } // honeypot filled: a bot; pretend success, save nothing
  // Loose limits on attempts (guests behind one carrier IP may retry), tight limit on saved bookings
  // so one sender cannot fill the 30-seat cap.
  if (await tooMany(`book:${ip}`, 20, 3600) || await tooMany('book', 60, 600)) return busy
  if (toInt(await redis('GET', `rl:saved:${ip}`)) >= 3) return { ok: false, error: 'limit' }
  const now = nowHanoi()
  const date = String(req.date)
  if (dateError(date, now)) return { ok: false, error: 'invalid_date' }
  const result = await withDayLock(date, async () => {
    const check = checkBooking(await dayRows(date), req, now)
    if (!check.ok) return check
    const { time, guests, name, phone, email, note, remaining } = check
    return { ok: true as const, remaining, b: await insert({ date, time, guests, name, phone, email, note, source: 'web', status: 'booked' }) }
  })
  if (!result.ok) return result
  await tooMany(`saved:${ip}`, 3, 21600) // 3 saved bookings per IP per 6 hours
  await announce(result.b, `Chỗ còn lại khung ${result.b.time}: ${result.remaining - result.b.guests}/${CAPACITY}`)
  return { ok: true, id: result.b.id }
}

/** Guest cancels with the booking code plus the phone it was made with, so a guessed code alone is not enough. */
async function guestCancel(req: Req, ip: string) {
  if (await tooMany(`cancel:${ip}`, 10, 3600)) return busy
  const id = String(req.id ?? '').trim().toUpperCase()
  const phoneKey = digits(req.phone).slice(-9) // last 9 digits: 0912… and +84 912… match
  if (!/^D[0-9A-F]{6}$/.test(id) || phoneKey.length < 9) return notFound
  const b = await findById(id)
  if (!b || digits(b.phone).slice(-9) !== phoneKey) return notFound // same error for both on purpose
  if (!isActive(b)) return { ok: false, error: 'inactive' }
  const now = nowHanoi()
  if (b.date < now.date || (b.date === now.date && toMinutes(b.time) <= now.min)) return { ok: false, error: 'past' }
  await setStatus(id, 'guest_cancelled')
  const chat = await staffChat()
  if (chat) await tg('sendMessage', {
    chat_id: chat,
    text: `❌ Khách tự huỷ: ${b.time} ${dmy(b.date)} · ${b.guests} khách · ${b.name}`,
    ...(b.msg && b.chat === chat ? { reply_parameters: { message_id: b.msg, allow_sending_without_reply: true } } : {}),
  })
  return { ok: true, date: b.date, time: b.time, guests: b.guests }
}

// ───────────────────────── Staff bot ─────────────────────────

// Roles live in Redis (tg:roles: Telegram user id → { role, name }). Anyone in the staff group without a role is staff.
type Role = 'owner' | 'manager' | 'staff'
const ROLE_VI: Record<Role, string> = { owner: 'Chủ quán', manager: 'Quản lý ca', staff: 'Nhân viên' }
const RANK: Record<Role, number> = { staff: 0, manager: 1, owner: 2 }

const HELP = [
  'Mọi người:',
  '/khach 5 — ghi 5 khách vãng lai vừa vào',
  '/homnay — đang ngồi, chỗ trống, danh sách (/homnay mai, /homnay 26/11)',
  '/dat 26/11 19:00 6 Lan 0912345678 — thêm bàn khách gọi điện đặt',
  'Nút "✅ Xác nhận" — đã gọi hoặc nhắn lại khách đặt online',
  'Nút "Đã về" dưới mỗi bàn — bàn đã về, mở lại chỗ',
  '',
  'Quản lý ca và chủ quán:',
  'Nút "Không đến", "Huỷ", "↩️ Hoàn tác" — /huy D1A2B3C — /dat vượt sức chứa',
  '',
  'Chủ quán:',
  'Trả lời (reply) tin nhắn của một người bằng /quyen chu, /quyen quanly hoặc /quyen nhanvien. Gõ /quyen để xem ai giữ quyền gì.',
  'Gõ /batdau ở nhóm khác để chuyển bot sang nhóm đó.',
].join('\n')

const COMMANDS = [
  { command: 'khach', description: 'Ghi khách vãng lai: /khach 5' },
  { command: 'homnay', description: 'Đang ngồi, chỗ trống, danh sách hôm nay' },
  { command: 'dat', description: 'Thêm bàn đặt qua điện thoại' },
  { command: 'huy', description: 'Huỷ một bàn theo mã (quản lý ca)' },
  { command: 'quyen', description: 'Xem và đổi quyền (chủ quán)' },
]

type TgUser = { id: number; is_bot?: boolean; first_name?: string; last_name?: string; username?: string }
// sender_chat: sent as the group (anonymous admin) or a channel. `from` is then Telegram's shared stand-in bot, not a person.
type TgMessage = { message_id: number; chat: { id: number }; from?: TgUser; sender_chat?: { title?: string }; text?: string; reply_to_message?: TgMessage }
type TgUpdate = { message?: TgMessage; callback_query?: { id: string; from: TgUser; data?: string; message?: TgMessage } }

const userName = (u: TgUser) => [u.first_name, u.last_name].filter(Boolean).join(' ') || (u.username ? `@${u.username}` : String(u.id))

async function roles(): Promise<{ id: string; role: Role; name: string }[]> {
  const flat = await redis<string[]>('HGETALL', 'tg:roles')
  return flat.flatMap((v, i) => (i % 2 ? [{ id: flat[i - 1], ...(JSON.parse(v) as { role: Role; name: string }) }] : []))
}

async function roleOf(u?: TgUser): Promise<Role> {
  const json = u && await redis<string | null>('HGET', 'tg:roles', String(u.id))
  return json ? (JSON.parse(json) as { role: Role }).role : 'staff'
}

const can = async (u: TgUser | undefined, need: Role) => RANK[await roleOf(u)] >= RANK[need]
const setRole = (u: TgUser, role: Role) => redis('HSET', 'tg:roles', String(u.id), JSON.stringify({ role, name: userName(u) }))
const MANAGERS_ONLY = 'Chỉ quản lý ca hoặc chủ quán mới làm được việc này.'
const ANONYMOUS_SELF = 'Bạn đang gửi tin ẩn danh dưới tên nhóm, nên bot không biết bạn là ai. Tắt "Ẩn danh" (Remain anonymous) trong quyền quản trị của bạn rồi gõ lại.'
const anonymousTarget = (title = '') => `Tin bạn trả lời được gửi dưới tên "${title}", không phải tên một người, nên bot không biết là ai. ` +
  'Nếu người đó là quản trị viên đang bật "Ẩn danh" (Remain anonymous), nhờ họ tắt đi và nhắn một tin mới, rồi trả lời tin mới đó.'

/** "chu", "chủ quán", "quanly", "Quản lý ca", "nhanvien", … → role. */
function parseRole(words: string[]): Role | null {
  const w = words.join('').normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase().replace(/đ/g, 'd')
  if (['chu', 'chuquan', 'owner', 'admin'].includes(w)) return 'owner'
  if (['quanly', 'quanlyca', 'manager'].includes(w)) return 'manager'
  if (['nhanvien', 'staff'].includes(w)) return 'staff'
  return null
}

async function onUpdate(u: TgUpdate) {
  const chat = await staffChat()
  const q = u.callback_query
  if (q) {
    const [, id, action] = String(q.data).split(':') as [string, string, Status | 'undo']
    let text = 'Không đổi được'
    let alert = false
    if (String(q.message?.chat.id) !== chat) {
      // a button from some other chat: ignore
    } else if ((action === 'undo' || MANAGER_STATUSES.includes(action)) && !(await can(q.from, 'manager'))) {
      text = MANAGERS_ONLY
    } else if (action === 'undo') {
      const b = await undo(id, userName(q.from))
      if (b) {
        // The seats may have gone to someone else meanwhile: reopen anyway, but make the manager see it.
        const over = peakOccupancy(await dayRows(b.date), toMinutes(b.time)) - CAPACITY
        text = `${b.id}: ${STATUS_VI[b.status]}${over > 0 ? ` · ⚠️ Vượt sức chứa ${over} khách` : ''}`
        alert = over > 0
      }
    } else if (BUTTON_STATUSES.includes(action)) {
      const b = await setStatus(id, action, userName(q.from))
      if (b) text = `${b.id}: ${STATUS_VI[b.status]}`
    }
    await tg('answerCallbackQuery', { callback_query_id: q.id, text, show_alert: alert })
    return
  }
  const m = u.message
  if (!m?.text?.startsWith('/') || !m.from) return
  const [first, ...args] = m.text.trim().split(/\s+/)
  const cmd = first.toLowerCase().replace(/@.*$/, '') // "/khach@DanaBot" in groups
  const here = String(m.chat.id)
  const reply = (text: string) => tg('sendMessage', { chat_id: here, text })

  if (cmd === '/batdau') {
    // First chat to register becomes the staff chat and its sender the first owner. After that only an owner
    // can move the bot, by sending /batdau in the new group; roles belong to people, so they carry over.
    if (m.sender_chat) return reply(ANONYMOUS_SELF) // else the shared anonymous stand-in, i.e. any anonymous admin anywhere, would become owner
    if (await redis('SET', 'tg:chat', here, 'NX')) {
      await setRole(m.from, 'owner')
      return reply(`Đã gắn bot với nhóm này. ${userName(m.from)} là chủ quán.\n\n${HELP}`)
    }
    if (chat === here) return reply(`Bot đã gắn với nhóm này.\n\n${HELP}`)
    if (!(await can(m.from, 'owner'))) return reply('Bot đã được gắn với một nhóm khác. Chỉ chủ quán mới chuyển bot sang nhóm mới được.')
    await redis('SET', 'tg:chat', here)
    return reply(`Đã chuyển bot sang nhóm này. Nhóm cũ không còn nhận tin đặt bàn nữa.\n\n${HELP}`)
  }
  if (here !== chat) return // strangers who find the bot get nothing

  const now = nowHanoi()
  if (cmd === '/khach') {
    const guests = toInt(args[0])
    if (!(guests >= 1 && guests <= CAPACITY)) return reply('Cú pháp: /khach 5')
    const b = await insert({ date: now.date, time: fromMinutes(now.min), guests, name: 'Khách vãng lai', phone: '', email: '',
      note: clean(args.slice(1).join(' '), 200), source: 'walk-in', status: 'seated' })
    // Walk-ins are recorded even over capacity: the guests are already here.
    return announce(b, `Đang ngồi: ${occupancyAt(await dayRows(now.date), now.min)}/${CAPACITY}`)
  }
  if (cmd === '/dat') {
    const [d = '', t = '', g = '', ...rest] = args
    const date = parseDate(d, now)
    const start = toMinutes(t)
    const guests = toInt(g)
    const phone = rest.length > 1 && /^\+?[\d.]{9,16}$/.test(rest[rest.length - 1]) ? rest.pop()! : ''
    if (!date || dateError(date, now) || isNaN(start) || !(guests >= 1 && guests <= CAPACITY) || !rest.length) {
      return reply('Cú pháp: /dat 26/11 19:00 6 Lan 0912345678\n(ngày có thể là "nay" hoặc "mai"; số điện thoại không bắt buộc)')
    }
    const fields = { date, time: fromMinutes(start), guests, name: clean(rest.join(' '), 80), phone, email: '', note: '',
      source: 'phone' as const, status: 'confirmed' as const } // staff took the call, so it is confirmed
    const rows = await dayRows(date)
    const left = CAPACITY - peakOccupancy([...rows, { ...fields, id: '', createdAt: '' }], start)
    // Over capacity is a manager's call; the booking is then kept with a warning.
    if (left < 0 && !(await can(m.from, 'manager'))) return reply(`Không thêm được: vượt sức chứa ${-left} khách lúc cao điểm. ${MANAGERS_ONLY}`)
    return announce(await insert(fields), left < 0 ? `⚠️ Vượt sức chứa ${-left} khách lúc cao điểm` : `Chỗ còn lại khung ${fields.time}: ${left}/${CAPACITY}`)
  }
  if (cmd === '/huy') {
    if (!(await can(m.from, 'manager'))) return reply(MANAGERS_ONLY)
    const b = await setStatus(String(args[0] ?? '').toUpperCase(), 'cancelled', userName(m.from))
    if (!b) return reply('Không tìm thấy mã này. Cú pháp: /huy D1A2B3C')
    return reply(b.status === 'cancelled'
      ? `Đã huỷ ${b.id}: ${b.time} ${dmy(b.date)} · ${b.guests} khách · ${b.name}`
      : `${b.id} đã ở trạng thái "${STATUS_VI[b.status]}", không huỷ nữa.`)
  }
  if (cmd === '/quyen') {
    const target = m.reply_to_message?.from
    if (!args.length) {
      const list = (await roles()).filter(r => r.role !== 'staff').sort((a, b) => RANK[b.role] - RANK[a.role])
        .map(r => `${ROLE_VI[r.role]}: ${r.name}`)
      return reply([...list, 'Mọi người khác trong nhóm: Nhân viên.', '',
        'Chủ quán đổi quyền: trả lời (reply) tin nhắn của người đó bằng /quyen chu, /quyen quanly hoặc /quyen nhanvien.'].join('\n'))
    }
    if (!(await can(m.from, 'owner'))) return reply(m.sender_chat ? ANONYMOUS_SELF : 'Chỉ chủ quán mới đổi quyền được.')
    const role = parseRole(args)
    if (!role) return reply('Quyền phải là chu, quanly hoặc nhanvien. Ví dụ: trả lời tin nhắn của người đó bằng /quyen quanly.')
    if (m.reply_to_message?.sender_chat) return reply(anonymousTarget(m.reply_to_message.sender_chat.title))
    if (!target) return reply('Trả lời (reply) tin nhắn của người cần đổi quyền bằng /quyen chu, /quyen quanly hoặc /quyen nhanvien.')
    if (target.is_bot) return reply('Không phân quyền cho bot được.')
    const owners = (await roles()).filter(r => r.role === 'owner')
    if (role !== 'owner' && owners.length === 1 && owners[0].id === String(target.id)) return reply('Quán cần ít nhất một chủ quán.')
    await setRole(target, role)
    return reply(`${userName(target)}: ${ROLE_VI[role]}`)
  }
  if (cmd === '/homnay') {
    const date = args[0] ? parseDate(args[0], now) : now.date
    if (!date) return reply('Cú pháp: /homnay, /homnay mai, /homnay 26/11')
    const rows = await dayRows(date)
    const list = rows.filter(isActive).sort((a, b) => a.time.localeCompare(b.time))
      .map(b => `${b.time} · ${b.guests} khách · ${b.source === 'walk-in' ? 'vãng lai' : `${b.name}${b.phone ? ` · ${b.phone}` : ''}`} · ${b.id}${b.status === 'booked' ? ' · ⏳ chờ xác nhận' : ''}`)
    const slots = availability(rows, date, now).slots.filter(s => s.open).map(s => `${s.time} còn ${s.remaining}`)
    return reply([
      date === now.date ? `Hôm nay ${dmy(date)} · đang ngồi ${occupancyAt(rows, now.min)}/${CAPACITY}` : `Ngày ${dmy(date)}`,
      '',
      slots.length ? `Chỗ trống: ${slots.join(' · ')}` : 'Hết khung giờ nhận khách online.',
      '',
      list.length ? list.join('\n') : 'Chưa có bàn nào.',
    ].join('\n'))
  }
  return reply(HELP)
}

/** Points the bot's webhook at this deployment and fills its command menu. Safe to call again. */
async function setupTelegram(origin: string) {
  if (!botToken()) return { ok: false, error: 'TELEGRAM_BOT_TOKEN chưa được đặt trên Vercel' }
  const url = `${origin}/api/booking`
  const hook = await tgCall('setWebhook', { url, secret_token: webhookSecret(), allowed_updates: ['message', 'callback_query'] })
  if (!hook.ok) {
    const badToken = /unauthorized|not found/i.test(hook.description ?? '')
    return { ok: false, webhook: url, telegram: hook.description,
      error: badToken ? 'Token sai hoặc đã bị thu hồi: dán token mới nhất từ BotFather vào TELEGRAM_BOT_TOKEN trên Vercel, rồi Redeploy.' : 'Telegram từ chối webhook.' }
  }
  await tg('setMyCommands', { commands: COMMANDS })
  return { ok: true, webhook: url, next: 'Thêm bot vào nhóm Telegram của quán rồi gõ /batdau trong nhóm.' }
}

// ───────────────────────── HTTP ─────────────────────────

const reply = (body: unknown, status = 200) => Response.json(body, { status, headers: { 'cache-control': 'no-store' } })

export async function GET(request: Request) {
  if (!redisUrl() || !redisToken()) return reply({ ok: false, error: 'disabled' }, 503)
  const url = new URL(request.url)
  const action = url.searchParams.get('action')
  try {
    if (action === 'availability') {
      const date = url.searchParams.get('date') ?? ''
      const now = nowHanoi()
      return reply(dateError(date, now) ? { ok: false, error: 'invalid_date' } : availability(await dayRows(date), date, now))
    }
    if (action === 'telegram-setup') return reply(await setupTelegram(url.origin))
    return reply({ ok: false, error: 'unknown_action' }, 400)
  } catch (err) {
    console.error(err)
    return reply({ ok: false, error: 'backend' }, 502)
  }
}

export async function POST(request: Request) {
  if (!redisUrl() || !redisToken()) return reply({ ok: false, error: 'disabled' }, 503)
  const telegramSecret = request.headers.get('x-telegram-bot-api-secret-token')
  if (telegramSecret !== null) {
    // Always 200 to Telegram, or it keeps re-sending the same update.
    if (telegramSecret === webhookSecret()) {
      try { await onUpdate((await request.json()) as TgUpdate) } catch (err) { console.error(err) }
    }
    return reply({ ok: true })
  }
  let body: Req
  try {
    body = (await request.json()) as Req
  } catch {
    return reply({ ok: false, error: 'bad_request' }, 400)
  }
  const ip = request.headers.get('x-real-ip') ?? request.headers.get('x-forwarded-for')?.split(',')[0].trim() ?? ''
  try {
    if (body.action === 'book') return reply(await book(body, ip))
    if (body.action === 'cancel') return reply(await guestCancel(body, ip))
    return reply({ ok: false, error: 'unknown_action' }, 400)
  } catch (err) {
    console.error(err)
    return reply({ ok: false, error: 'backend' }, 502)
  }
}
