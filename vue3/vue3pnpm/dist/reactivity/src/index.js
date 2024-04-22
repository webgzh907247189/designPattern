export * from './effect';
export * from './reactive';
export * from './computed';
export * from './watch';
export * from './ref';
// 1. 先通过 new Proxy 实现一个响应式对象
// 2. effect 默认先执行一次, 把正在执行的 effect 作为全局变量 (activeEffect), 渲染的时候取值, 在 get 方法中进行依赖收集
// 3. weakMap -> {target对象: Map{ 属性值: set(effect) } } 
// 4. 稍后用户数据变化，通过对象属性来查找对应的 set effect 集合, 找到 set 里面存贮的 effects 全部执行
//# sourceMappingURL=index.js.map