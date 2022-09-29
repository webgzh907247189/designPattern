//dts 中，如果没有 import、export 语法，那所有的类型声明都是全局的，否则是模块内的。


// 一种是子类型可以赋值给父类型，叫做协变（covariant），
// 一种是父类型可以赋值给子类型，叫做逆变（contravariant）
// 参数可以给父类型，返回值可以给子类型

type fn11 = (o: {name: string} & {age: number}) => void
type fn22 = (o: {name: string}) => void

let fn1: fn11 = (o) => undefined
let fn2: fn22 = (o) => undefined

fn1 = fn2 // 参数逆变， 父类型可以给子类型
// fn2 = fn1



export {}

interface Person {
    name: string;
    age: number;
} 

interface Guang {
    name: string;
    age: number;
    hobbies: string[]
}

let printHobbies: (guang: Guang) => void;

printHobbies = (guang) => {
    console.log(guang.hobbies);
}

let printName: (person: Person) => void;

printName = (person) => {
    console.log(person.name);
}

printHobbies = printName
// printName = printHobbies

// printName 的参数 Person 不是 printHobbies 的参数 Guang 的父类型么，为啥能赋值给子类型？
// 这个函数调用的时候是按照 Guang 来约束的类型，但实际上函数只用到了父类型 Person 的属性和方法，当然不会有问题，依然是类型安全的。
// 这就是逆变，函数的参数有逆变的性质（而返回值是协变的，也就是子类型可以赋值给父类型）。


type GetReturnType<Func extends Function> =  Func extends (...args: any[]) => infer ReturnType ? ReturnType : never;
// 这就是因为函数参数是逆变的，如果是 unknown[]，那当 Func 是这个函数的子类型，它的参数得是 unknown 的父类型，
// 这显然是不可能的，所以这里只能用 any。


// 判断联合类型父子关系的时候， 'a' | 'b' 和 'a' | 'b' | 'c' 哪个更具体？
// 'a' | 'b' 更具体，所以 'a' | 'b' 是 'a' | 'b' | 'c' 的子类型。





// ts 代码会报错么  ->  是参数的位置会，返回值的位置不会
type Func = (a: string) => void;
const func: Func = (a: 'hello') => undefined 

// function func1 (a: string): void{} 
// func1('11') // 正常
// func1(true) // 爆粗

// 参数的位置是逆变的，也就是被赋值的函数参数要是赋值的函数参数的子类型，而 string 不是 'hello' 的子类型，所以报错了。
// 返回值的位置是协变的，也就是赋值的函数的返回值是被赋值的函数的返回值的子类型，这里 undefined 是 void 的子类型，所以不报错。






// 当条件类型左边是 never 的时候，就会直接返回 never
type Test<T> = T extends true ? 1 : 2;
type res = Test<never>; // never

type Test1<T> = T extends true ? 1 : 2;
type res1 = Test1<any>; // 1 ｜ 2        