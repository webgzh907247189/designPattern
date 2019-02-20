/**
 * 泛型
 */
function hello<H>(arg: H):H{
    return arg
}
var myhello: <H>(arg: H) => H = hello
myhello('111')



function he1<T>(arg: T[]): T[]{
    return arg
}
let listTest11: Array<string> = he1<string>(['2','44'])
let listTest22: Array<string> = he1(['2','44'])


/**
 * 泛型
 * 
 * 不需要手动的传入的参数的类型（string），因为编译器可以识别到传递了什么参数，并自动决定什么类型最适合它
 */
function test1<T>(args: T): T[]{
    let arr :T[] = []
    arr.push(args)
    return arr
}

var arrayFromString = test<string>("beep");
console.log(arrayFromString[0]); // "beep"
console.log(typeof arrayFromString[0]) // String

var arrayFromNumber = test(42);
console.log(arrayFromNumber as any[0]); // 42
console.log(typeof arrayFromNumber as any[0]) // number



