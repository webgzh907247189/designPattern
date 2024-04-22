import { isFunction, isObject } from "@vue/shared"
import { ReactiveEffect, isReactive } from "."

// vue3 的 watch 自带清理函数

// 考虑对象中循环引用的问题
const traversal = (value, set = new Set()) => {
    if(!isObject(value)) return value

    // 处理循环引用问题
    if(set.has(value)){
        return value
    }

    set.add(value)    
    for (const key in value) {
        traversal(value[key], set)
    }

    return value
}


// source 用户传入的数据
// 使用 watch 尽量 使用 传入函数，避免 递归
// watch 第一个参数需要是响应式的数据     所以需要 判定 是不是响应式 数据
const doWatch = (source, cb, { immediate } = {} as any) => {
    let getter
    if(isReactive(source)){
        // 本质上深度监听
        // 对用户传入的数据 进行 递归循环
        // 只要循环就会访问对象上的每一个属性, 访问属性的时候会收集 effect
        getter = () => traversal(source)

        // 这样子写 不会触发依赖收集，只是访问了当前这个对象
        // getter = () => source

    }else if(isFunction(source)){
        getter = source
    }

    let cleanup
    const onCleanup = (fn) => {
        cleanup = fn // 保存用户的函数
    }
    let oldValue

    const job = () => {
        // 传入 cb 的情况下 是 watch
        // 不传入 代表 watchEffect

        // watch 是 一个 effect + 自定义的 scheduler
        // watchEffect 是一个 effect
        if(cb){
            if(cleanup){
                cleanup() // 下一次执行的时候触发上一次的 watch 的清理
            }
            const newValue = _effect.run()
            // 第一次 cb 不执行，onCleanup 就不会执行，cleanup 就没有赋值成功
            cb(newValue, oldValue, onCleanup)
    
            oldValue = newValue
        }else{
            // else 的情况是 watchEffect 的 case
            // 调用 run 是执行清理 之后  在触发收集 (没有直接调用 getter 的原因)
            _effect.run()
        }
    }
    const _effect = new ReactiveEffect(getter, job) // 监控自己构造的函数，变化之后重新执行 job


    if(immediate){
        return job()
    }

    oldValue =  _effect.run()
}



export const watch = (source, cb, options) => {
    doWatch(source, cb, options)
}

// 1. 初始化先执行一次 拿到 oldValue
// 2. 此时 activeEffect = watchEffect
// 3. 触发了_effect.run()，取值的过程中 name 属性 关联了 Set， Set 里面 activeEffect (watch effect)
// 4. 后面 name 改了，触发了 watch effect 的 scheduler()
// 5. 执行了 job

export const watchEffect = (source, options) => {
    doWatch(source ,null, options)
}

// watch 本身就是 一个 effect + 自定义的 scheduler
// watchEffect 是 effect 
// 有 watchEffect，有时候不需要明确写 依赖项

// vue3 的 watch 自带清理函数


// 闭包： 定义的作用域和执行作用域不是同一个