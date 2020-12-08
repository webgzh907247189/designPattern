
import { NOT_LOADED, SKIP_BECAUSE_BROKEN, shouldBeActive, LOADING_SOURCE_CODE, NOT_BOOTSTRAP, NOT_MOUNTED, MOUNTED } from './app.helpers';
import { reroute } from '../navigations/reroute';
const apps = []

// 维护状态  状态机
export function registerApplication(appName, loadApp, activeWhen, customProps){
    apps.push({
        name: appName,
        loadApp, 
        activeWhen,  // 是否要被激活 根据路由匹配
        customProps,

        // 注册应用，默认没有挂载
        status: NOT_LOADED,
    })

    reroute()
}

// 不同的状态  状态机
export const getAppChanges = () => {
    const appsToUnmount = []; // 需要被卸载的 app
    const appsToLoad = []; // 需要加载的 app
    const appsToMount = [] // 需要挂载的 app

    // 切换 路由的时候  一个需要被卸载，一个需要被加载
    apps.forEach((app) => {
        // 应用状态不是报错的   // 根据 路径是否匹配，确定是否要激活
        const appShouldActive = app.status !== SKIP_BECAUSE_BROKEN && shouldBeActive(app)

        switch (app.status) {
            case NOT_LOADED: //刚刚初始化
            case LOADING_SOURCE_CODE: // 加载资源
                if (appShouldActive) {
                    appsToLoad.push(app) // 推入 appsToLoad(需要加载的 app) 数组
                }
                break;

            case NOT_BOOTSTRAP:
            case BOOTSTRAPING:
            case NOT_MOUNTED:
                if (appShouldActive) {
                    appsToMount.push(app)  // 需要挂载的 app
                }
                break;
            case MOUNTED: // 需要被 卸载
                if (!appShouldActive) {
                    appsToUnmount.push(app) // 需要被卸载的 app
                }
            default:
                break;
        }
    })
    return {
        appsToUnmount,
        appsToLoad,
        appsToMount
    }
}