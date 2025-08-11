import { isObject } from "@vue/shared"
import { mutableHandlers } from "./baseHandler";
import { activeEffect } from "./effect";
import { ReactiveFlags } from "./constance"

// 用于记录我们的 代理后的结果，可以复用 
const reactiveMap = new WeakMap();

export const createReactiveObject = (target) => {
    // 统一做出判断， 响应式对象 必须是对象才行
    if(!isObject(target)){
        return target
    }

    // 处理被代理的对象在此被代理的情况
    if(target[ReactiveFlags.IS_REACTIVE]){
        return target
    }

    const exitsProxy = reactiveMap.get(target)
    if(exitsProxy){
        return exitsProxy
    }

    let proxy = new Proxy(target, mutableHandlers)
    // 代理的对象被缓存，防止同一个对象被反复代理的问题
    reactiveMap.set(target, proxy)

    return proxy
}

export const reactive = (target) => {
    return createReactiveObject(target)     
}

export const toReactive = (value) => {
    return isObject(value) ? reactive(value) : value
}

export const isReactive = (value) => {
    return !!(value && value[ReactiveFlags.IS_REACTIVE])
}