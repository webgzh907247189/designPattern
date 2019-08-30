const http = require('http')
const url = require('url')

let router = [{
    path: '*', //匹配所有的路径
    method: '*',
    handler(req,res){
        res.end(`Cannot ${req.method} ${req.url}`)
    }
}]

function createApplication(){
    return {
        get(path,handler){
            router.push({
                path,
                method: 'get',
                handler,
            })
        },
        listen(){
            // req.method 是大写的GET 所以需要转为小写
            // url.parse(req.url,true) 第二个参数代表是否解析为对象，默认是false 直接返回字符串
            
            let server = http.createServer(function(req,res){
                let {pathname} = url.parse(req.url,true)
                for(i=1; i<router.length; i++){
                    let {path,handler,method} = router[i]
                    if(pathname === path && method === req.method.toLocaleLowerCase()){
                        // 找到就不匹配了
                        return handler(req,res)
                    }
                }
                router[0].handler(req,res)
            })
            server.listen(...arguments)
        }
    }
}

module.exports = createApplication