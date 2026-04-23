/**
 * Polymarket：轮询指定 outcome 的 CLOB 中价（mid_price，可视作隐含概率 0~1），达到阈值时可触发下单。
 * 法律与资金风险：自动化交易可能违反当地法规或平台条款；可能造成本金损失。
 *   使用前请自行完成合规审查，仅用你可承受损失的资金测试。
 *
 * 公开行情（无需密钥）：
 *   GET https://clob.polymarket.com/midpoint?token_id=<CLOB_TOKEN_ID>
 *
 * 下单需：钱包私钥、CLOB API 凭证、tickSize / negRisk 等（见 Polymarket 官方文档）。
 *   https://docs.polymarket.com/developers/CLOB/orders/create-order
 *
 * 运行（Node 18+）：
 *   DRY_RUN=1 node scripts/polymarket/monitor-and-trade.mjs
 *
 * 环境变量：
 *   CLOB_YES_TOKEN_ID   必填其一：YES 侧 outcome的 clob token id（大整数字符串）
 *   EVENT_SLUG          选填：Gamma 事件 slug；与 MARKET_INDEX 一起解析出 token（多市场事件时注意下标）
 *   MARKET_INDEX        选填：事件下 markets 数组下标，默认 0
 *   OUTCOME_INDEX       选填：clobTokenIds 里 YES/NO 顺序，默认 0（一般为 YES）
 *   PROB_THRESHOLD      默认 0.7（当中价 >= 此值时触发）
 *   POLL_MS             默认 3000
 *   DRY_RUN             默认 1；设为 0 且安装依赖后才真实下单
 *   COOLDOWN_MS         触发后冷却，默认 60000
 *   HYSTERESIS          触发后需跌回 threshold - hysteresis 才允许再次触发，默认 0.05
 *
 * 真实下单额外变量（DRY_RUN=0）：
 *   PRIVATE_KEY
 *   CLOB_API_KEY, CLOB_SECRET, CLOB_PASSPHRASE
 *   FUNDER_ADDRESS     视签名类型（proxy/safe）必填
 *   SIGNATURE_TYPE        默认 0（EOA），常见还有 1 / 2，见官方文档
 *   ORDER_SIZE            份额数量
 *   ORDER_PRICE           限价；不填则用 min(当前 mid, ORDER_PRICE_MAX)，ORDER_PRICE_MAX 默认 0.99
 *   TICK_SIZE             默认 0.01
 *   NEG_RISK              默认 false（字符串 "true" / "1" 为真）
 *
 * 依赖（仅 DRY_RUN=0）：
 *   npm i @polymarket/clob-client ethers
 */

const CLOB_HOST = process.env.CLOB_HOST || 'https://clob.polymarket.com'
const GAMMA_HOST = process.env.GAMMA_HOST || 'https://gamma-api.polymarket.com'

const POLL_MS = Number(process.env.POLL_MS || 3000)
const PROB_THRESHOLD = Number(process.env.PROB_THRESHOLD || 0.7)
const DRY_RUN = process.env.DRY_RUN !== '0' && process.env.DRY_RUN !== 'false'
const COOLDOWN_MS = Number(process.env.COOLDOWN_MS || 60_000)
const HYSTERESIS = Number(process.env.HYSTERESIS || 0.05)
const MARKET_INDEX = Number(process.env.MARKET_INDEX || 0)
const OUTCOME_INDEX = Number(process.env.OUTCOME_INDEX || 0)

/** @type {number | null} */
let lastTriggerAt = null
/** 触发后要求价格回到阈值以下（带滞回）才允许再触发 */
let armed = true

/**
 * @param {string} tokenId
 * @returns {Promise<number>}
 */
async function fetchMidPrice(tokenId) {
  const url = new URL(`${CLOB_HOST}/midpoint`)
  url.searchParams.set('token_id', tokenId)
  const res = await fetch(url)
  if (!res.ok) {
    const text = await res.text()
    throw new Error(`midpoint ${res.status}: ${text}`)
  }
  const data = await res.json()
  const mid = Number(data.mid_price)
  if (Number.isNaN(mid)) throw new Error(`bad mid_price: ${JSON.stringify(data)}`)
  return mid
}

/**
 * @param {string} slug
 * @returns {Promise<string>}
 */
async function resolveYesTokenFromSlug(slug) {
  const res = await fetch(`${GAMMA_HOST}/events/slug/${encodeURIComponent(slug)}`)
  if (!res.ok) {
    const t = await res.text()
    throw new Error(`gamma event ${res.status}: ${t}`)
  }
  const event = await res.json()
  const markets = event.markets
  if (!Array.isArray(markets) || !markets[MARKET_INDEX]) {
    throw new Error(`event has no markets[${MARKET_INDEX}]`)
  }
  const raw = markets[MARKET_INDEX].clobTokenIds
  if (raw == null) throw new Error('market.clobTokenIds missing')
  const ids = typeof raw === 'string' ? JSON.parse(raw) : raw
  if (!Array.isArray(ids) || !ids[OUTCOME_INDEX]) {
    throw new Error(`clobTokenIds parse failed or missing index ${OUTCOME_INDEX}`)
  }
  return String(ids[OUTCOME_INDEX])
}

/**
 * @param {{ tokenId: string, mid: number }} args
 */
async function placeOrderIfConfigured({ tokenId, mid }) {
  if (DRY_RUN) {
    console.log(`[DRY_RUN] would BUY token=${tokenId} size=${process.env.ORDER_SIZE || '?'} price~${mid}`)
    return
  }

  const { ClobClient, Side, OrderType } = await import('@polymarket/clob-client')
  const { Wallet } = await import('ethers')

  const pk = process.env.PRIVATE_KEY
  if (!pk) throw new Error('PRIVATE_KEY required when DRY_RUN=0')

  const signer = new Wallet(pk)
  const chainId = Number(process.env.CHAIN_ID || 137)
  const apiCreds = {
    key: process.env.CLOB_API_KEY,
    secret: process.env.CLOB_SECRET,
    passphrase: process.env.CLOB_PASSPHRASE,
  }
  if (!apiCreds.key || !apiCreds.secret || !apiCreds.passphrase) {
    throw new Error('CLOB_API_KEY, CLOB_SECRET, CLOB_PASSPHRASE required when DRY_RUN=0')
  }

  const signatureType = Number(process.env.SIGNATURE_TYPE ?? 0)
  const funder = process.env.FUNDER_ADDRESS || undefined

  const client = new ClobClient(CLOB_HOST, chainId, signer, apiCreds, signatureType, funder)

  const size = Number(process.env.ORDER_SIZE || 0)
  if (!(size > 0)) throw new Error('ORDER_SIZE must be > 0')

  const tickSize = String(process.env.TICK_SIZE || '0.01')
  const negRisk = process.env.NEG_RISK === '1' || process.env.NEG_RISK === 'true'
  const priceCap = Number(process.env.ORDER_PRICE_MAX || 0.99)
  const price = process.env.ORDER_PRICE != null ? Number(process.env.ORDER_PRICE) : Math.min(mid, priceCap)

  const result = await client.createAndPostOrder(
    {
      tokenID: tokenId,
      price,
      size,
      side: Side.BUY,
    },
    { tickSize, negRisk },
    OrderType.GTC,
  )

  console.log('[ORDER]', JSON.stringify(result, null, 2))
}

async function main() {
  let tokenId = process.env.CLOB_YES_TOKEN_ID || ''
  const slug = process.env.EVENT_SLUG

  if (!tokenId && slug) {
    console.log(`Resolving token from EVENT_SLUG=${slug} …`)
    tokenId = await resolveYesTokenFromSlug(slug)
    console.log(`Using CLOB_YES_TOKEN_ID=${tokenId}`)
  }

  if (!tokenId) {
    console.error('Set CLOB_YES_TOKEN_ID or EVENT_SLUG (+ optional MARKET_INDEX / OUTCOME_INDEX).')
    process.exit(1)
  }

  console.log(
    JSON.stringify(
      {
        CLOB_HOST,
        tokenId: tokenId.slice(0, 24) + '…',
        PROB_THRESHOLD,
        POLL_MS,
        DRY_RUN,
        COOLDOWN_MS,
        HYSTERESIS,
      },
      null,
      2,
    ),
  )

  for (;;) {
    try {
      const mid = await fetchMidPrice(tokenId)
      const now = Date.now()
      const cooled = !lastTriggerAt || now - lastTriggerAt >= COOLDOWN_MS

      if (mid >= PROB_THRESHOLD && armed && cooled) {
        console.log(`[TRIGGER] mid=${mid.toFixed(4)} >= ${PROB_THRESHOLD}`)
        await placeOrderIfConfigured({ tokenId, mid })
        lastTriggerAt = now
        armed = false
      } else if (mid < PROB_THRESHOLD - HYSTERESIS) {
        armed = true
      }

      console.log(`[poll] mid=${mid.toFixed(4)} armed=${armed}`)
    } catch (e) {
      console.error('[error]', e instanceof Error ? e.message : e)
    }
    await new Promise((r) => setTimeout(r, POLL_MS))
  }
}

main().catch((e) => {
  console.error(e)
  process.exit(1)
})
