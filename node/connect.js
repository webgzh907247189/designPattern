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