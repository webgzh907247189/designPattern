require('http').createServer((req, res) => {
    res.writeHead(200);
    res.end('Hello World');
}).listen(8000);
console.log('process id', process.pid);


/**
 * Node 内建模块 http 创建了一个监听 8000 端口的服务，并打印出该服务运行进程的 pid，控制台输出 pid 为 35919（可变），
 * 然后我们通过命令 top -pid 35919 查看进程的详细信息
 * 
 * PID    COMMAND      %CPU TIME     #TH  #WQ  #POR MEM    PURG CMPRS  PGRP  PPID  STATE    BOOSTS     %CPU_ME %CPU_OTHRS UID  FAULT COW  MSGS MSGR
 * 78867  node         0.0  00:00.17 5    0    21   9364K  0B   9360K  20475 20692 sleeping *0[1]      0.00000 0.00000    501  5666  419  62   28
 */


 /**
  * 我们看到 #TH (threads 线程) 这一列显示此进程中包含 7 个线程，说明 Node 进程中并非只有一个线程。
  * 事实上一个 Node 进程通常包含：
  *     1 个 Javascript 执行主线程；
  *     1 个 watchdog 监控线程用于处理调试信息；
  *     1 个 v8 task scheduler 线程用于调度任务优先级，加速延迟敏感任务执行；
  *     4 个 v8 线程（可参考以下代码），主要用来执行代码调优与 GC 等后台任务；
  *     以及用于异步 I/O 的 libuv 线程池
  * 
  * 
  * 其中异步 I/O 线程池，如果执行程序中不包含 I/O 操作如文件读写等，则默认线程池大小为 0，否则 Node 会初始化大小为 4 的异步 I/O 线程池，
  * 当然我们也可以通过 process.env.UV_THREADPOOL_SIZE 自己设定线程池大小。需要注意的是在 Node 中网络 I/O 并不占用线程池。
  */


const path = require('path')
require('fs').readFile(path.resolve(__dirname, './test.txt'), err => {
    if (err) {
      console.log(err);
      process.exit();
    } else {
      console.log(Date.now(), 'Read File I/O');
    }
});
console.log(process.pid);

/**
 * 此时 #TH 一栏的线程数变成了 11，即大小为 4 的 I/O 线程池被创建。至此，我们针对段首的问题心里有了答案，Node 严格意义讲并非只有一个线程，
 * 通常说的 “Node 是单线程” 其实是指 JS 的执行主线程只有一个。
 */