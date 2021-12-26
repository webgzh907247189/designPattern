import { getAppChanges } from '../applications/app'
import { started } from '../start'
import { toLoadPromise } from '../lifeCycle/load'
import { toUnmountPromise } from '../lifeCycle/unmount'

import { toMountPromise } from '../lifeCycle/mount'
import { toBootstrapPromise } from '../lifeCycle/bootstrap'

export const reroute = () => {
    // 需要获取加载应用
    // 需要获取要被挂载的应用
    // 哪些应用需要被卸载
    const { appsToUnmount,appsToLoad,appsToMount } = getAppChanges();


    if (started) {
        // console.log('第二次run  调用 start 方法  装载app')
        return performAppChanges()
    } else {
        // console.log('第一次run  调用 registerApplication 方法')
        // 注册应用， 需要预先加载
        return loadApps()
    }

    async function performAppChanges(){
        // 先卸载不需要的应用
       let unmountPromises = appsToUnmount.map(toUnmountPromise)

        // 将需要加载的应用拿到 卸载以前的应用-> 加载 -> 启动 -> 挂载
        appsToLoad.map(async(app) => {
            app = await toLoadPromise(app)
            app = await toBootstrapPromise(app)
            return toMountPromise(app)
        })

       // 部分情况 已经 加载 完成 ， 直接挂载
       // 把要挂载的， 直接挂载
        appsToMount.map(async(app) => {
            app = await toBootstrapPromise(app)
            return toMountPromise(app) 
       })
    }

    async function loadApps(){
        // 预加载
        let apps = await Promise.all(appsToLoad.map(toLoadPromise))
        console.log(apps)
    }
}