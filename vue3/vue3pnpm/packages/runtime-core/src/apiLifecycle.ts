import { currentInstancce, setCurrentInstance } from './components'

export const enum LicycleHooks {
    BEFORE_MOUNT = 'bm',
    MOUNTED = 'm',
    BEFORE_UPDATE = 'bu',
    UPDATED = 'u',
    BEFORE_UNMOUNT = 'bum',
    UNMOUNTED = 'um',
}

const createHook = (type) => {
    return (hookCb, i = currentInstancce) => {
        if(currentInstancce){
            const hooks = currentInstancce[type] || (currentInstancce[type] = [])
            //
            hooks.push(() => {
                // 这里设置 instance 的目的是为了 能取到 instance，因为自定义 hook useMyHook 里面调用了 onMounted
                // 执行 生命周期函数的时候， setup函数执行完成了，取不到执行上下文 instance.(因为 setup 函数执行完成，currentInstancce 设置为 null 了) 这里通过高阶函数拿到 currentInstancce (参考 test-component5.html)
                setCurrentInstance(i)

                hookCb()

                // 这里设置 instance 的目的是为了 能取到 instance，因为自定义 hook useMyHook 里面调用了 onMounted
                // 执行 生命周期函数的时候， setup函数执行完成了，取不到执行上下文 instance.(因为 setup 函数执行完成，currentInstancce 设置为 null 了)  这里通过高阶函数拿到 currentInstancce (参考 test-component5.html)
                setCurrentInstance(null)  
            })
            // 
        }
    }
}

export const onBeforeMount = createHook(LicycleHooks.BEFORE_MOUNT)
export const onMounted = createHook(LicycleHooks.MOUNTED)

export const onBeforeUpdate = createHook(LicycleHooks.BEFORE_UPDATE)
export const onUpdated = createHook(LicycleHooks.UPDATED)

export const onBeforeUnmount = createHook(LicycleHooks.BEFORE_UNMOUNT)
export const onUnmounted = createHook(LicycleHooks.UNMOUNTED)