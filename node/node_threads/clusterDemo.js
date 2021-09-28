let cluster = require('cluster');
let http = require('http');
let cpus = require('os').cpus();
let path = require('path');


if(cluster.isMaster){
    for (let index = 0; index < cpus.length; index++) {
        cluster.fork() // 就是 child_process.fork()
    }
} else {
    // 子进程走这个逻辑
    const server = http.createServer((req,res) => {
        console.log('main')
        res.end('main' + process.pid)
    }).listen(3000)
}


// 集群如何实现的
// 1. 内部使用 fork 实现创建子进程
// 2. 标识是不是主进程 使用 NODE_UNIQUE_ID, 有这个表示子进程
// 3. node 中创建服务时，调用listen 方法，这个listen 方法调用 listenCluster
// 4. 创建服务时，如果是 主进程正常创建服务， 如果是 子进程，不能创建服务 (端口重复占用)
// 子进程把创建的 服务传递给 父进程，让主进程 创建一个应用


// 多个进程监听同一个端口，不会导致端口冲突



// 内部如何实现负载均衡 (默认采用轮训， window 比较特殊)