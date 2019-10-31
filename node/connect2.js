let connect = require('connect');
let http = require('http');
let app = connect()
let sub_app = connect();
// https://github.com/alsotang/node-lessons/blob/master/lesson18/README.md

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

app.use('/', sub_app);
sub_app.use('/', function (req,res,next) {
    console.log('sub_app--sub_app')
    next()
})
console.log(sub_app.length)
app.listen('3000',function() {
    console.log('connect 已经启动')
})