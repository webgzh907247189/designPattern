// 屏幕刷新
// 60次/秒 ->  一次大概 16.6ms 


// 每一帧 先经过 requestAnimationFrame ，后面到 queuestIdleCallback

// 每一帧 执行顺序 (空闲阶段 -> 执行queuestIdleCallback 任务)
// input Events -> js -> begin frame(开始帧) -> requestAnimationFrame -> layout(布局) -> paint(绘制) -> queuestIdleCallback

// 每一帧 执行任务时间长了，会阻塞同一帧后面的任务(layout，paint)


