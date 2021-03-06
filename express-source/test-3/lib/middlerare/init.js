// 处理query path
let url = require('url')
module.exports = function(req,res,next){
    let {pathname,query} = url.parse(req.url,true)
    req.path = pathname
    req.query = query

    res.json = function(obj){
        res.setHeader('Content-type','application/json')
        res.end(JSON.stringify(obj))
    }
    
    next()
}