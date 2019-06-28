const koa = require('./src/application')

let app = new koa()

app.use(async (ctx,next)=>{
    console.log('1')
    await next()
    await next()
    console.log('4')
}).use(async (ctx,next)=>{
    console.log('2')
    await next()
    console.log('3')
})

app.listen(4000,()=>{
    console.log('我启动了...')
})