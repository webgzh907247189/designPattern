// Sec-Websocket-Key 握手随机创建的值， 用于保证是安全的 websocket 连接
// Sec-Websocket-Accept 是服务端接收到 Sec-Websocket-Key，算出来并且返回给客户端

// Sec-Websocket-Accept: BfO5fxCEMRWSx6QBxr0MJdqFd/Y=
// Sec-Websocket-Key: b7D6L8z701N6blQM8pAVgA==

// const crypto = require('crypto')
import crypto from 'crypto'
const key = 'b7D6L8z701N6blQM8pAVgA=='
const val = 'BfO5fxCEMRWSx6QBxr0MJdqFd/Y='
const number = '258EAFA5-E914-47DA-95CA-C5AB0DC85B11'
const result = crypto.createHash('sha1').update(key + number).digest('base64')
console.log(result === val, result)