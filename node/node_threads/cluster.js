/**
 * 为了更加方便的管理进程、负载均衡以及实现端口复用，Node 在 v0.6 之后引入了 cluster 模块
 * 相对于子进程模块，cluster 实现了单 master 主控节点和多 worker 执行节点的通用集群模式。
 * cluster master 节点可以创建销毁进程并与子进程通信，子进程之间不能直接通信；worker 节点则负责执行耗时的任务。
 * 
 * cluster 模块同时实现了负载均衡调度算法，在类 unix 系统中，cluster 使用轮转调度（round-robin），
 * node 中维护一个可用 worker 节点的队列 free，和一个任务队列 handles。
 * 当一个新的任务到来时，节点队列队首节点出队，处理该任务，并返回确认处理标识，依次调度执行。
 * 而在 win 系统中，Node 通过 Shared Handle 来处理负载，通过将文件描述符、端口等信息传递给子进程，
 * 子进程通过信息创建相应的 SocketHandle / ServerHandle，然后进行相应的端口绑定和监听，处理请求。
 * 
 * 
 * cluster 大大的简化了多进程模型的使用
 */

const cluster = require('cluster');
// 计算斐波那契数列第 n 项
function fib(num) {
  if (num === 0) return 0;
  if (num === 1) return 1;
  return fib(num - 2) + fib(num - 1);
}

if (cluster.isMaster) { // 主控节点逻辑
  for (let i = 43; i < 45; i++) {
    const worker = cluster.fork() // 启动子进程
    // 发送任务数据给执行进程，并监听子进程回传的消息
    worker.send({ num: i });
    worker.on('message', message => {
      console.log(`receive fib(${message.num}) calculate result ${message.data}`)
      worker.kill();
    });
  }
    
  // 监听子进程退出的消息，直到子进程全部退出
  cluster.on('exit', worker => {
    console.log('worker ' + worker.process.pid + ' killed!');
    if (Object.keys(cluster.workers).length === 0) {
      console.log('calculate main process end');
    }
  });
} else {
  // 子进程执行逻辑
  process.on('message', message => { // 监听主进程发送的信息
    const { num } = message;
    console.log('child pid', process.pid, 'receive num', num);
    const data = fib(num);
    process.send({ data, num }); // 将计算结果发送给主进程
  })
}