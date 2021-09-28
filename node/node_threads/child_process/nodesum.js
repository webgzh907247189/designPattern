let sum = 0

for (let index = 0; index < 100 * 1000; index++) {
    sum += index;
}

// 'inherit': 相当于 ['inherit', 'inherit', 'inherit'] 或 [0, 1, 2]
// console.log  process.stdout.write 调用的是同一个方法, 此时 子进程的 输出会被输出到 父进程
console.log(sum, process.argv.slice(2))


// stdio: ['pipe', 'pipe', 2], // 表示期望 用 标准输入 标准输出 建立管道，   错误输出共享
// console.error(sum, 'error')


// process.stdout.write('sum' + sum)

process.stdin.on('data', (data) => {
    console.log(data.toString(), '子进程接收数据');
})

