const express = require('express')
const http = require('http')

module.exports = class Server {
    constructor(options){
        this.options = options
    }

    close(){
        return new Promise((rsolve, reject) => {
            this.httpServer.close(this.options.port, () => {
                console.log('sketeton 服务已经关闭')
                rsolve()
            })
        })
    }

    listen(){
        const app = this.app = express()
        // 使用 用户传入的 staticDir
        app.use(express.static(this.options.staticDir))
        this.httpServer = http.createServer(app)
        return new Promise((rsolve, reject) => {

            // 这里用 http.createServer(app) 目的: 为了后续可以关闭 http 请求
            this.httpServer.listen(this.options.port, () => {
                console.log('sketeton 服务已经启动')
                rsolve()
            })
        })
    }
}

