/**
 * ServiceWorker 缓存离线化
 * https://github.com/yang657850144/serviceworker
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


// Service Worker拥有自己独立的 worker 线程，独立于当前网页线程
// 离线缓存静态资源
// 拦截代理请求和响应
// 可自定义响应内容
// 可以通过postMessage向主线程发送消息
// 无法直接操作DOM
// 必须在HTTPS环境下工作或 localhost / 127.0.0.1 （自身安全机制）
// 通过Promise异步实现
// Service Worker安装(installing)完成后，就会一直存在，除非手动卸载(unregister)





/**
 * 通常使用 service worker 只需要以下几个步骤:
 * 
 * 1. 检测是否支持serivceworker     'serviceWorker' in navigator 进行检测。
 * 
 * 2. 注册(register)     使用 navigator.serviceWorker.register('./sw.js'),在当前主线程中注册 service worker。
 * 如果注册成功，service worker 则在 ServiceWorkerGlobalScope环境中运行; 需要注意的是: 当前环境无法操作DOM，且和主线程之间相互独立(即线程之间不会相互阻塞)
 * 
 * 3. 安装(install)   然后，后台开始安装service worker，一般在此过程中，开始缓存一些静态资源文件。
 * 
 * 4. 激活(active)   准备进行激活 service worker,通常在激活状态下，主要进行缓存清理，更新service worker等操作。
 * 
 * 5. 使用(activing)  ,service worker 就可以控制当前页面了。
 * 需要注意的是，只有在service worker成功激活后，才具有控制页面的能力，一般在第一次访问页面时，service worker第一次创建成功，并没有激活
 * 只有当刷新页面，再次访问之后，才具有控制页面的能力。
 * 
 * 6. 卸载(unregister)
 */
