import { reactive, triggerEffect, trackEffect } from "."
import { isArray, isObject } from "@vue/shared"

export const ref = (value) => {
    return new RefImpl(value)
}

// proxy 只支持对象，所以基本数据类型 使用 Object.defineProperty 来处理
class RefImpl {
    public _value
    public _v_isRef = true
    public dep = new Set
    constructor(public rowValue){
        this._value = toReactive(rowValue)
    }

    // 类中的属性访问器， 编译出来是 Object.defineProperty
    get value(){
        trackEffect(this.dep)
        return this._value
    }
    set value(newValue){
        // 触发更新
        if(this.rowValue !== newValue){
            this._value = toReactive(newValue)
            this.rowValue = newValue
            triggerEffect(this.dep)
        }
    }
}



function toReactive(value){
    return isObject(value) ? reactive(value) : value
}





// 为了实现 解构语法，还能继续使用
// toRefs 只能处理对象
export function toRefs(value){
    const result = isArray(value) ? new Array(value.length) : {}

    for(let key in value){
        result[key] = toRef(value, key)
    }
    return result
}

export function toRef(object, key){
    return new ObjectRefImpl(object, key)
}

// 属性访问器 编译出来变成 Object.defineProperty
// 只是把 .value 属性 代理到原来的 对象上面
class ObjectRefImpl{
    constructor(public object, public key){}
    get value(){
        return this.object[this.key]
    }
    set value(newValue){
        this.object[this.key] = newValue
    }
}

export const proxyRefs = (object) => {
    return new Proxy(object, {
        get(target, key, recevier){
            const r = Reflect.get(target, key, recevier)

            return r._v_isRef ? r.value : r;
        },
        set(target, key, value, recevier){
            let oldValue = target[key]
            if(oldValue._v_isRef){
                oldValue.value = value
                return true
            }else{
                return Reflect.set(target, key, value, recevier)
            }
        }
    })
}