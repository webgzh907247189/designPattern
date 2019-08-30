const Layer = require('./layer')
const methods = require('methods')


function Route(path){
    this.path = path
    this.stack = []

    // 此路由有此 方法的处理函数，加速路由匹配 (一个路由有get，post，直接判断这个对象有没有get || post 就可以，加速匹配)
    this.methods = {}
}

methods.forEach((method)=>{
    Route.prototype[method] = function(){
        let handlers = Array.prototype.slice.call(arguments)
        this.methods[method] = true

        for(let i=0; i<handlers.length; i++){
            let layer = new Layer('/',handlers[i])
            layer.method = method
            this.stack.push(layer)
        }        
    }
})

// Route.prototype.get = function(handler){
//     let layer = new Layer('/',handler)
//     layer.method = 'get'
//     this.stack.push(layer)
//     this.methods['get'] = true
// }

// get 是向 stack添加层， dispatch执行层
// done 路径没有对应上，直接出去，去下一个最外层的layer匹配
// 执行当前layer层的下个函数
Route.prototype.dispatch = function(req,res,out){
    let idx = 0,self = this
    function next(err){
        // 一旦出错了，跳出当前路由，执行下个路由
        if(err){
            return out(err)
        }
        // 这个out是当前layer层的route的stack没有匹配上，去下个layer层进行匹配。
        // 接应上面Router.prototype.handle方法layer.handle_request(req,res,next)传过来的next
        // Route的dispatch的out 是Router的next
        if(idx >= self.stack.length){
            return out()
        }
        let layer = self.stack[idx++]
        // console.log(layer,'??',idx,'!!',self.stack.length)
        // 优化处理(使用Route的methods)
        if(layer.method === req.method.toLowerCase()){
            layer.handle_request(req,res,next)
        }else{
            next()
        }
    }
    next()
}

Route.prototype.handle_method = function(method){
    method = method.toLowerCase()
    return this.methods[method] ? true : false
}


module.exports = Route