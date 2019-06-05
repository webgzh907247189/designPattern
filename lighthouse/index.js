/**
 * 生成站点报告
 * 
 * https://juejin.im/book/5b936540f265da0a9624b04b/section/5bb6218ee51d450e7762f873
 * 
 * 掘金小册 (前端性能优化原理与实践)
 */

// npm install -g lighthouse
// lighthouse https://juejin.im/books --view



{
    0. 前端优化 (网络优化,渲染优化)
    1. 深入了解http缓存http请求相关知识
    2. 了解浏览器渲染原理

    (解析 HTML dom -> 计算样式 cssom  -> 计算图层布局 render tree -> 绘制图层 painer  ->  整合图层，得到页面 将数据由 CPU 输出给 GPU 最终绘制在屏幕上)
    复杂的视图层会给这个阶段的 GPU 计算带来一些压力，在实际应用中为了优化动画性能，我们有时会手动区分不同的图层

    当前可视区域的高度 ->  window.innerHeight || document.documentElement.clientHeight 
    元素距离可视区域顶部的高度 -> getBoundingClientRect()
}
浏览器的GPU加速功能是将需要进行动画的元素提升到一个独立的层，这样就可以避免浏览器进行重新布局和绘制，所以能大大提高网页的性能。


{
    npm install的时候首先会下载对应资源包的压缩包放在用户目录下的.npm文件夹下，然后解压到项目的node_modules中，并且提取依赖包中指定的bin文件，在linux下会创建一条软连接，
    所以在linux下我们真正执行的是.bin文件夹下文件指向的文件
}





{
    浏览器与Node的事件循环(Event Loop)区别  -> // https://juejin.im/post/5c337ae06fb9a049bc4cd218
    一个浏览器通常由以下常驻线程组成：
        GUI 渲染线程  (，解析HTML、CSS，构建DOM树，布局和绘制等)
        JavaScript引擎线程  (责处理 JavaScript脚本，执行代码。该线程与 GUI渲染线程互斥，当 JS引擎线程执行 JavaScript脚本时间过长，将导致页面渲染的阻塞)
        定时触发器线程 (负责执行异步定时器一类的函数的线程，如： setTimeout，setInterval。)
        事件触发线程 (主要负责将准备好的事件交给 JS引擎线程执行)
        异步http请求线程 (负责执行异步请求一类的函数的线程，如： Promise，axios，ajax等)
    

    Node.js的运行机制如下:
        V8引擎解析JavaScript脚本。
        解析后的代码，调用Node API。
        libuv库负责Node API的执行。它将不同的任务分配给不同的线程，形成一个Event Loop（事件循环），以异步的方式将任务的执行结果返回给V8引擎。
        V8引擎再将结果返回给用户。
    
    
    
    node中的事件循环的顺序：
        外部输入数据-->轮询阶段(poll)-->检查阶段(check)-->关闭事件回调阶段(close callback)-->定时器检测阶段(timer)-->
        I/O事件回调阶段(I/O callbacks)-->闲置阶段(idle, prepare)-->轮询阶段（按照该顺序反复运行）
    
        timers 阶段：这个阶段执行timer（setTimeout、setInterval）的回调
        I/O callbacks 阶段：处理一些上一轮循环中的少数未执行的 I/O 回调
        idle, prepare 阶段：仅node内部使用
        poll 阶段：获取新的I/O事件, 适当的条件下node将阻塞在这里
        check 阶段：执行 setImmediate() 的回调
        close callbacks 阶段：执行 socket 的 close 事件回调   
}