import { call } from 'redux-saga';
import { delay } from '../../util'

export function * read(){
    // call 就是调用 delay，并传入1000参数
    // delay 返回一个promise，
    // middleware 等待promise 结束
    let result = yield call(delay, 1000, 2000)
    console.log(result)
}