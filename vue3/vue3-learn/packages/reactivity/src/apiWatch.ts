import { isFunction, isObject } from "@vue/shared"
import { ReactiveEffect } from "./effect"
import { isReactive } from "./reactive"
import { isRef } from "./ref"

export const watch = (source, cb, options) => {
    return doWatch(source, cb, options)
}

export const watchEffect = (source, options) => {
    return doWatch(source, null, options)
}

// watchEffect 也是基于 doWatch 实现
const doWatch = (source, cb, { immediate, deep, flush }) => {

    // source 必须是响应式数据， 否则没有意义
    const reactiveGetter = (source) => traverse(source, deep === false ? 1 : undefined )
   
    let clean
    const onCleanUp = (fn) => {
        clean = () => {
            fn()
            clean = undefined
        }
    }

    let oldVal
    const job = () => {
        // debugger
        if(cb){
            const newVal = effect.run()

            if(clean){
                clean() // 下一次调用之前 清理上一次的副作用
            }

            // debugger
            cb(newVal, oldVal, onCleanUp)
            oldVal = newVal
        }else{
            effect.run()
        }
    }

    let getter
    if(isReactive(source)){
        getter = () => {
            return reactiveGetter(source)
        }
    }else if(isRef(source)){
        getter = () => source.value
    }else if(isFunction(source)){
        getter = source
    }
    const effect = new ReactiveEffect(getter, job)
// debugger
    if(cb){
        if(immediate){
            job()
        }else{
            oldVal = effect.run()
            // debugger
        }
    }else{
        effect.run()
    }

    // debugger
    const unwatch = () => { effect.stop() }
    return unwatch
}

const traverse = (source, depth, currentDepth = 0, seen = new Set()) => {
    if(!isObject(source)){
        return
    }
    if(depth){
        if(currentDepth >= depth){
            return source
        }
        currentDepth++
    }
    if(seen.has(source)){
        return source
    }

    // 遍历 触发 每个属性的 get
    for (const key in source) {
        traverse(source[key], depth, currentDepth, seen)
    }
    return source
}

