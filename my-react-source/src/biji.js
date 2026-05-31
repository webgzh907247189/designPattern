// react 区分函数组件和类组件 使用 isReactComponent 来区分

// function Component(){}
// Component.prototype.isReactComponent = {}

// https://luckyoneday.github.io/post/1-translate-tell-class-from-function/
// https://github.com/facebook/react/blob/cb1e7b1c6ccd989d54b376ee4ae9da72a34f96e5/packages/react/src/ReactBaseClasses.js#L29


https://juejin.cn/post/6882262783224709128





// react 16+ 渲染流程
// 1. scheduler 选择高优先级的任务进入  reconciler (确定执行哪些更新)
// 2. reconciler 计算变更的 内容  (render 阶段， 确定要更新的内容)
// 3. react-dom 把变更的内容渲染到页面上  (commit 阶段)
// domDiff 拿到老的fiber 树 跟新的 vdom 对比，生成新的 fiber 树的过程

// 快速响应 
// 1. 异步可中断渲染 
// 2. 增量更新
// 暂时是 实验版提供的能力 异步更新
// ReactDOM.unstable_createRoot(document.getElementById('root')).render(<App/>)


// 为了异步取消了
// componentWillMount 一会挂载 一会挂载
// componentWillUpdate 一会更新  一会更新
// componentWillReceiveprrops 一会更新 一会更新


// react 目前使用 链表，    每个 vdom 节点表示一个 fiber单元