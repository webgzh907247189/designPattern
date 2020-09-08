export { default as Provider } from "./Provider"; // 通过上下文对象向下层组件提供store
export { default as connect } from "./connect";

export { useStore, useDispatch, useReduxContext, useSelector } from "./hooks";

// 此处被当作 默认导出 使用，在外面直接 import xx from './xx' -> xx(test)
const name1 = 'test'
export { name1 as default};

/**
 * Redux 的设计目的在于提供一个独立于 UI 的数据中心，使得我们可以方便地在组件树中的任意多个组件间共享数据
 * 
 * React Redux 的核心点在于：
 * 提供数据给我们的组件。
 * 订阅 Store 的更新，及时 re-render 相关组件。 (Provider)
 * 
 * 提供 api 给我们的组件，是得我们可以在组件内可以发起对 Store 数据的更改。(dispatch)
 */

/**
 * React-Redux的核心使用 context 来设置contextValue 给下层组件
 * 
 * 子组件 使用 connect 函数完成 context 值的获取 & 订阅(状态映射 mapStateToProps) & 取消订阅(unSubscribe)
 */