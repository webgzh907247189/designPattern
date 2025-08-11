import { activeEffect, trackEffect, triggerEffects } from "./effect";
import { toReactive } from "./reactive";
import { createDep } from "./reactiveEffect";

export const ref = (value) => {
    return createRef(value)
}

export const createRef = (value) => {
    return new RefImpl(value)
}

export class RefImpl{
    // 增加 ref 标识
    public __v_isRef = true;

    // 用来保存 ref 的值
    public _value;

    // 收集对应的 effect (相当于 ref 记住了 effect)
    public dep

    constructor(public rawValue) {
        this._value = toReactive(this.rawValue)
    }

    get value() {
        trackRefValue(this)
        return this._value
    }

    set value(newValue) {
        if (newValue !== this.rawValue) {
            this.rawValue = newValue
            this._value = newValue
            triggerRefValue(this)
        }
    }
}

export const trackRefValue = (ref) => {
    // 有活跃的 effect 才进行 收集， 所以这里需要进行判断
    // 因为 ref 的取值 在 effect() 执行 才正常进行 依赖收集
    if(activeEffect){
        // ref.dep 有值 直接复用，不需要 再次创建 (否则会丢失上一次的已经收集 好的 依赖)
        trackEffect(activeEffect, (ref.dep = ref.dep || createDep(() => ref.dep = undefined, 'undefined')))
    }
}

export const triggerRefValue = (ref) => {
    let dep = ref.dep
    if(dep){
        triggerEffects(dep)
    }
}




// toRef
class ObjectRefImpl{
    // 增加 ref 标识
    public __v_isRef = true
    
    constructor(public _obj, public _key){}

    get value(){
        return this._obj[this._key]
    }

    set value(newValue){
        this._obj[this._key] = newValue
    }
}

export const toRef = (obj, key) => {
    return new ObjectRefImpl(obj, key)
}




// toRefs
export const toRefs = (obj) => {
    const res = {}
    for (const key in obj) {
        res[key] = new ObjectRefImpl(obj, key)
    }
    return res
}




// proxyRefs  这个用在 模板编译里面，使用 with 直接绑定 proxyVal
export const proxyRefs = (objectWithRef) => {
    debugger
    return new Proxy(objectWithRef, {
        get(target, key, receiver) {
            const r = Reflect.get(target, key, receiver)

            return r.__v_isRef ? r.value : r
        },
        set(target, key, value) {
            const oldVal = target[key]

            if (oldVal.__v_isRef) {
                oldVal.value = value
                return true
            } else {
                return Reflect.set(target, key, value,)
            }
        }
    })
}