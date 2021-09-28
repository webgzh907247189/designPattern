let fs = require('fs');
let path = require('path');

let id = 0;
setInterval(() => {
    id++
    fs.appendFileSync(path.resolve(__dirname, 'detachd.txt'), 'abc')

    if(id >= 10){
        process.exit()
    }
}, 2000);

process.on('exit', (err) => {
    console.log('子进程退出');
})