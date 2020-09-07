import * as types from './action-types';

export default {
    increment(){
        return {type: types.INCREMENT}
    },
    asyncIncrement(){
        // 调用此方法， 派发一个异步+1
        // 这个action， 派发给 watcherSaga(监听saga) -> 类似饭店服务员下单，厨师干活
        return {type: types.ASYNCINCREMENT}
    }
}