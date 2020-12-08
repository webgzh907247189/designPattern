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
    
    app.status = LOADING_SOURCE_CODE;

    // 加载完成
    let { bootstrap,mount,unmount } = await app.loadApp(app.customProps)

    app.status = NOT_BOOTSTRAP;

    // 因为 bootstrap 可能是一个数组，需要 compose 一下
    app.bootstrap = flatFnArray(bootstrap);
    app.mount = flatFnArray(mount);
    app.unmount = flatFnArray(unmount);

    return app;
}