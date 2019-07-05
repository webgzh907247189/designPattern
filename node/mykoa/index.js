const koa = require('./src/application')
const fs = require('fs')
const path = require('path')

let app = new koa()

app.use(async (ctx,next)=>{
    console.log(ctx.req.method)
    console.log(ctx.request.req.method)
    console.log(ctx.request.method,ctx.request.path)
    console.log(ctx.method)

    console.log('1')
    await next()
    // await next()
    console.log('4')
}).use(async (ctx,next)=>{
    console.log('2')
    await next()
    console.log('3')
}).use((ctx)=>{
    // ctx.body = fs.createReadStream(path.join(__dirname,'./src/application.js'))
    throw new Error('zzz')
    // 测试
    ctx.body = '11'
})

app.listen(4000,()=>{
    console.log('我启动了...')
})

app.on('error',(err,ctx)=>{
    console.log(err)
    ctx.res.end('error!')
})

console.log(this === module.exports,this === exports,'...') // true, true