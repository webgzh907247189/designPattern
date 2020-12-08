// 描述 应用的状态

// 刚刚初始化
export const NOT_LOADED = 'NOT_LOADED'

// 加载资源
export const LOADING_SOURCE_CODE = 'LOADING_SOURCE_CODE'

// 还没有 调用 bootstrap
export const NOT_BOOTSTRAP = 'NOT_BOOTSTRAP'

// 启动中
export const BOOTSTRAPING = 'BOOTSTRAPING'

// 没有挂载
export const NOT_MOUNTED = 'NOT_MOUNTED'


// 挂载中
export const MOUNTING = 'MOUNTING'

// 挂载完成
export const MOUNTED = 'MOUNTED'

// 跟新中
export const UPPDATING = 'UPPDATING'

// 卸载中  接触挂载
export const UNMOUNTING = 'UNMOUNTING'

// 完全卸载中
export const UNLOADING = 'UNLOADING'

// 文件加载失败
export const LOAD_ERR = 'LOAD_ERR'

// 代码异常
export const SKIP_BECAUSE_BROKEN = 'SKIP_BECAUSE_BROKEN'


// 当前应用是否被激活  ->  挂载完成 算激活完成
export function isActive(app){
    return app.status === MOUNTED
}

// 当前应用是否要被激活
// 如果返回 true， 开启初始化 一系列操作
export function shouldBeActive(app){
    // 根据 路径是否匹配，确定是否要激活
    return app.activeWhen(window.location)
}