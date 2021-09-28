const { execFile,exec } = require('child_process');
const path = require('path');


// shell 默认是 false， 追加为 true之后， 就支持了参数
execFile('node -v',{ 
    cwd: path.resolve(__dirname, 'child_process'),
    shell: true
}, (err, stdout, stderr) => { // 回掉不支持大的文件，maxBuffer
    console.log(err, stdout);
})


exec('node -v',{ 
    cwd: path.resolve(__dirname, 'child_process')
}, (err, stdout, stderr) => { // 回掉不支持大的文件，maxBuffer
    console.log(err, stdout);
})