import { call, apply, cps } from 'redux-saga/effects';
import { delay, readFile } from '../../util'

// readFile node 风格的函数(有回调函数)
export function * read(){
    // call 就是调用 delay，并传入1000参数
    // delay 返回一个promise，
    // middleware 等待promise 结束

    // let result = yield call(delay, 1000, 2000)
    const _this1Test = { name: 'saga test1' }
    // let result = yield call([_this1Test, delay], 1000, 2000)

    let result = yield apply(_this1Test, delay, [1000, 2000]);
    console.log(result)

    let result2 = yield cps(readFile, '1.txt');
    console.log(result2)
}