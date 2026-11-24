// Runs booking/Code.gs in Node with in-memory stand-ins for the Apps Script services it uses.
// Used by Code.test.mjs and for a local mock backend while developing the booking UI.
import { readFileSync } from 'node:fs'
import { randomUUID } from 'node:crypto'
import vm from 'node:vm'

const code = readFileSync(new URL('./Code.gs', import.meta.url), 'utf8')

export function createGas({ now = '2026-11-24T12:00:00+07:00', props = {} } = {}) {
  const state = { now: new Date(now), mails: [], props: { ...props } }
  const cache = new Map()
  const sheets = new Map()

  const makeSheet = () => {
    const cells = []
    const sheet = {
      cells,
      getLastRow: () => cells.length,
      getDataRange: () => ({ getDisplayValues: () => cells.map(r => r.map(String)) }),
      getRange: (row, col, nr, nc) => {
        const range = {
          setNumberFormat: () => range,
          setFontWeight: () => range,
          setValues: vals => { vals.forEach((v, i) => { cells[row - 1 + i] = Array.from(v, s => String(s).replace(/^'/, '')) }); return range },
        }
        return range
      },
      setFrozenRows: () => {},
    }
    return sheet
  }

  const RealDate = Date
  class FixedDate extends RealDate {
    constructor(...args) { if (args.length) super(...args); else super(state.now.getTime()) }
  }

  const fmt = (d, tz, pattern) => {
    const p = Object.fromEntries(new Intl.DateTimeFormat('en-GB', {
      timeZone: tz, year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', hourCycle: 'h23',
    }).formatToParts(d).map(x => [x.type, x.value]))
    return pattern.replace('yyyy', p.year).replace('MM', p.month).replace('dd', p.day).replace('HH', p.hour).replace('mm', p.minute)
  }

  const ctx = {
    Date: FixedDate,
    console,
    Utilities: { formatDate: fmt, getUuid: () => randomUUID() },
    LockService: { getScriptLock: () => ({ waitLock: () => {}, releaseLock: () => {} }) },
    CacheService: { getScriptCache: () => ({ get: k => cache.get(k) ?? null, put: (k, v) => cache.set(k, v) }) },
    PropertiesService: { getScriptProperties: () => ({ getProperty: k => state.props[k] ?? null }) },
    MailApp: { sendEmail: msg => state.mails.push(msg) },
    ContentService: {
      MimeType: { JSON: 'json' },
      createTextOutput: s => ({ setMimeType: () => JSON.parse(s) }),
    },
    SpreadsheetApp: {
      getActiveSpreadsheet: () => ({
        getSheetByName: n => sheets.get(n) ?? null,
        insertSheet: n => { const s = makeSheet(); sheets.set(n, s); return s },
        getUrl: () => 'https://docs.google.com/spreadsheets/d/test',
      }),
    },
  }
  vm.createContext(ctx)
  vm.runInContext(code, ctx)

  return {
    ctx,
    state,
    sheet: () => sheets.get('Bookings') ?? ctx.setup(),
    get: params => ctx.doGet({ parameter: params }),
    post: body => ctx.doPost({ postData: { contents: JSON.stringify(body) } }),
  }
}
