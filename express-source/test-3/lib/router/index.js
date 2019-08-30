const Route = require('./route')
const Layer = require('./layer')
const url = require('url')
const methods = require('methods')

function Router(){
    function router(req,res,next){
        router.handle(req,res,next)
    }
    Object.setPrototypeOf(router,proto)
    router.stack = []
    return router
}

// Router.prototype.get = function(path,handler){
//     let route = this.route(path)
//     route.get(handler)
// }

let proto = Object.create(null)
methods.forEach((method)=>{
    proto[method] = function(path){
        let route = this.route(path)
        route[method].apply(route,Array.prototype.slice.call(arguments,1))
    }
})

proto.use = function(path,handler){

    if(typeof handler !== 'function'){
        handler = path
        path = '/'
    }
    let layer = new Layer(path,handler)
    layer.route = undefined // 判断是不是中间件的依据
    layer.ss = '1111'
    this.stack.push(layer)
}

// 创建Route实列，完成layer上面的route 的挂载,把layer这个层放到stack数组中去
proto.route = function(path){
    let route = new Route(path)
    let layer = new Layer(path,route.dispatch.bind(route))
    layer.route = route
    this.stack.push(layer)
    return route
}

proto.handle = function(req,res,out){
    let idx = 0,self = this,slashAdded = false,removed = ''
    let {pathname} = url.parse(req.url,true)
    function next(err){
        //加上移除的路由(因为去下一层进行匹配了)
        if(removed.length > 0){
            req.url = removed + req.url
            removed = ''
        }

        if(idx >= self.stack.length){
            return out(err)
        }

        let s = idx++
        let layer = self.stack[s]

        // console.log(layer.route,'err22',s,layer)
        if(layer.match(pathname)){

            if(!layer.route){
                removed = layer.path
                req.url = req.url.slice(removed.length)
                if(err){
                    layer.handle_error(err,req,res,next)
                }else{
                    layer.handle_request(req,res,next)
                }
            }else{
                if(err){
                    layer.handle_error(err,req,res,next)
                }

                // console.log(err,'err22')
                if(layer.route && layer.route.handle_method(req.method)){
                    layer.handle_request(req,res,next)
                }else{
                    //执行当前layer层的下层
                    next(err)
                }
            }
        }else{
            //执行当前layer层的下层
            next(err)
        }

        // 优化处理(使用Route的methods)
        // 这一层只匹配路径(路由分组)
        // if(layer.match(pathname) && layer.route && layer.route.handle_method(req.method)){
        //     if(err){
        //         layer.handle_error(err,req,res,next)
        //     }else{
        //         layer.handle_request(req,res,next)
        //     }
        // }else{
        //     //执行当前layer层的下层
        //     next()
        // }
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