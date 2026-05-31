// 高阶函数

import { isFunction } from "@vue/shared"
import { FRAGEMENT, h, ref } from "."

export const defineAsyncComponent = (promiseLoaderOrOptions) => {
    return {
        setup(){
            // 组件 loading 情况
            let LoadingCom
            const loading = ref(false)

            // 组件加载失败
            let errorTimeout
            let ErrorCom
            const error = ref(false)



            const loaded = ref(false)

            let InnerComp
            if(isFunction(promiseLoaderOrOptions)){
                promiseLoaderOrOptions().then((comP) => {
                    loaded.value = true

                    InnerComp = comP
                })

            }else{
                const { loader, loadingComponent, delay, timeout, errorComponent, onError } = promiseLoaderOrOptions

                LoadingCom = loadingComponent
                ErrorCom = errorComponent

                // 区分有没有 delay 场景
                if(delay){
                    // delay 的含义是延迟 loading
                    const timer = setTimeout(() => {
                        loading.value = true
                    }, delay)
                }else{
                    loading.value = true
                }

                // 有没有超时选项
                if(timeout){
                    errorTimeout = setTimeout(() => {
                        error.value = true
                    }, timeout)
                }

                const load = () => {
                    return loader().catch((err) => {
                        if(onError){
                            return new Promise((r, j) => {
                                const retry = () => { r(load()) } 
                                const fail = () => { j(err) } 

                                onError(err, retry, fail, attemps++)
                            })
                        }else{
                            throw new Error('error')
                        }

                    }).then((comP) => {
                        loaded.value = true

                        // 没有错误了
                        error.value = false

                        InnerComp = comP
                    })
                    // .catch(() => {
                    //     error.value = true
                    // }).finally(() => {
                    //     loading.value = false
                    // })
                }

                let attemps = 0
                load().catch(() => {
                    error.value = true
                }).finally(() => {
                    loading.value = false
                })
            }
            

            return () => {
                // 此方法会被多次调用 (render 函数)

                console.log('defineAsyncComponent--defineAsyncComponent')

                if(error.value){ // 错误
                    return h(ErrorCom, {})
                } else if(loaded.value){ // 
                    return h(InnerComp, {})
                } else if(loading.value){
                    return h(LoadingCom, {})
                } else{
                    return h(FRAGEMENT, [])
                }
                // return loaded.value ? h(InnerComp, {}) : loading.value ? h(LoadingCom, {}) : h(FRAGEMENT, []) // 后面这个应该是一个 注释节点
            }
        }
    }
}


const withLoading = (promiseLoader) => {
    return defineAsyncComponent({
        loader: defineAsyncComponent,
        loadingComponent: {}
    })
}

// vue-router 写法
// {
//     component: withLoading(() => import('xxx'))
// }