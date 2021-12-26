/**
 * ab [options] [http[s]://]hostname[:port]/[path]
 * -n requests：执行的请求个数（即本次测试需访问页面的次数）
 * -c concurrency：并发数（即本次测试同时访问的用户数）
 * -t timelimit：限制测试进行时长，单位为秒。其内部隐含值是-n 50000
 * 
 * ab -n 100 -c 20 http://localhost:3001/
 */

let http = require('http')

let hello = ''
for(let i=0; i< 1024*10; i++){
    hello += 'a汉字'
}

// hello = new Buffer(hello)
http.createServer((req,res)=>{
    // 可以调用setHeader 多次设置，但只有调用 writeHead 才写到链接宏
    // http 模块会自动设置一些头信息 Data Connection Transfer-Encoding
    res.setHeader('content-type','text/html;charset=utf8');
    res.setHeader('charset','utf8');
    res.writeHead(200)
    res.end(hello)
}).listen(3001)

// 每秒查询次数 ->  qps: 8316.71   传输率 -> Transfer rate:  79705.98  buffer  
// 每秒查询次数 ->  qps: 3093.96   传输率 -> Transfer rate:  28209.25  string
