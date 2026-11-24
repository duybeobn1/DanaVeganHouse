// Dāna table-booking backend: a Google Apps Script web app bound to the bookings Google Sheet.
// The website reaches it only through its /api/booking proxy, which adds the caller's IP (req.ip).
// Setup steps: booking/README.md. This repo is public, so the notification email and the staff
// PIN live in Script Properties (NOTIFY_EMAIL, STAFF_PIN), never in this file.

var CAPACITY = 30           // max guests in the restaurant at the same time (bookings + walk-ins)
var STAY_MINUTES = 120      // how long a table is assumed to stay
var SLOT_MINUTES = 30
var FIRST_SLOT = '11:00'
var LAST_SLOT = '20:30'     // open 11:00–22:00, last online seating 20:30
var MAX_ONLINE_GUESTS = 10  // bigger groups are asked to call
var MAX_DAYS_AHEAD = 60
var MIN_LEAD_MINUTES = 30   // no online booking for a slot starting sooner than this
var TZ = 'Asia/Ho_Chi_Minh'
var SHEET_NAME = 'Bookings'
var HEADERS = ['ID', 'Tạo lúc', 'Ngày', 'Giờ', 'Số khách', 'Tên', 'SĐT', 'Email', 'Ghi chú', 'Nguồn', 'Trạng thái']
// Rows whose status contains one of these no longer take seats.
var INACTIVE_STATUSES = ['huỷ', 'hủy', 'huy', 'cancel', 'đã về', 'da ve', 'left', 'no-show', 'không đến']

// ───────────────────────── HTTP entry points ─────────────────────────

function doGet(e) {
  var p = (e && e.parameter) || {}
  if (p.action === 'availability') {
    return json_(withRows_(function (rows) { return availability(rows, p.date, now_()) }))
  }
  return json_({ ok: false, error: 'unknown_action' })
}

function doPost(e) {
  var req
  try { req = JSON.parse(e.postData.contents) } catch (err) { return json_({ ok: false, error: 'bad_request' }) }
  if (req.action === 'book') return json_(handleBook_(req))
  if (req.action === 'walkin') return json_(handleWalkin_(req))
  if (req.action === 'status') return json_(handleStatus_(req))
  return json_({ ok: false, error: 'unknown_action' })
}

function handleBook_(req) {
  if (req.website) return { ok: true, id: 'ok' } // honeypot filled: a bot; pretend success, save nothing
  // Loose limits on attempts (guests behind one carrier IP may retry), tight limit on saved bookings
  // so one sender cannot fill the 30-seat cap.
  var ip = req.ip || ''
  if (tooManyRequests_('book_ip_' + ip, 20, 3600) || tooManyRequests_('book', 60, 600)) return { ok: false, error: 'busy' }
  var cache = CacheService.getScriptCache()
  var savedFromIp = toInt_(cache.get('saved_ip_' + ip))
  if (savedFromIp >= 3) return { ok: false, error: 'limit' }
  var lock = LockService.getScriptLock()
  lock.waitLock(15000)
  try {
    var sheet = sheet_()
    var rows = readRows_(sheet)
    var now = now_()
    var check = checkBooking(rows, req, now)
    if (!check.ok) return check
    var id = newId_()
    appendRow_(sheet, [id, now.date + ' ' + now.time, req.date, req.time, check.guests,
      check.name, check.phone, check.email, check.note, 'web', 'Đã nhận'])
    cache.put('saved_ip_' + ip, String(savedFromIp + 1), 21600) // 3 bookings per IP per 6 hours
    notifyOwner_(check, id, check.remaining - check.guests)
    return { ok: true, id: id }
  } finally {
    lock.releaseLock()
  }
}

function handleWalkin_(req) {
  var denied = checkPin_(req.pin, req.ip)
  if (denied) return denied
  var guests = toInt_(req.guests)
  if (!(guests >= 1 && guests <= CAPACITY)) return { ok: false, error: 'invalid_guests' }
  var lock = LockService.getScriptLock()
  lock.waitLock(15000)
  try {
    var sheet = sheet_()
    var now = now_()
    appendRow_(sheet, [newId_(), now.date + ' ' + now.time, now.date, now.time, guests,
      'Khách vãng lai', '', '', clean_(req.note, 200), 'walk-in', 'Đang ngồi'])
    var rows = readRows_(sheet)
    // Walk-ins are recorded even over capacity: the guests are already here.
    return { ok: true, occupancyNow: occupancyAt(rows, now.date, toMinutes(now.time)) }
  } finally {
    lock.releaseLock()
  }
}

function handleStatus_(req) {
  var denied = checkPin_(req.pin, req.ip)
  if (denied) return denied
  var now = now_()
  var rows = readRows_(sheet_())
  var today = rows.filter(function (r) { return r.date === now.date && r.active })
    .sort(function (a, b) { return a.start - b.start })
    .map(function (r) { return { time: r.time, guests: r.guests, name: r.name, phone: r.phone, source: r.source, status: r.status } })
  return {
    ok: true,
    date: now.date,
    occupancyNow: occupancyAt(rows, now.date, toMinutes(now.time)),
    capacity: CAPACITY,
    slots: availability(rows, now.date, now).slots,
    bookings: today,
  }
}

// ───────────────────────── Pure logic (unit-tested in Node) ─────────────────────────

function pad2(n) { return ('0' + n).slice(-2) }

function toMinutes(hhmm) {
  var m = /^(\d{1,2})[:hH.](\d{2})/.exec(String(hhmm).trim())
  return m ? Number(m[1]) * 60 + Number(m[2]) : NaN
}

function fromMinutes(min) { return pad2(Math.floor(min / 60)) + ':' + pad2(min % 60) }

/** Accepts the display formats staff may type in the Sheet: 2026-11-24, 24/11/2026, 24/11. */
function normDate(value, year) {
  var s = String(value).trim(), m
  if ((m = /^(\d{4})-(\d{1,2})-(\d{1,2})$/.exec(s))) return m[1] + '-' + pad2(m[2]) + '-' + pad2(m[3])
  if ((m = /^(\d{1,2})\/(\d{1,2})(?:\/(\d{4}))?$/.exec(s))) return (m[3] || year) + '-' + pad2(m[2]) + '-' + pad2(m[1])
  return ''
}

/** Days from date a to date b, both yyyy-MM-dd. */
function dayDiff(a, b) {
  var pa = a.split('-'), pb = b.split('-')
  return (Date.UTC(pb[0], pb[1] - 1, pb[2]) - Date.UTC(pa[0], pa[1] - 1, pa[2])) / 86400000
}

function isInactive(status) {
  var s = String(status || '').toLowerCase()
  return INACTIVE_STATUSES.some(function (w) { return s.indexOf(w) !== -1 })
}

/** Sheet display values (strings) → booking objects. Rows that cannot be read are skipped. */
function parseRows(values, year) {
  var rows = []
  for (var i = 1; i < values.length; i++) {
    var v = values[i]
    var date = normDate(v[2], year)
    var start = toMinutes(v[3])
    var guests = toInt_(v[4])
    if (!date || isNaN(start) || !(guests > 0)) continue
    rows.push({ id: v[0], date: date, time: fromMinutes(start), start: start, guests: guests,
      name: v[5], phone: v[6], source: v[9], status: v[10], active: !isInactive(v[10]) })
  }
  return rows
}

/** Guests seated at minute `min` of `date`. */
function occupancyAt(rows, date, min) {
  var sum = 0
  rows.forEach(function (r) {
    if (r.active && r.date === date && r.start <= min && min < r.start + STAY_MINUTES) sum += r.guests
  })
  return sum
}

/** Highest number of guests seated at any moment in [start, start + STAY). Exact: occupancy only rises at a row's start. */
function peakOccupancy(rows, date, start) {
  var end = start + STAY_MINUTES
  var peak = occupancyAt(rows, date, start)
  rows.forEach(function (r) {
    if (r.active && r.date === date && r.start > start && r.start < end) peak = Math.max(peak, occupancyAt(rows, date, r.start))
  })
  return peak
}

function slotTimes() {
  var out = []
  for (var m = toMinutes(FIRST_SLOT); m <= toMinutes(LAST_SLOT); m += SLOT_MINUTES) out.push(m)
  return out
}

function dateError(date, now) {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(String(date))) return 'invalid_date'
  var d = dayDiff(now.date, date)
  if (isNaN(d) || d < 0 || d > MAX_DAYS_AHEAD) return 'invalid_date'
  return ''
}

/** { ok, date, slots: [{ time, remaining, open }] } for the public booking form. */
function availability(rows, date, now) {
  var err = dateError(date, now)
  if (err) return { ok: false, error: err }
  var nowMin = toMinutes(now.time)
  return {
    ok: true,
    date: date,
    maxGuests: MAX_ONLINE_GUESTS,
    slots: slotTimes().map(function (m) {
      var tooSoon = date === now.date && m < nowMin + MIN_LEAD_MINUTES
      return { time: fromMinutes(m), remaining: Math.max(0, CAPACITY - peakOccupancy(rows, date, m)), open: !tooSoon }
    }),
  }
}

/** Validates a web booking against the rules and the 30-guest cap. Returns cleaned fields on success. */
function checkBooking(rows, req, now) {
  var dErr = dateError(req.date, now)
  if (dErr) return { ok: false, error: dErr }
  var start = toMinutes(req.time)
  if (slotTimes().indexOf(start) === -1) return { ok: false, error: 'invalid_time' }
  if (req.date === now.date && start < toMinutes(now.time) + MIN_LEAD_MINUTES) return { ok: false, error: 'too_soon' }
  var guests = toInt_(req.guests)
  if (!(guests >= 1 && guests <= MAX_ONLINE_GUESTS)) return { ok: false, error: 'invalid_guests' }
  var name = clean_(req.name, 80)
  if (!name) return { ok: false, error: 'invalid_name' }
  var rawPhone = String(req.phone == null ? '' : req.phone).trim()
  var digits = rawPhone.replace(/\D/g, '')
  if (!/^\+?[\d\s.\-()]+$/.test(rawPhone) || digits.length < 9 || digits.length > 15) return { ok: false, error: 'invalid_phone' }
  var phone = clean_(rawPhone, 20)
  var email = clean_(req.email, 120)
  if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return { ok: false, error: 'invalid_email' }
  var sameDay = rows.filter(function (r) { return r.active && r.date === req.date && String(r.phone).replace(/\D/g, '') === digits })
  if (sameDay.length >= 2) return { ok: false, error: 'duplicate' }
  var remaining = CAPACITY - peakOccupancy(rows, req.date, start)
  if (guests > remaining) return { ok: false, error: 'full', remaining: Math.max(0, remaining) }
  return { ok: true, date: req.date, time: fromMinutes(start), guests: guests, name: name, phone: phone,
    email: email, note: clean_(req.note, 500), remaining: remaining }
}

function toInt_(v) { var n = parseInt(v, 10); return isNaN(n) ? 0 : n }

/** Trims, caps length, and neutralises spreadsheet formulas (=, +, -, @ at the start). */
function clean_(v, max) {
  var s = String(v == null ? '' : v).replace(/[\r\n\t]+/g, ' ').trim().slice(0, max)
  return /^[=+\-@]/.test(s) ? "'" + s : s
}

// ───────────────────────── Apps Script services ─────────────────────────

function now_() {
  var d = new Date()
  return { date: Utilities.formatDate(d, TZ, 'yyyy-MM-dd'), time: Utilities.formatDate(d, TZ, 'HH:mm') }
}

function sheet_() {
  var ss = SpreadsheetApp.getActiveSpreadsheet()
  return ss.getSheetByName(SHEET_NAME) || setup()
}

function readRows_(sheet) {
  return parseRows(sheet.getDataRange().getDisplayValues(), now_().date.slice(0, 4))
}

function withRows_(fn) { return fn(readRows_(sheet_())) }

function appendRow_(sheet, values) {
  // Write as plain text so Sheets does not turn dates, times or phone numbers into other types.
  var row = sheet.getLastRow() + 1
  sheet.getRange(row, 1, 1, values.length).setNumberFormat('@').setValues([values.map(String)])
}

function newId_() { return 'D' + Utilities.getUuid().slice(0, 6).toUpperCase() }

function checkPin_(pin, ip) {
  var expected = PropertiesService.getScriptProperties().getProperty('STAFF_PIN')
  if (!expected) return { ok: false, error: 'staff_disabled' }
  var cache = CacheService.getScriptCache()
  var key = 'pin_fails_' + (ip || '')
  var fails = toInt_(cache.get(key))
  if (fails >= 10) return { ok: false, error: 'locked' } // 10 wrong PINs from one IP → paused 10 min
  if (String(pin || '') !== expected) {
    cache.put(key, String(fails + 1), 600)
    return { ok: false, error: 'wrong_pin' }
  }
  return null
}

/** Counts calls of `key` in a window of `seconds` (restarted by each call); true once over `max`. */
function tooManyRequests_(key, max, seconds) {
  var cache = CacheService.getScriptCache()
  var n = toInt_(cache.get('rl_' + key)) + 1
  cache.put('rl_' + key, String(n), seconds)
  return n > max
}

function notifyOwner_(b, id, seatsLeft) {
  var to = PropertiesService.getScriptProperties().getProperty('NOTIFY_EMAIL')
  if (!to) return
  var dmy = b.date.split('-').reverse().join('/')
  var body = [
    'Đặt bàn mới qua website',
    '',
    'Mã: ' + id,
    'Ngày: ' + dmy + '   Giờ: ' + b.time,
    'Số khách: ' + b.guests,
    'Tên: ' + b.name,
    'SĐT: ' + b.phone,
    b.email ? 'Email: ' + b.email : null,
    b.note ? 'Ghi chú: ' + b.note : null,
    '',
    'Chỗ còn lại khung ' + b.time + ': ' + seatsLeft + '/' + CAPACITY,
    'Sheet: ' + SpreadsheetApp.getActiveSpreadsheet().getUrl(),
  ].filter(function (l) { return l !== null }).join('\n')
  var msg = { to: to, subject: '[Dāna] Đặt bàn ' + b.guests + ' khách · ' + dmy + ' ' + b.time + ' · ' + b.name, body: body, name: 'Dāna Đặt Bàn' }
  if (b.email) msg.replyTo = b.email
  try { MailApp.sendEmail(msg) } catch (err) { console.error('Email failed: ' + err) } // booking is already saved
}

function json_(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj)).setMimeType(ContentService.MimeType.JSON)
}

/** Run once from the editor: creates the Bookings tab with headers and plain-text columns. */
function setup() {
  var ss = SpreadsheetApp.getActiveSpreadsheet()
  var sheet = ss.getSheetByName(SHEET_NAME) || ss.insertSheet(SHEET_NAME)
  if (sheet.getLastRow() === 0) {
    sheet.getRange(1, 1, 1, HEADERS.length).setValues([HEADERS]).setFontWeight('bold')
    sheet.setFrozenRows(1)
  }
  sheet.getRange('A:K').setNumberFormat('@')
  return sheet
}
