let { fork }  = require('child_process');
let cpus = require('os').cpus();
let http = require('http');
let path = require('path');

console.log('main', process.pid)
const server = http.createServer((req,res) => {
    console.log('main')
    res.end('main' + process.pid)
}).listen(3000)


// 内部共享处理函数，不是监听同一个端口
for (let index = 0; index < cpus.length; index++) {   
    // 会造成端口冲突
    let cp = fork('server.js', { 
        cwd: path.resolve(__dirname, 'child_process'),
        stdio: [0 ,1, 2, 'ipc'] // 因为添加了 stdio， 所以后面必须追加 ipc
    })
    cp.send('server', server)
}