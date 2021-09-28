let sum = 0

for (let index = 0; index < 100 * 1000; index++) {
    sum += index;
}

process.send('hello', (data) => {
    console.log('子进发送数据给父进程');
})

process.on('message',(data) => {
    console.log(data, '子进程接收的数据')

    process.exit(); // 子进程退出 ，加不加这个影响很大
})