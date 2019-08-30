const http = require('http')
const url = require('url')
const methods = require('methods')
const Router = require('./router/index')

function Application(){
    // this.lazyRouter()
}

// 路由懒加载(不调用方法，不需要执行初始化代码)
Application.prototype.lazyRouter = function(){
    if(!this._router){
        this._router = new Router()
    }
}
methods.forEach((method)=>{
    Application.prototype[method] = function(path,handler){
        this.lazyRouter()
        // 可以支持多个处理函数
        this._router[method].apply(this._router,Array.prototype.slice.call(arguments))
        return this
    }
})

// 添加中间件，都是放在stack数组里面(this._router.stack)
Application.prototype.use = function(){
    this.lazyRouter()
    this._router.use.apply(this._router,arguments)
}


// 每次调用get都会创建一个层，这个层挂载一个route对象，又分为多层
// Application.prototype.get = function(path,handler){
//     this.lazyRouter()
//     this._router.get(path,handler)

//     // this._router.push({
//     //     path,
//     //     method: 'get',
//     //     handler,
//     // })
//     return this
// }


Application.prototype.listen = function(){
        // req.method 是大写的GET 所以需要转为小写
        // url.parse(req.url,true) 第二个参数代表是否解析为对象，默认是false 直接返回字符串
        let self = this
        let server = http.createServer(function(req,res){
            function done(){
                res.end(`Cannot ${req.method} ${req.url}`)
            }

            // 如果路由系统无法匹配上，则请求交给done函数处理
            self._router.handle(req,res,done)

            // let {pathname} = url.parse(req.url,true)
            // for(i=1; i<self._router.length; i++){
            //     let {path,handler,method} = router[i]
            //     if(pathname === path && method === req.method.toLocaleLowerCase()){
            //         // 找到就不匹配了
            //         return handler(req,res)
            //     }
            // }
            // self._router[0].handler(req,res)
        })
        server.listen(...arguments)
}

module.exports = Application