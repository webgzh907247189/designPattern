// type AwaitWrapType<T> = (promise: Promise<T>) =>  Promise<[null, T] | [any, null] | [any, T] | [null, null]> 
// Promise<[null, any] | [any, null]>

// https://juejin.cn/post/6844903767129718791

export default function awaitWrap<T, U = any>(promise: Promise<T>): Promise<[U | null, T | null]> {
    return promise
        .then<[null, T]>(data => [null, data])
        .catch<[U, null]>(err => [err, null])
};



type ss1<T, U = any>  = [U | null, T | null] extends [null, T] | [U, null] | [U, T] | [null, null] ? '1' : '2'

type ss2<T, U = any>  = [null, T] | [U, null] | [U, T] | [null, null] extends [U | null, T | null] ? '1' : '2'

type test1 = ss1<string>
type test2 = ss2<string>
