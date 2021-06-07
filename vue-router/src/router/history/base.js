
/**
 * history.length 最大为50 有大小限制 -> react-router 视频第一节  lenght 一直是50
 */

function runQueue(queue, iterator, cb) {
    function next(index) {
        if(index >= queue.length){
            return cb();
        } else {
            let hook = queue[index]
            iterator(hook, () => {
                next(index + 1)
            })
        }
    }
    next(0)
}

export default class History{
    constructor(router, currentPath){
        this.router = router

        // 将 current 变成响应式,    this.current.machted 表示匹配到的 路径集合

        // this.current = createRoute(null, {
        //     path: currentPath,
        // })
        this.current = this.router.match(currentPath)
    }

    transitionTo(location, onComplete){
        // 根据跳转的路径
        // route = {path:'/', mathch: ['/a','/a/b']}
        let route = this.router.match(location)

       

        // 导航守卫
        let queue = [].concat(this.router.beforeEachHooks)

        const iterator = (hook, cb) => {
            hook(route, this.current, cb)
        }
        runQueue(queue, iterator, () => {
            // this.current  发生了变化，就会重新渲染
            this.current = route;

            this.cb && this.cb(route)

            // 默认初始化 会 执行一次
            onComplete && onComplete();
        })       
    }

    listen(cb){
        this.cb = cb;
    }
}

export function createRoute(record, location) {
    // debugger
    let res = []
    if(record){
        while(record){
            res.unshift(record)
            record = record.parent
        }
    }

    return {
        ...location,
        machted: res,
    }
}