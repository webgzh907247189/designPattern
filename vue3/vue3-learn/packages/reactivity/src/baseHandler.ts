import { isObject } from "@vue/shared"
import { track, trigger } from "./reactiveEffect"
import { reactive } from "./reactive"
import { ReactiveFlags } from "./constance"


export const mutableHandlers: ProxyHandler<any> = {
    get(target, key, receiver){
        if(key === ReactiveFlags.IS_REACTIVE){
            return true
        }

        // 收集这个对象上的属性， 和 活跃的 effect 关联在一起
        track(target, key)
        
        let res = Reflect.get(target, key, receiver)

        // 懒代理， 取值发现是 对象 才触发 代理
        if(isObject(res)){
            return reactive(res)
        }
        return res
    },
    set(target, key,value, receiver){

        const oldValue = target[key]
        let result = Reflect.set(target, key, value, receiver)

        // 值不一样 触发更新
        if(oldValue != value){
            trigger(target, key, value, oldValue)
        }
       
        return result
    }
}



