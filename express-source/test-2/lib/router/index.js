const Route = require('./route')
const Layer = require('./layer')
const url = require('url')
const methods = require('methods')

function Router(){
    this.stack = []
}

// Router.prototype.get = function(path,handler){
//     let route = this.route(path)
//     route.get(handler)
// }
methods.forEach((method)=>{
    Router.prototype[method] = function(path){
        let route = this.route(path)
        route[method].apply(route,Array.prototype.slice.call(arguments,1))
    }
})


// 创建Route实列，完成layer上面的route 的挂载,把layer这个层放到stack数组中去
Router.prototype.route = function(path){
    let route = new Route(path)
    let layer = new Layer(path,route.dispatch.bind(route))
    layer.route = route

    this.stack.push(layer)
    return route
}

Router.prototype.handle = function(req,res,out){
    let idx = 0,self = this
    let {pathname} = url.parse(req.url,true)
    function next(err){
        if(idx >= self.stack.length){
            return out()
        }
        let layer = self.stack[idx++]
        // 优化处理(使用Route的methods)
        // 这一层只匹配路径(路由分组)
        if(layer.match(pathname) && layer.route.handle_method(req.method)){
            if(err){
                layer.handle_error(err,req,res,next)
            }else{
                layer.handle_request(req,res,next)
            }
        }else{
            //执行当前layer层的下层
            next()
        }
    }
    next()
}

module.exports = Router

/**
 * Router
 *      layer
 *          path route
 *              method  handler
 * 
 * layer
 * Router layer 路径 处理函数(route.dispatch) 有一个特殊的route属性
 * Route layer  路径 处理函数(业务代码) 有一个特殊的属性 method
 */