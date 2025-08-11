import express from 'express'
import http from 'http'

import { WebSocketServer } from 'ws'

const app = express()

// http 服务
const server = http.createServer(app)

const wss = new WebSocketServer({ server })


// 每个人 连接都有自己的 ws
wss.on('connection', (ws) => {

	// 给 客户端发消息
	ws.send('hello client')


	ws.on('message', (msg) => {
		// 给 客户端发消息
		console.log('客户端发送的数据' + msg)
	})
})

server.listen(3000, () => {
	console.log('server is running')
})