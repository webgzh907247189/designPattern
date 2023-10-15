import { observe } from './index'
import { arrayMethods, observableArray, dependArray } from './array'
import Dep from './dep';

/**
 * Vue data 中随意更改一个属性，视图都会被更新吗？
 * https://juejin.cn/post/7040733315791323143
 * 
 * template 会被编译成render函数，函数执行的时候，访问什么变量，就出触发相应变量的get，然后才会添加watcher。
 * 触发了 get，然后在 get里面 (每一个data 属性都有一个 dep 实列), 触发了dep.depend() ---> watcher.addDep ---> dep.addSub(dep 把 wacther 加进来)。 dep里面有 wacther， wacter 里面有dep
 */

export function defineReactive(data,key,value){
    // debugger
    // 基本数据类型 没有 __ob__, 只有dep
    let childOb = observe(value)
    // console.log(childOb,'??')

    // 每个属性都给加一个 dep 实列
    // 页面中用到的 相同的属性 用的是相同的 dep，因为 属性key 一样
    let dep = new Dep()
    
    Object.defineProperty(data, key, {
        get(){
            if(Dep.target){
                // console.log(dep, 'dep')
                // debugger
                // dep.addSub(Dep.target)

                // 实现多对多，过滤重复 watcher
                dep.depend();

                // 数组的 依赖收集
                if(childOb){
                    childOb.dep.depend() // (数组 || 对象)收集了 watcher
                    // 收集(数组 || 对象) 每一项的 依赖
                    dependArray(value)
                }
            }
            return value;
        },
        set(newValue){
            if(newValue === value) return
            observe(newValue)
            value = newValue

            dep.notify()
        }
    })
}

export default class Observe {
    constructor(data){
        // 此dep 专门为了数组设置，服务于数组，对象也有
        this.dep = new Dep();
        // console.log(this, '????000')

        // 每个对象都有一个 __ob__ 属性，返回的是当前的 Observe 实列
        // 注意 this
        // 这样设置可以避免 __ob__ 再一次在 Object.keys() -> 遍历出来 不可枚举
        Object.defineProperty(data, '__ob__', {
            get:()=>{
                // console.log(this,'???',data)
                return this
            }
        })

        if(Array.isArray(data)){
            // debugger
            // data.__proto__ = arrayMethods;
            Object.setPrototypeOf(data,arrayMethods)
            observableArray(data)
        }else{
            this.walk(data)
        }
    }

    walk(data){
        let keys = Object.keys(data)
        for(let i=0; i< keys.length; i++){

            // 对每一个对象的 key 都重新定义，每个属性都有一个 dep
            let key = keys[i]
            let value = data[key]

            defineReactive(data,key,value)
        }
    }
}