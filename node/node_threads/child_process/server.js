let http = require('http');

console.log('child', process.pid)
process.on('message', (message, server) => {
    http.createServer((req,res) => {
        console.log('child')
        res.end('child' + process.pid)
    }).listen(server)
})