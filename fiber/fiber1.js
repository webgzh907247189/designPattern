// 屏幕刷新
// 60次/秒 ->  一次大概 16.6ms 


// 每一帧 先经过 requestAnimationFrame ，后面到 queuestIdleCallback

// 每一帧 执行顺序 (空闲阶段 -> 执行queuestIdleCallback 任务)
// input Events -> js -> begin frame(开始帧) 
// -> requestAnimationFrame -> 需要渲染的文档， 执行 IntersectionObserver 的回调  -> layout(布局) -> paint(绘制) 
// -> queuestIdleCallback

// 每一帧 执行任务时间长了，会阻塞同一帧后面的任务(layout，paint)



// https://mp.weixin.qq.com/s/Bh-nveCyLqkEDGQXri-8fg
// 1. 从任务队列中取出一个宏任务并执行。

// 2. 检查微任务队列，执行并清空微任务队列，如果在微任务的执行中又加入了新的微任务，也会在这一步一起执行。

// 3. 进入更新渲染阶段，判断是否需要渲染，这里有一个 rendering opportunity 的概念，
//     也就是说不一定每一轮 event loop 都会对应一次浏览 器渲染，要根据屏幕刷新率、页面性能、页面是否在后台运行来共同决定，通常来说这个渲染间隔是固定的。（所以多个 task 很可能在一次渲染之间执行）

//     . 浏览器会尽可能的保持帧率稳定，例如页面性能无法维持 60fps（每 16.66ms 渲染一次）的话，那么浏览器就会选择 30fps 的更新速率，而不是偶尔丢帧。
//     . 如果浏览器上下文不可见，那么页面会降低到 4fps 左右甚至更低。
//     . 如果满足以下条件，也会跳过渲染：
//     . 浏览器判断更新渲染不会带来视觉上的改变。
//     . map of animation frame callbacks 为空，也就是帧动画回调为空，可以通过 requestAnimationFrame 来请求帧动画。
// 4. 如果上述的判断决定本轮不需要渲染，那么下面的几步也不会继续运行：


// 5. 对于需要渲染的文档，如果窗口的大小发生了变化，执行监听的 resize 方法。

// 6. 对于需要渲染的文档，如果页面发生了滚动，执行 scroll 方法。

// 7. 对于需要渲染的文档，执行帧动画回调，也就是 requestAnimationFrame 的回调。（后文会详解）

// 8. 对于需要渲染的文档， 执行 IntersectionObserver 的回调。

// 9. 对于需要渲染的文档，重新渲染绘制用户界面。

// 10. 判断 task队列和microTask队列是否都为空，如果是的话，则进行 Idle 空闲周期的算法，判断是否要执行 requestIdleCallback 的回调函数。（后文会详解）



// 对于resize 和 scroll来说，并不是到了这一步才去执行滚动和缩放，那岂不是要延迟很多？浏览器当然会立刻帮你滚动视图，根据CSSOM 规范[2]所讲，浏览器会保存一个 pending scroll event targ



// 结论
// macroTask microTask 在之前执行
// 1. 事件循环不一定每轮都伴随着重渲染，但是一定会伴随着微任务执行。
// 2. 决定浏览器视图是否渲染的因素很多，浏览器是非常聪明的。
// 3. requestAnimationFrame在重新渲染屏幕之前执行，非常适合用来做动画。
// 4. requestIdleCallback在渲染屏幕之后执行，并且是否有空执行要看浏览器的调度，如果你一定要它在某个时间内执行，请使用 timeout参数。
// 5. resize和scroll事件其实自带节流，它只在 Event Loop 的渲染阶段去执行事件。