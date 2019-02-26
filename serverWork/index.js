/**
 * ServiceWorker 缓存离线化
 * https://juejin.im/post/5c74e5566fb9a049be5e23c0
 * 
 * 
 * https://github.com/GoogleChromeLabs/quicklink
 * 如果目标用户手机普遍性能以及网络较差的情况下(例如东南亚、印度等海外市场)，瓶颈就在于DNS查询,TCP的建立时间,采用常规的优化手段就显得捉襟见肘。
 * 
 * 此时，我们项目组有尝试采用离线缓存方案，即将静态资源缓存到本地，通过拦截代理请求，读取本地文件，加快访问速度。
 */


//ServiceWorker的目的
/**
 * API 的唯一目的就是解放主线程，Web Worker 是脱离在主线程之外的，将一些复杂的耗时的活交给它干
 * 完成后通过 postMessage 方法告诉主线程
 * 而主线程通过 onMessage 方法得到 Web Worker 的结果反馈。
 */