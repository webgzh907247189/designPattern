import createStore from './createStore'
import bindActionCreators from './bindActionCreators'
import combineReducers from './combineReducers'
import compose from './compose'
import applyMiddleware from './applyMiddleware'

export {createStore,bindActionCreators,combineReducers,compose,applyMiddleware}
export default {createStore,bindActionCreators,combineReducers,compose,applyMiddleware}



/**
 * Redux 的设计目的在于提供一个独立于 UI 的数据中心，使得我们可以方便地在组件树中的任意多个组件间共享数据
 * 
 * React Redux 的核心点在于：
 * 提供数据给我们的组件。
 * 订阅 Store 的更新，及时 re-render 相关组件。 (Provider)
 * 
 * 提供 api 给我们的组件，是得我们可以在组件内可以发起对 Store 数据的更改。(dispatch)
 */

// export {
//     xxx
// } from './createStore'