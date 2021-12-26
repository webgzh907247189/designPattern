export {}

class Food{
    constructor(public name: string){
        this.name = name
    }
}

// 接口描述函数
interface Getname{
    new (name: string): Food
}
const getName = (clazz: Getname, name: string) => {
    return new clazz(name)
}
let result = getName(Food, '米饭')
console.log(result.name)


/**
 * 写一个类的时候得到2个类型
 * 1. 构造函数类型的 函数类型
 * 2. 类的实列 类型
 */
namespace com {
    // typeof 获取类型
    class Component{
        constructor(){}
    }
    let com = Component

    // Component 类名本身表示的是实列的类型
    // ts 一个是类型 一个是值
    // 冒号后面是类型， 等号后面是值

    let c: Component = new Component()


    // 获取 Component 的函数类型
    type ss = typeof Component;
    let d: ss = com;
}



// 与 new
function factory<T>(type: {new(): T} ): T{
    return new type()
}
class Test {
}
let test = factory(Test)



// 范型接口
interface Calc1{
    <T>(a: T, b: T): T
}
let sum1: Calc1 = function <T>(a: T, b: T) {
    return a
    // 此处不能相加， 因为 这个 T 可以是任意 类型
    // return a + b
}
sum1<number>(1, 2);



interface Calc2<T>{
    (a: T, b: T): T
}
let sum2: Calc2<string> = (a, b) => {
    return a + b
}


// 范型交换
function swap<A, B>(tuple: [A, B]): [B,A]{
    return [tuple[1], tuple[0]]
}



// interface LengthWise {
//     length: number
// }

type LengthWise = {
    length: number
}
// 这里的 extends 是约束的意思
function logger<T extends LengthWise>(val: T){
    return val.length
}
logger('123213')
// logger(123213) // number 类型错误


let obj = {
    length: 10
}
type Obj = typeof obj
logger<Obj>('123213')


// 判断兼容不兼容 只看形状，形态一样就兼容 (father 和 child 互相继承的案列)