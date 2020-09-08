import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';

import reducer from './reducer'
import rootsaga from './sagas';

let sagaMiddleware = createSagaMiddleware();

// sagaMiddleware 就是进程管理器 
// 后面派发的 执行对象，都让其管理
const store = applyMiddleware(sagaMiddleware)(createStore)(reducer);

sagaMiddleware.run(rootsaga)

export default store;

/**
 * 1. 创建进程管理器
 * 2. 应用中间件
 * 3. 启动 saga
 */