import { isFunction } from "@vue/shared"
import { ReactiveEffect } from "./effect"
import { trackRefValue, triggerRefValue } from "./ref"

// 1. 计算属性本身就是一个 effect， 默认是脏的
// 2. 当访问 computed.value 触发了 依赖收集，computed() 里面的 属性 与 computed effect 进行了关联 

// **取值**: (优先执行 渲染 effect -> renderEffect.run() -> 触发 computed.get Value() -> computed.fn(`() => getter(this._value)`) ->
// -> 触发用户自定义 computed cb -> 触发 响应式数据的 依赖收集) 此时 activeEffect 为 computed effect。

// 帮助理解 --> 谁 run activeEffect 是谁， computed get value() 的  this.effect.run() 执行完毕，此时 activeEffect 是 render Effect
// computed effect 里面的 dep 存放的是 render effect (render effect 执行 触发 render effect 用户自定义 cb 执行 ->
// 触发 computed.value 属性 -> computed get value(), 此时 activeEffect 是 render Effect)

// **改值**: 触发了  computed effect 的 scheduler -> computed 的 triggerRefValue -> 触发 render effect.run()

class ComputedImpl{
    // 记录上一次的值
    public _value
    public dep 

    public effect
    constructor(public getter, public setter){
        debugger
        // 创建 effect 来计算当前
        this.effect = new ReactiveEffect(() => getter(this._value), () => {
            // 计算属性发生变更，触发 渲染 effect 重新执行
            triggerRefValue(this)
        })
    }

    get value(){
        if(this.effect.dirty){
            // 默认是脏的， 取值完成之后就是 不脏的， 后续直接 return 值
            this._value = this.effect.run()

            // 如果当前 effect 访问了计算属性， 计算属性需要收集这个 effect
            trackRefValue(this)
        }
        return this._value
    }
    set value(newValue){
        this.setter(newValue)
    }
}

export const computed = (getterOrOptions) => {
    let onlyFn = isFunction(getterOrOptions)

    let getter
    let setter
    if(onlyFn){
        getter = getterOrOptions
        setter = () => {
            console.warn('computed is readonly')
        }
    }else{
        getter = getterOrOptions.get
        setter = getterOrOptions.set
    }

    return new ComputedImpl(getter, setter)
}