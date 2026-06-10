/**
 * 每 INTERVAL_MS（默认 5000）请求一次 xtracker Polymarket 用户发帖接口，
 * 打印响应体字节长度；若为 JSON 则额外解析并打印数组 length或对象键数量。
 * 若本次 bodyByteLength 与上次不同（首次请求不提示），先输出一行红色加粗提醒，再照常输出 JSON。
 *
 * 运行（Node 18+）：
 *   node scripts/xtracker/poll-posts.mjs
 *
 * 环境变量：
 *   XTRACKER_URL   完整 URL，未设置则用下方默认
 *   INTERVAL_MS    默认 5000
 */
import { execSync } from 'node:child_process'

const DEFAULT_URL = 'https://xtracker.polymarket.com/api/users/elonmusk/posts?startDate=2026-06-01T16:00:00.000Z&endDate=2026-06-03T16:00:59.000Z'
const TARGET_URL = process.env.XTRACKER_URL || DEFAULT_URL
const INTERVAL_MS = Math.max(1000, Number(process.env.INTERVAL_MS || 1000 ))

/** 上一次响应体字节长度；首次请求为 null，不标红 */
let lastResponseLength = null

const RED = '\x1b[31m'
const BOLD = '\x1b[1m'
const RESET = '\x1b[0m'

/**
 * @param {unknown} data
 * @returns {{ kind: string, length: number | null, detail?: string }}
 */
function analyzeJsonLength(data) {
  if (data === null || data === undefined) {
    return { kind: 'nullish', length: null }
  }
  if (Array.isArray(data)) {
    return { kind: 'array', length: data.length }
  }
  if (typeof data === 'object') {
    const keys = Object.keys(data)
    if ('data' in data && Array.isArray(/** @type {any} */ (data).data)) {
      const inner = /** @type {any} */ (data).data
      return {
        // kind: 'object{data:array}',
        kind: `${data.data?.[0]?.content}`,
        'dataLength-dataLength-dataLength': inner.length,
        // detail: `topKeys=${keys.length}`,
      }
    }
    if ('posts' in data && Array.isArray(/** @type {any} */ (data).posts)) {
      const inner = /** @type {any} */ (data).posts
      return {
        kind: `${data.data?.[0]?.content}`,
        length: inner.length,
        detail: `topKeys=${keys.length}`,
      }
    }
    return { kind: 'object', length: keys.length, detail: 'top-level key count' }
  }
  return { kind: typeof data, length: null }
}

async function fetchOnce() {
  const t0 = Date.now()
  console.log('111')
  const res = await fetch(TARGET_URL, {
    headers: { Accept: 'application/json, text/plain, */*' },
  })
  console.log('2222', res, '??')
  const buf = await res.arrayBuffer()
  const byteLength = buf.byteLength
  const text = new TextDecoder().decode(buf)

  // const headerLen = res.headers.get('content-length')
  const line = {
    ok: res.ok,
    status: res.status,
    ms: Date.now() - t0,
    bodyByteLength: byteLength,
    // contentLengthHeader: headerLen,
  }

  let parsed = null
  let jsonAnalysis = null
  try {
    parsed = JSON.parse(text)
    jsonAnalysis = analyzeJsonLength(parsed)
  } catch {
    jsonAnalysis = { kind: 'non-json', length: null, detail: 'parse failed' }
  }

  const payload = {
    ...line,
    json: jsonAnalysis,
  }
  const lineStr = JSON.stringify(payload, null, 0)

  const changed =
    lastResponseLength !== null && byteLength !== lastResponseLength

  if (changed) {
    console.log(
      `${RED}${BOLD}[响应长度变化] ${lastResponseLength} -> ${byteLength} bytes${RESET}`,
    )

    await execSync('afplay /System/Library/Sounds/Ping.aiff')
    await execSync('afplay /System/Library/Sounds/Glass.aiff')
    await execSync('afplay /System/Library/Sounds/Sosumi.aiff')
  }

  console.log(lineStr)
  console.log('\n-----\n')

  lastResponseLength = byteLength
}

async function main() {
  console.log(`url=${TARGET_URL}`)
  console.log(`intervalMs=${INTERVAL_MS}`)

  await fetchOnce().catch((e) => console.error('[error]', e.message || e))

  setInterval(() => {
    fetchOnce().catch((e) => console.error('[error]', e.message || e))
  }, INTERVAL_MS)
}

main().catch((e) => {
  console.error(e)
  process.exit(1)
})


