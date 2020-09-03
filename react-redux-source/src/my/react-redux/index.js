export { default as Provider } from "./Provider"; // 通过上下文对象向下层组件提供store
export { default as connect } from "./connect";

export { useStore, useDispatch, useReduxContext, useSelector } from "./hooks";

// 此处被当作 默认导出 使用，在外面直接 import xx from './xx' -> xx(test)
const name1 = 'test'
export { name1 as default};
