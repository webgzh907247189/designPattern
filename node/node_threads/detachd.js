
const path = require('path');
const { spawn } = require('child_process')



// 
const cp = spawn('node', ['write.js'], {
    cwd: path.resolve(__dirname, 'child_process'),
    // stdio: [0, 1, 2], // 不加这个子进程错误没办法在 父进程拿到

    stdio: 'inherit',
    detached: true,
})
cp.unref(); // 彻底放弃和父进程的 关系


// 监听 子进程的错误消息
cp.on('error', (err) => {
    console.log(err);
})


// 监听 当前进程的错误消息
process.on('error', (err) => {
    console.log(err);
})
