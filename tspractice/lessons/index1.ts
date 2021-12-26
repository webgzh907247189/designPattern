// 元组 (数量和类型都是确定已知的类型)
let test: [string, number] = ['11', 2]


// 两种枚举(普通枚举  常量枚举)
enum Gender{
    GIRL,
    BODY
}
const enum Colors{
    RED,
    YELLOW,
}



// strictNullChecks 为 true 则不能把 null undefined 赋值给 x
// null undefined 是其他类型的子类型
let x: number
x = 1;

// 开启 strict: true 配置，必须要先处理一下
(x as any) = undefined;
(x as any) = null;

// 下面 的能够赋值成功，因为取消了 strict: true 配置
// x = undefined;
// x = null;



// 非空断言
// 开启了 strict: true 配置， 需要非空断言 处理一下
// !. 在变量名后添加!，可以断言排除undefined和null类型
let app: HTMLElement | null = document.getElementById('root')
app!.style.color = 'red'



// never 代表不会出现的值
function name1(): never{
    throw new Error('111');
    console.log('111');
}




// void 可以被复制为 null 或者 undefined
// never 不能包含 任何类型
// 返回 void 的函数还能执行， 返回 never 的函数无法正常执行




// 加上这句话 指定编译时候用来包含的 编译文件
// lib: ["dom", "ESNext"] (Symbol 在 ESNext里面)
// Symbol
const s1 = Symbol('key');



// js 类型 BigInt Number， ts中的类型 bigInt, number
const max = Number.MAX_SAFE_INTEGER; // 2**53 - 1
console.log(BigInt(1 + max) ===  BigInt(max + 2));




// 能够掉用 toString 的原因 是自动 装箱
// 等价于 new String(name11).toString()
let name11: string = '11'
console.log(name11.toString())



// 联合类型  返回两个类型共同的属性和方法
let str: string | number
str!.toString() // 强制断言

str = 111
str.toFixed()





//字面量类型 和 类型字面量
const UP: 'up' = 'up'
type Params = 'up' | 'down'
function testU(parmas: Params){
}
testU('down')
// testU('11') // 报错

// 类型字面量
type Person = {
    name: string
}




// 字面量类型 和 联合类型
type str1 = '1' | '2' | '3'
type str2 = string | number | boolean
let str11: str1 = '3'
let str22 = '222'




// 重载
// 两个或者两个同名函数 参数不一样   给同一个函数提供多个定义 
function add(a: string, b: string): void
function add(a: number, b: number): void

// 中间不能加其他东西
// console.log('11');

function add(a, b){
    return a + b
}
add(1,1)
add('1','1')
// add('1',1) // 报错， 函数的重载






// 类数组 IArguments
function addd(){
    let args:IArguments = arguments;
}
addd();


// 范性类
class Test<T> {
    public list
    constructor(name: T) {
        this.list = name;
    }
}
let test1 = new Test<string>('test');




//接口可以重名(自动合并)
interface A{
    name: string   
}
interface A{
    age: string   
}
let aa: A = {
    name: '1',
    age: '2'
}



// 接口描述函数
interface Getname{
    (name: string): string
    age: number // 描述函数的属性
}
const getName: Getname = (name) => {
    return name
}
getName.age = 10

getName('22')



