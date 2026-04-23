import { isObject } from '@vue/shared';
import { baseHandler, ReactiveFlags } from './baseHandler';

// reactive  
// shallowReactive  创建浅层响应式对象，只有根级属性是响应式的 (嵌套对象保持非响应式状态 - 对嵌套属性的更改不会触发更新)
// readonly 创建只读响应式对象，防止任何修改操作 (深度转换整个对象结构为只读（包括嵌套对象）)
// shallowReadonly 创建浅层只读对象，只有根级属性受到修改保护 (根级属性不能被修改，但嵌套对象仍然可变)

// toRaw 功能：获取响应式代理对象背后的原始对象
// markRaw 标记一个对象，使其永远不会被转换为响应式对象

// 0. reactive 只能做 对象的 代理
// 1. 解决了 同一个对象被反复 代理的问题 (优先查找已经被代理的缓存)
// 2. 解决了 属性访问器的问题， 使用 Reflect
// 3. 解决了 对象被代理， 已经被代理的对象又被代理的问题 (通过在 get 加一个 属性key)
// 4. 避免出现 effect 的 fn 里面又继续修改 state， 造成 effect 重复执行问题
// 5. 针对 Set 先删除元素，在添加进来同一份元素，造成死循环问题
// 6. 每次执行 effect 函数，重新进行依赖收集， 删除之前的依赖收集
// 7. 深度代理，只有在取值 才会出发 深度代理(触发了 get)，否则不会像 vue2 直接进行 深度 递归
// 8. proxy 只支持对象，所以基本数据类型 使用 Object.defineProperty (编译后) 来处理
// 9. 在使用数据的时候，都是使用 toRefs ，在模板里面不需要添加 .value 直接可以拿到数据
// 10. 针对 内置的symbol 属性的key 或者 访问的是__prop__ 属性，直接返回，不进行依赖收集
// 11. 这里调用 includes 内部会把代理对象变成原始对象, 在进行处理 (arr.includes)

// key 只能是 对象
const reactiveMap = new WeakMap()


export const isReactive = (val) => {
    // 通过 [ReactiveFlags.IS_REACTIVE] 判定 是不是响应式 数据
    return val && val[ReactiveFlags.IS_REACTIVE]
}

// reactive 只能做 对象的 代理
export const reactive = (target) => {
    if(!isObject(target)){
        return
    }

    // 解决 代理之后，用 代理的对象在进行 proxy
    // 此时 target 就是 第一次代理之后返回的proxy 对象， 触发了 Get 操作
    if(target[ReactiveFlags.IS_REACTIVE]){
        return target
    }

    // 解决 同一个对象被反复proxy
    const exisitingProxy = reactiveMap.get(target)
    if(exisitingProxy){
        return exisitingProxy
    }

    // 取值 触发了 get， 赋值 触发了 set
    const proxy = new Proxy(target, baseHandler)
    reactiveMap.set(target, proxy)
    return proxy
}



// 使用  Reflect.get(target, key , receiver)， 使得  this.name 的 this 指向 receiver (代理之后的对象) 
// 假设直接使用 target[key], 下面的 案列 执行 this.name 的 this 就是 obj 而不是 receiver，无法触发 name 的 get
const obj = {
    name: '123',
    get test(){
        // 使用 Reflect 修正此处的 this
        return this.name
    }
}

const proxy = new Proxy(obj, {
    get(target, key, receiver) {
        // 使用 Reflect.get(target, key , receiver)， 使得  this.name 的 this 指向 receiver (代理之后的对象) 
        // return Reflect.get(target, key, receiver)
        return target[key]
    }
})

console.log(proxy.test)