/**
 * declare 在编译的时候检查，编译结果看不到的
 * 
 * declare 只是声明，不需要实现，给编译器看的
 * 
 * 查找 .d.ts 文件规律
 * 1. 先找myLib.d.ts
 * 2. 没有就查找 index.d.ts
 * 3. 还没有找打就查找 lib/index/d/ts
 * 4. 在没有 就认为没有声明文件
 * 
 * 
 * 如果是手动写的声明文件，那么需要满足以下条件之一，才能被正确的识别
 * 给 package.json 中的 types 或 typings 字段指定一个类型声明文件地址
 * 在项目根目录下，编写一个 index.d.ts 文件
 * 针对入口文件 (package.json 中的 main 字段指定的入口文件) 编写一个同名不同后缀的 .d.ts 文件
 */

// 普通的类型声明
declare let age: number
console.log(age)



// 外部枚举
declare enum Sessons{
    Spring,
    Summer,
}
console.log(Sessons.Spring)



// declare 只是声明，不需要实现，给编译器看的
// declare 在编译的时候检查，编译结果看不到的
// 命名空间
// 一个命名空间 有很多子属性，可以用 namseSpace
declare namespace ${
    function ajax(): void
    let name: string
}
$.name
$.ajax()




// jq 的声明文件
// 声明两次的原因 ->   Jquery即是一个函数又是一个对象
declare function Jquery(params: string): HTMLElement
declare namespace Jquery{
    function ajax(): void
}

// import * as Jquery from 'Jquery'
// 导入的时候 直接 Jquery.ajax('xx')
export = Jquery


// import * as Jquery from 'Jquery'
// 导入的时候 直接 Jquery.default.ajax('xx')
// export default Jquery

