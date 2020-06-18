1. 默认的 shouldComponentUpdate 会在 props 或 state 发生变化时返回 true, 表示组件会重新渲
React.memo 和 shouldComponentUpdate 对比 唯一的区别就在于 只进行了 props 的浅比,不会对hooks保存对state进行对比

2. immutable.js  数据发生了变更，只更新了父节点，比直接比对所有的属性简直强太多，并且更新后返回了一个全新的引用，即使是浅比对也能感知到数据的改变。

3. 