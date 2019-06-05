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