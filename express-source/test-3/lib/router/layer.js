function Layer(path,handler){
    this.path = path
    this.handler = handler
}

// 判断当前的这一层和传入的路径是否匹配
Layer.prototype.match = function(path){
    if(this.path === path){
        return true
    }
    // 匹配中间件层
    if(!this.route){
        return path.startsWith(this.path)
    }
    return false
}

Layer.prototype.handle_request = function(req,res,next){
    this.handler(req,res,next)
}


Layer.prototype.handle_error = function(err,req,res,next){
    if(this.handler.length != 4){ // ?? if(!arguments.length != 4){
        return next(err)
    }
    this.handler(err,req,res,next)
}
module.exports = Layer