import { takeEvery, delay, put, all } from 'redux-saga/effects';
import * as types from '../../store/action-types';

// put 放;安置;猛推
// take -> 等待这个动作派发，一直等待


export function * watchAsyncIncrement(){
    // incrementAsync  workSaga

    // takeEvery 接收两个参数 -> 第一个是 action，第二个是 workSaga  相当于向管理器发出一个 effect(指令)
    yield takeEvery(types.ASYNCINCREMENT, incrementAsync);
}

export function * incrementAsync(){
    // sagaMiddleware 会停下来，等待这个promise 成功
    // 等这个promise 成功之后，继续向下执行
    yield delay(1000)

    yield put({type: types.INCREMENT})
}