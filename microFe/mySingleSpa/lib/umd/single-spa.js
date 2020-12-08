(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
    typeof define === 'function' && define.amd ? define(['exports'], factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global.singleSpa = {}));
}(this, (function (exports) { 'use strict';

    // 描述 应用的状态

    // 刚刚初始化
    const NOT_LOADED = 'NOT_LOADED';

    // 加载资源
    const LOADING_SOURCE_CODE = 'LOADING_SOURCE_CODE';

    // 还没有 调用 bootstrap
    const NOT_BOOTSTRAP = 'NOT_BOOTSTRAP';

    // 启动中
    const BOOTSTRAPING$1 = 'BOOTSTRAPING';

    // 没有挂载
    const NOT_MOUNTED = 'NOT_MOUNTED';


    // 挂载中
    const MOUNTING = 'MOUNTING';

    // 挂载完成
    const MOUNTED = 'MOUNTED';

    // 卸载中  接触挂载
    const UNMOUNTING = 'UNMOUNTING';

    // 代码异常
    const SKIP_BECAUSE_BROKEN = 'SKIP_BECAUSE_BROKEN';

    // 当前应用是否要被激活
    // 如果返回 true， 开启初始化 一系列操作
    function shouldBeActive(app){
        // 根据 路径是否匹配，确定是否要激活
        return app.activeWhen(window.location)
    }

    let started = false;

    // 挂载应用
    function start(){
        started = true;
        reroute(); // 除了加载应用还需要去挂载应用
    }

    const flatFnArray = (fns) =>{
        fns = Array.isArray(fns) ? fns : [fns];
        return function(props){
            return fns.reduce((result, itemFn) => {
                return result.then(() => itemFn(props))
            }, Promise.resolve())
        }
    };

    // 加载完成
    async function toLoadPromise(app){
        if (app.loadPromise) {
            return app.loadPromise
        }
        
        app.status = LOADING_SOURCE_CODE;

        // 加载完成
        let { bootstrap,mount,unmount } = await app.loadApp(app.customProps);

        app.status = NOT_BOOTSTRAP;

        // 因为 bootstrap 可能是一个数组，需要 compose 一下
        app.bootstrap = flatFnArray(bootstrap);
        app.mount = flatFnArray(mount);
        app.unmount = flatFnArray(unmount);

        return app;
    }

    // 卸载 app 操作
    async function toUnmountPromise(app){
        // 如果当前 应用没有挂载，不需要做任何事情
        if (app.status !== MOUNTED) {
            return app
        }

        app.status = UNMOUNTING;
        await app.unmount(app.customProps);
        app.status = NOT_MOUNTED;
        return app;
    }

    const toMountPromise = async (app) => {
        if (app.status !== NOT_MOUNTED) {
            return app;
        }

        app.status = MOUNTING;
        await app.mount(app.customProps);
        app.status = MOUNTED;
        return app
    };

    const toBootstrapPromise = async (app) => {
        if (app.status !== NOT_BOOTSTRAP) {
            return app;
        }

        app.status = BOOTSTRAPING$1;
        await app.bootstrap(app.customProps);
        app.status = NOT_MOUNTED;
        return app
    };

    const reroute = () => {
        // 需要获取加载应用
        // 需要获取要被挂载的应用
        // 哪些应用需要被卸载
        const { appsToUnmount,appsToLoad,appsToMount } = getAppChanges();


        if (started) {
            console.log('第二次run  调用 start 方法  装载app');
            return performAppChanges()
        } else {
            console.log('第一次run  调用 registerApplication 方法');
            // 注册应用， 需要预先加载
            return loadApps()
        }

        async function performAppChanges(){
            // 先卸载不需要的应用
           let unmountPromises = appsToUnmount.map(toUnmountPromise);

            // 将需要加载的应用拿到 卸载以前的应用-> 加载 -> 启动 -> 挂载
            appsToLoad.map(async(app) => {
                app = await toLoadPromise(app);
                app = await toBootstrapPromise(app);
                return toMountPromise(app)
            });

           // 部分情况 已经 加载 完成 ， 直接挂载
           // 把要挂载的， 直接挂载
            appsToMount.map(async(app) => {
                app = await toBootstrapPromise(app);
                return toMountPromise(app) 
           });
        }

        async function loadApps(){
            // 预加载
            let apps = await Promise.all(appsToLoad.map(toLoadPromise));
            console.log(apps);
        }
    };

    const apps = [];

    // 维护状态  状态机
    function registerApplication(appName, loadApp, activeWhen, customProps){
        apps.push({
            name: appName,
            loadApp, 
            activeWhen,  // 是否要被激活 根据路由匹配
            customProps,

            // 注册应用，默认没有挂载
            status: NOT_LOADED,
        });

        reroute();
    }

    // 不同的状态  状态机
    const getAppChanges = () => {
        const appsToUnmount = []; // 需要被卸载的 app
        const appsToLoad = []; // 需要加载的 app
        const appsToMount = []; // 需要挂载的 app

        // 切换 路由的时候  一个需要被卸载，一个需要被加载
        apps.forEach((app) => {
            // 应用状态不是报错的   // 根据 路径是否匹配，确定是否要激活
            const appShouldActive = app.status !== SKIP_BECAUSE_BROKEN && shouldBeActive(app);

            switch (app.status) {
                case NOT_LOADED: //刚刚初始化
                case LOADING_SOURCE_CODE: // 加载资源
                    if (appShouldActive) {
                        appsToLoad.push(app); // 推入 appsToLoad(需要加载的 app) 数组
                    }
                    break;

                case NOT_BOOTSTRAP:
                case BOOTSTRAPING:
                case NOT_MOUNTED:
                    if (appShouldActive) {
                        appsToMount.push(app);  // 需要挂载的 app
                    }
                    break;
                case MOUNTED: // 需要被 卸载
                    if (!appShouldActive) {
                        appsToUnmount.push(app); // 需要被卸载的 app
                    }
            }
        });
        return {
            appsToUnmount,
            appsToLoad,
            appsToMount
        }
    };

    exports.registerApplication = registerApplication;
    exports.start = start;

    Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=single-spa.js.map
