import { LOADING_SOURCE_CODE, NOT_BOOTSTRAP } from '../applications/app.helpers'

export const flatFnArray = (fns) =>{
    fns = Array.isArray(fns) ? fns : [fns]
    return function(props){
        return fns.reduce((result, itemFn) => {
            return result.then(() => itemFn(props))
        }, Promise.resolve())
    }
}

// 加载完成
export async function toLoadPromise(app){
    if (app.loadPromise) {
        return app.loadPromise
    }

    // 目的 ： 为了只加载一次
    // 第二次加载，直接返回 app.loadPromise， 加载完成，直接删除 app.loadPromise
    // 第一次正在加载，还未删除 app.loadPromise， 直接返回 当前已经加载的， 保证 loadApp 只是加载一次
    return app.loadPromise = Promise.resolve().then(async () => {
        app.status = LOADING_SOURCE_CODE;

        // 加载完成
        let { bootstrap,mount,unmount } = await app.loadApp(app.customProps)
    
        app.status = NOT_BOOTSTRAP;
    
        // 因为 bootstrap 可能是一个数组，需要 compose 一下
        app.bootstrap = flatFnArray(bootstrap);
        app.mount = flatFnArray(mount);
        app.unmount = flatFnArray(unmount);
    
        delete app.loadPromise
        return app;
    })
}