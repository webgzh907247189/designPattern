import 'reflect-metadata'

let target = {}

// 设置了值 没有干扰 原对象
Reflect.defineMetadata('name', 'val', target)

// 类似于 target.testobj = { name: '子属性' }
Reflect.defineMetadata('name', '子属性', target, 'testobj')

// 对 原对象 没有干扰
// getMetadata  getOwnMetadata 区别是 需不需要找 原型链 上面的属性
// getMetadata 优先找自己， 自己没有 找 原型链
console.log(Reflect.getOwnMetadata('name', target), target) // val {}
console.log(Reflect.getOwnMetadata('name' ,target,  'testobj'), target) //子属性 {}






// 给 类 本身 增加 元数据
@Reflect.metadata('key', 'val')
// @classMetadata('key', 'val')
class Person {

    // 给 类 的 原型 增加 元数据
    @Reflect.metadata('ageKey', '10')
    // @methodMetadata('ageKey', '10')
    method(): string{
        return '1'
    }
}

console.log(Reflect.getMetadata('key', Person)) // val

// 类 的 method 属性 上面的 元数据
console.log(Reflect.getMetadata('ageKey', Person.prototype, 'method')) // 10



// function classMetadata(key, value){
//     return (target) => {
//         Reflect.defineMetadata(key, value, target)
//     }
// }

// function methodMetadata(key, value){
//     return (target, propertyName) => {
//         Reflect.defineMetadata(key, value, target, propertyName)
//     }
// }