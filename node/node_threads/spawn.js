// node 很早以前不支持开启线程   (现在支持了 work-thead 但是不稳定)
// 现在用 node 还是开启多进程方式启动 node

const path = require('path');
const { spawn } = require('child_process')
const cp = spawn('node', ['nodesum.js', 'arg1', 'arg2'], {
    cwd: path.resolve(__dirname, 'child_process'),


    // stdio: 'ignore', // 忽略子进程的输出

    // 'inherit': 相当于 ['inherit', 'inherit', 'inherit'] 或 [0, 1, 2]
    // 此时在 子进程执行 console.log 和 process.stdout.write 调用的是同一个方法， 相当于 子进程 和 父进程 process 共享
    // stdio: 'inherit', //[0, 1, 2], //[process.stdin, process.stdout, process.stderr], // 父进程在运行过程把自己 标准输入 标准输出 错误输出  传递给 子进程

    stdio: ['pipe', 'pipe', 2], // 表示期望 用 标准输入 标准输出 建立管道，   错误输出共享
})

// 监听子进程的错误
cp.on('error',(err) => {
    console.log(err);
})

// 监听子进程的退出事件
cp.on('exit',(err) => {
    console.log('监听子进程的退出事件');
})

// 监听子进程的关闭事件
cp.on('close',(err) => {
    console.log('监听子进程的关闭事件');
})


cp.stdin.write('父进程给子进程的数据')
cp.stdout.on('data', (data) => {
    console.log(data.toString(), '子进程 通过 process.stdout.write 输出');
})