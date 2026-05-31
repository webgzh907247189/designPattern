
import { getCurrentInstance } from './components'

// 只能在组件中使用 provide 和 inject
export const provide = (key, value) => {
    const instance = getCurrentInstance()

    if(!instance) return

    let parentProviders = instance.parent && instance.parent.providers

    // if(parentProviders){

    // 改成这样写的目的: 防止有 同一个组件调用多次 provider 函数 (003.providers)
    if(parentProviders === instance.providers){
        instance.providers = Object.create(parentProviders)
    }

    // instance.providers 默认是一个空对象，createComponentInstance() 创建出来的
    // 给自己上面新增属性
    instance.providers[key] = value
}

export const inject = (key, defaultValue) => {
    const instance = getCurrentInstance()

    if(!instance) return

    const providers = instance.parent.providers

    if(providers && (key in providers)){
        return providers[key]
    }else {
        return defaultValue
    }
}