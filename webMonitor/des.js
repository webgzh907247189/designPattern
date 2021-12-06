// 监控
// 1. js错误       js 执行错误 或者 promise 异常
// 2. 资源异常     script link 加载异常
// 3. 接口错误     ajax 或者 fetch 接口异常
// 4. 白屏         页面白屏


// https://juejin.cn/post/6844904153869713416
// 用户体验
// 1. TTFB (time to first byte 首字节时间)          浏览器发起第一个请求数据返回第一个字节消耗的适合，这个时间包含网络请求时间，后端处理时间 ( 浏览器从请求页面开始到接收第一字节的时间，这个时间段内包括 DNS 查找、TCP 连接和 SSL 连接)
// 2. FP (first paint 首次绘制)                     第一个像素点绘制到屏幕到时间
// 3. FCP (first content print 首次内容绘制)        浏览器把第一个DOM渲染到屏幕到时间，可以是任何文本，图像，svg的时间
// 4. FMP (first meaning paint 首次有意义绘制)      首次绘制有意义 页面可用性的度量标准
// 5. FID (first input delay 首次延迟输入)          用户首次和页面交互到页面相应交互到时间
// 6. 卡顿                                        超过50ms的长任务


// 业务
// 1. PV          page view 页面浏览量或者点击
// 2. UV          访问某个站点的不同 ip地点的人数
// 页面停留时间     用户在每一个页面的停留时间


// 埋点方案
// 1. 代码埋点
// 2. 可视化埋点
// 3. 无痕埋点



// 阿里云的日志
// 1. 日志服务 Log Service (SLS)  日志采集
// 2. putWebTracking


// 很多到上报用的是 img图片，图片速度快，没有跨域问题
// 捕获 link 或者 script 加载错误 必须要在 捕获阶段完成

