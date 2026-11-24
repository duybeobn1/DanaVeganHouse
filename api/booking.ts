// Vercel Function: same-origin proxy from the website to the Apps Script booking backend (booking/Code.gs).
// Keeps the Apps Script URL out of the public bundle, avoids browser CORS issues with Apps Script,
// and passes the caller's IP so the backend can rate-limit per sender.
const API_URL = process.env.BOOKING_API_URL

const reply = (body: unknown, status = 200) =>
  Response.json(body, { status, headers: { 'cache-control': 'no-store' } })

async function relay(upstream: Promise<Response>) {
  try {
    const res = await upstream
    // Apps Script answers errors with an HTML page, so only pass on real JSON.
    return reply(JSON.parse(await res.text()))
  } catch {
    return reply({ ok: false, error: 'backend' }, 502)
  }
}

export function GET(request: Request) {
  if (!API_URL) return reply({ ok: false, error: 'disabled' }, 503)
  return relay(fetch(`${API_URL}?${new URL(request.url).searchParams}`))
}

export async function POST(request: Request) {
  if (!API_URL) return reply({ ok: false, error: 'disabled' }, 503)
  let body: Record<string, unknown>
  try {
    body = (await request.json()) as Record<string, unknown>
  } catch {
    return reply({ ok: false, error: 'bad_request' }, 400)
  }
  const ip = request.headers.get('x-real-ip') ?? request.headers.get('x-forwarded-for')?.split(',')[0].trim() ?? ''
  // fetch follows Apps Script's 302 to the result URL with a GET, which is what Apps Script expects.
  return relay(fetch(API_URL, { method: 'POST', body: JSON.stringify({ ...body, ip }) }))
}
