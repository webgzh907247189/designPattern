import { isObject } from "@vue/shared"
import { ReactiveEffect } from "./effect"
import { isReactive } from "./reactive"

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
        if(cb){
            const newVal = effect.run()

            if(clean){
                clean() // 下一次调用之前 清理上一次的副作用
            }

            cb(oldVal, newVal, onCleanUp)
            oldVal = newVal
        }else{
            effect.run()
        }
    }

    let getter
    if(isReactive(source)){
        getter = () => {
            reactiveGetter(source)
        }
    }
    const effect = new ReactiveEffect(getter, job)

    if(cb){
        oldVal = effect.run()
    }else{
        effect.run()
    }

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

