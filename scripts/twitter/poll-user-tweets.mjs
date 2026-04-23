/**
 * 使用 X（Twitter）API v2 轮询指定用户最新发帖。
 *
 * 为什么不用「网页抓取」：违反 X 服务条款、易被风控/封禁、页面结构常变，不可靠。
 *
 * 前置条件：
 *   1. https://developer.twitter.com 创建 Project/App，开通 Elevated 或对应权限
 *   2. 生成 Bearer Token（仅读时间线可用 OAuth2 Bearer Token）
 *   3. 将 TWITTER_BEARER_TOKEN 写入环境变量（勿提交到 git）
 *
 * 速率限制：用户时间线接口有配额，每 5 秒请求一次很容易429。
 *   请用 INTERVAL_MS 调大（如 60000），或改用官方流式接口（需更高权限）。
 *
 * 运行（Node 18+）：
 *   TWITTER_BEARER_TOKEN=xxx node scripts/twitter/poll-user-tweets.mjs
 *
 * 环境变量：
 *   TWITTER_BEARER_TOKEN 必填
 *   TWITTER_USERNAME      默认 elonmusk（不含 @）
 *   INTERVAL_MS           默认 5000（毫秒）
 *   MAX_RESULTS           每次拉取条数，默认 10（上限见 X API 文档）
 */

const BEARER = process.env.TWITTER_BEARER_TOKEN
const USERNAME = (process.env.TWITTER_USERNAME || 'elonmusk').replace(/^@/, '')
const INTERVAL_MS = Math.max(1000, Number(process.env.INTERVAL_MS || 5000))
const MAX_RESULTS = Math.min(100, Math.max(5, Number(process.env.MAX_RESULTS || 10)))

const API = 'https://api.twitter.com/2'

if (!BEARER) {
  console.error('缺少 TWITTER_BEARER_TOKEN。请从 X Developer Portal 创建并导出。')
  process.exit(1)
}

/** @type {Set<string>} */
const seenTweetIds = new Set()

/** @type {string | null} */
let userId = null

async function resolveUserId() {
  const url = `${API}/users/by/username/${encodeURIComponent(USERNAME)}`
  const res = await fetch(url, {
    headers: { Authorization: `Bearer ${BEARER}` },
  })
  if (!res.ok) {
    const body = await res.text()
    throw new Error(`users/by/username ${res.status}: ${body}`)
  }
  const data = await res.json()
  const id = data?.data?.id
  if (!id) throw new Error(`unexpected response: ${JSON.stringify(data)}`)
  return id
}

async function fetchLatestTweets() {
  const url = new URL(`${API}/users/${userId}/tweets`)
  url.searchParams.set('max_results', String(MAX_RESULTS))
  url.searchParams.set(
    'tweet.fields',
    'created_at,public_metrics,conversation_id',
  )

  const res = await fetch(url.toString(), {
    headers: { Authorization: `Bearer ${BEARER}` },
  })
  if (!res.ok) {
    const body = await res.text()
    throw new Error(`user tweets ${res.status}: ${body}`)
  }
  return res.json()
}

function printTweet(t) {
  const line = [
    `[${t.created_at || '?'}]`,
    `id=${t.id}`,
    (t.text || '').replace(/\s+/g, ' ').slice(0, 280),
  ].join(' ')
  console.log(line)
}

async function pollOnce() {
  const payload = await fetchLatestTweets()
  const tweets = payload?.data
  if (!Array.isArray(tweets) || tweets.length === 0) {
    console.log(`[poll] 无新数据或时间线为空 meta=${JSON.stringify(payload?.meta || {})}`)
    return
  }

  const newestFirst = tweets
  const unseen = newestFirst.filter((t) => !seenTweetIds.has(t.id))
  for (const t of unseen.reverse()) {
    printTweet(t)
    seenTweetIds.add(t.id)
  }
  if (unseen.length === 0) {
    console.log(`[poll] 无新帖（最近 ${tweets.length} 条均已见过）`)
  }
}

async function main() {
  console.log(
    JSON.stringify(
      { USERNAME, INTERVAL_MS, MAX_RESULTS, hint: '若频繁 429，请增大 INTERVAL_MS' },
      null,
      2,
    ),
  )

  userId = await resolveUserId()
  console.log(`已解析 @${USERNAME} -> user_id=${userId}`)

  await pollOnce()

  setInterval(() => {
    pollOnce().catch((e) => console.error('[error]', e.message || e))
  }, INTERVAL_MS)
}

main().catch((e) => {
  console.error(e)
  process.exit(1)
})
