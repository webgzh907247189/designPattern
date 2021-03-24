import { observe } from './index'
import { arrayMethods, observableArray, dependArray } from './array'
import Dep from './dep';

export function defineReactive(data,key,value){
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
                    childOb.dep.depend() // 数组收集了 watcher
                    // 收集数组每一项的 依赖
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