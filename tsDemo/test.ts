/**
 * 泛型
 */
function hello<H>(arg: H):H{
    return arg
}
var myhello: <H>(arg: H) => H = hello
myhello('111')



function he<T>(arg: T[]): T[]{
    return arg
}
let listTest11: Array<string> = he<string>(['2','44'])
let listTest22: Array<string> = he(['2','44'])



