import { all } from 'redux-saga/effects';
import { watchAsyncIncrement } from './counter';
import { read } from './read'


// all -> 类似 promise.all


// saga 就说一个 generate 函数
export default function *rootsafa(){
    console.log('saga')

    // 返回一个 迭代器, 多个 不能 yield 不然后面的会被前面卡住，使用 all,并行处理
    // yield watchAsyncIncrement();
    yield all([watchAsyncIncrement(), read()])
}