// In-memory stand-ins for Upstash Redis (REST API) and the Telegram Bot API, installed by patching fetch.
// Used by booking.test.mjs and for running api/booking.ts locally without real accounts.
export const REDIS_URL = 'https://redis.fake'

export function installFakes() {
  const data = new Map() // key → string, or Map for hashes
  const telegram = []    // every Bot API call: { method, body }
  const telegramErrors = {} // method → description, to make that Bot API method fail
  let messageId = 100
  const realFetch = globalThis.fetch

  const run = ([cmd, key, ...args]) => {
    switch (cmd) {
      case 'GET': return typeof data.get(key) === 'string' ? data.get(key) : null
      case 'SET': if (args.includes('NX') && data.has(key)) return null; data.set(key, String(args[0])); return 'OK'
      case 'DEL': return data.delete(key) ? 1 : 0
      case 'INCR': { const n = Number(data.get(key) ?? 0) + 1; data.set(key, String(n)); return n }
      case 'EXPIRE': return data.has(key) ? 1 : 0 // expiry itself is not simulated
      case 'HSET': { const h = data.get(key) ?? new Map(); data.set(key, h); h.set(args[0], String(args[1])); return 1 }
      case 'HGET': return data.get(key)?.get(args[0]) ?? null
      case 'HGETALL': return [...(data.get(key) ?? new Map())].flat()
      default: throw new Error(`fake redis: ${cmd} not supported`)
    }
  }

  globalThis.fetch = async (url, init = {}) => {
    const u = String(url)
    if (u.startsWith(REDIS_URL)) return Response.json({ result: run(JSON.parse(init.body)) })
    const m = /^https:\/\/api\.telegram\.org\/bot[^/]+\/(\w+)$/.exec(u)
    if (m) {
      telegram.push({ method: m[1], body: JSON.parse(init.body) })
      if (telegramErrors[m[1]]) return Response.json({ ok: false, description: telegramErrors[m[1]] })
      return Response.json({ ok: true, result: m[1] === 'sendMessage' ? { message_id: ++messageId } : true })
    }
    return realFetch(url, init)
  }
  return { data, telegram, telegramErrors, restore: () => { globalThis.fetch = realFetch } }
}
