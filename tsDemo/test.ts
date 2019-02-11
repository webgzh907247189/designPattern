/**
 * 泛型
 */
function hello<H>(arg: H):H{
    return arg
}
var myhello: <H>(arg: H) => H = hello
myhello('111')
