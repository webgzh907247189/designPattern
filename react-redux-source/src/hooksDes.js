1. 默认的 shouldComponentUpdate 会在 props 或 state 发生变化时返回 true, 表示组件会重新渲
React.memo 和 shouldComponentUpdate 对比 唯一的区别就在于 只进行了 props 的浅比,不会对hooks保存对state进行对比

2. immutable.js  数据发生了变更，只更新了父节点，比直接比对所有的属性简直强太多，并且更新后返回了一个全新的引用，即使是浅比对也能感知到数据的改变。

3. useRef 
  可以当作ref来使用
  也可以当作常量来使用 ->  // ref只在创建时更新，其属性current跟随xxx变化，不会生成新的，可以做常量控制

4.useLayoutEffect 同步触发渲染 & 读取 dom 布局
在所有的 dom 变更只会 同步调用 effect
useLayoutEffect 在 layout 阶段后面 & painting 阶段之前 执行
useEffect 在 painting 阶段之后 渲染 执行 （图层之后）

5.  
(解析 HTML dom -> 计算样式 cssom  -> 计算图层布局 -> render tree 
-> 绘制图层 painer  ->  整合图层，得到页面 将数据由 CPU 输出给 GPU 最终绘制在屏幕上)
复杂的视图层会给这个阶段的 GPU 计算带来一些压力，在实际应用中为了优化动画性能，我们有时会手动区分不同的图层