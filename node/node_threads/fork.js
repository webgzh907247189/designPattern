const { fork } = require('child_process');
const path = require('path');


// fork 内部 也是调用 spawn 来执行
// fork 是 spawn 的特殊场景，只能用于创建 node 程序的子进程，默认会建立父子进程的 IPC 信道来传递消息
let cp = fork('nodesumfork.js', { 
    cwd: path.resolve(__dirname, 'child_process'),
    stdio: [0 ,1, 2, 'ipc'] // 因为添加了 stdio， 所以后面必须追加 ipc
})

cp.on('message',(data) => {
    console.log(data, '父进程接收的数据', cp.pid)

    cp.send('son', () => {
        console.log('父进发送数据给子进程');

        // process.kill(cp.pid)
        // cp.kill()
    })
})

cp.on('exit',() => {
    console.log('子进程退出')
})