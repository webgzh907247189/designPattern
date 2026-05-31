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






const aaa1 = ["1"] as const;
const aaa2 = ["1"];

type sss1 = typeof aaa1;
type sss2 = typeof aaa2;

type sss3 = sss1[number];
type sss4 = sss2[number];

type sss5 = sss1["length"];
type sss6 = sss2["length"];



type TupleToObject<T extends readonly any[]> = {
  [K in T[number]]: K;
};

const tuple = ["a", 1, "hi, girl"]; //as const

type R = TupleToObject<typeof tuple>;





type Length1<T extends any[]> = T extends readonly any[] ? T['length'] : never;
type Length2<T extends readonly any[]> = T['length'];

type a1 = Length1<['1']>
type a2 = Length2<['1']>

const tesla1 = ['a', 'b', 'c'] as const
type ssss1 = typeof tesla1
type Test1 = Length1<typeof tesla1>
const tesla2 = ['a', 'b', 'c'] as const
type Test2 = Length2<typeof tesla2>


