/**
 * 不开启 strictFunctionTypes: true， 参数是双向斜变的
 * 
 * 需要开启 strictFunctionTypes: true
 * 函数的参数 逆变 (可以传父类型)
 * 函数的返回值 斜变 (可以传子类型)
 */

export {}

interface Animal{
    name: string
    age: number
}
interface Person {
    name: string
    age: number
    gender: number
}

let a: Animal = {
    name: '11',
    age: 10
}

let p: Person = {
    name: '11',
    age: 10,
    gender: 1
}

function getName(a: Animal): string{
    return a.name
}
getName(a)

// p 这个 对象能够 被 Animal识别的原因是 p拥有的 key 比 Animal需要的key 多，所以 p这个对象可以赋值进去
getName(p)





{
    let num2: {
        toString: () => string
    }
    let str2: string = '11'
    num2 = str2

    // 报错 因为 num2 覆盖的类型 没有 str2 的类型多
    // str2 = num2
}





/**
 * 不开启 strictFunctionTypes: true， 参数是双向斜变的
 * 
 * 需要开启 strictFunctionTypes: true
 * 函数的参数 逆变 (可以传父类型)
 * 函数的返回值 斜变 (可以传子类型)
 */
namespace nibian{
    type Func = (a: number, b: number) => void
    let sum: Func;

    function f1(a: number, b: number): void{}
    sum = f1

    // 参数少一个也是可以的
    function f2(a: number): void{}
    sum = f2

    // 参数少两个个也是可以的
    function f3(): void{}
    sum = f3

    // 参数多一个就报错
    function f4(a: number, b: number, c:number): void{}
    // sum = f4
}

namespace xiebian{
    type GetPerson = () => {a: number, b: number}
    let getPerson: GetPerson

    function g1(){
        return { a:1, b:2 }
    }
    getPerson = g1;


    function g2(){
        return { a:1, b:2, c: 10 }
    }
    getPerson = g2;

    function g3(){
        return { a:1 }
    }
    // 报错
    // getPerson = g3;
}




// 参数逆变，返回值斜边(参数可以多传， 返回值可以少传)
namespace demo {
    type Callback = (a: string | number | boolean) => string | number
    function exec(cb: Callback){}

    type ChildToChild = (a: string) => string
    let childTochild: ChildToChild
    exec(childTochild)


    type ChildToParent = (a: string) => string | number | boolean
    let childToParent: ChildToParent //= (a: string) => '1'
    exec(childToParent)

    type ParentToParent = (a: string | number | boolean) => string | number | boolean
    let parentToParent: ParentToParent //= (a: string | number | boolean) => 1
    exec(parentToParent)

    type ParentToChild = (a: string | number | boolean) => string
    let parentToChild: ParentToChild = (a: string | number | boolean) => ''
    exec(parentToChild)
}













// 范型在判断兼容性的时候先判断具体的类型，在进行兼容性判断
namespace test{
    interface Empty1<T>{

    }
    let x1!: Empty1<string>
    let y1!: Empty1<number>
    x1 = y1




    interface Empty2<T>{
        data: T
    }
    let x2!: Empty2<string>
    let y2!: Empty2<number>
    // 报错
    // x2 = y2
}






// 数组和枚举之间是互相兼容的
namespace numberEnum{
    enum COLOR {RED, YELLOW} 

    // 枚举兼容数字 
    let c: COLOR
    c = 1


    // 枚举兼容数字
    let n: number
    n = COLOR.RED
}
