import { takeEvery, delay, put, take, all } from 'redux-saga/effects';

// put 放;安置;猛推
// take -> 等待这个动作派发，一直等待
// all -> 类似 promise.all

import * as types from './action-types';
import { type } from 'os';

// saga 就说一个 generate 函数
export default function *rootsafa(){
    console.log('saga')

    // 返回一个 迭代器, 多个 不能 yield 不然后面的会被前面卡住，使用 all,并行处理
    // yield watchAsyncIncrement();
    yield all([watchAsyncIncrement()])
}

function * watchAsyncIncrement(){
    // incrementAsync  workSaga

    // takeEvery 接收两个参数 -> 第一个是 action，第二个是 workSaga  相当于向管理器发出一个 effect(指令)
    yield takeEvery(types.ASYNCINCREMENT, incrementAsync);
}

function * incrementAsync(){
    // sagaMiddleware 会停下来，等待这个promise 成功
    // 等这个promise 成功之后，继续向下执行
    yield delay(1000)

    yield put({type: types.INCREMENT})
}