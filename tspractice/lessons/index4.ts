export {}


// 三种方式解决这个问题
function getFirstLetter(str: string | null){
    // str = str || ''

    // if(str == null){
    //     return ''
    // }

    return str!.charAt(0)
}



type Bird = { leg: number }
type Dog = { leg: number }
function isBird(x: Bird | Dog): x is Bird{
    return x.leg === 2
}




// any 和 unknow 都是顶级类型
// unknow 类型 只能被赋值给 unknow自己 和 any
// 想调用 unknow 上面的属性和方法，需要对其 进行类型断言和保护
// unknown 类型不检查类型的前提， 只能判断是否相等

// never 是unknow 的子类型
type IsNever = never extends unknown ? true : false // true


// keyof unknown 是 never
type Keys = keyof unknown // never


type GetType<T> = {
    [K in keyof T]: number
}
type DD = GetType<unknown> // {} // 空对象


// 联合起来永远是  unknown
type U = unknown | string






// 交叉类型
type A = { name: string }
type B = { age: number }
type C = Omit<A & B, ''>

// type C = {
//     name: string;
//     age: number;
// }


// 联合类型的交叉类型
// CC 是 string
type AA = string | number
type BB = string | boolean
type CC = AA & BB  // string




// 不允许隐藏的any 类型
// noImplicitAny: true





type DefaultProps = {
    name?: string
    age?: number
}

let defaultProps: DefaultProps = {
    name: '22',
    age: 10
}
let props = {
    ...defaultProps,
    home: 'ss'
}
type Props = typeof props

// type Props = {
//     home: string;
//     name?: string | undefined;
//     age?: number | undefined;
// }









interface AnyObject {
    [prop: string]: any
}


{
    // Exclude
    type Exclude<T, U> = T extends U ? never : T;
    type T0 = Exclude<'a' | 'b' | 'c', 'a'>;  // "b" | "c"
}
{
    // Extract
    type Extract<T, U> = T extends U ? T : never;
    type test1 = Extract<'a' | 'b' | 'c', 'a'>
}







function mixin<T, U>(one: T, two: U){
    // 把 result 赋值 成为 T & U 的联合类型
    const result = <T & U>{}

    for (const key in one) {
        (result as T)[key] = one[key]
    }

    for (const key in two) {
        (<U>result)[key] = two[key]
    }
    return result
}
const x = mixin({name: '111'}, {age: 22})
type XX = typeof x;
// type XX = {
//     name: string;
// } & {
//     age: number;
// }





// 索引映射访问符
type Person1 = {
    name: string
    age: number
    job: {
        name: string
    }
}
let feJob: Person1['job'] = {
    name: 'fe'
}

