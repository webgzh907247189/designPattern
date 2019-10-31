let connect = require('connect');
let http = require('http');
let app = connect()

function handler(req, res) {
    res.setHeader('b','2')
    res.write('oh1, ');
    console.log('最先开始')
    app(req, res, function() {
        console.log('done函数 -- 最后执行')
        res.end('no!');
    });
}
var server = http.createServer(handler).listen('3000',function() {
    console.log('connect 已经启动')
})

// Transfer-Encoding: chunked -> 流
// 一直write就可以一直加，直到我调用res.end('xx') ，然后组合返回


/** 公用的middleware---start */
// header头必须在响应的前面。
// 当已经发送了响应，就意味着不能继续写header了
// 因为此时header已经发送到客户端了
// 是http协议约定的
app.use('/', function (req,res,next) {
    // res.setHeader('a','1')
    res.write('oh2, ');
    console.log('use 带路由的中间件')
    next()
})
app.use(function (req,res,next) {
    // res.setHeader('c','3')
    console.log('use 中间件')
    res.write('oh3, ');
    next()
    // 加上这句，使得res提前结束
    res.end('hello')
})
/** 公用的middleware---end */

// app.listen('3000',function() {
//     console.log('connect 已经启动')
// })