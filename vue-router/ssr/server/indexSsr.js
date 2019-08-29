/**
 * vue 的 ssr只支持 beforeCreate created 生命周期
 */
let koa = require('koa')
let Router = require('koa-router') // ??
let static = require('koa-static') // ??
let fs = require('fs')
let path = require('path')

let vueServerRenderer = require('vue-server-renderer')


// let serverBundle = fs.readFileSync(path.resolve(__dirname,'../../dist/scripts/server.bundle.js'),'utf8')
let serverBundle = require('../../dist/vue-ssr-server-bundle.json')
let clientManifest = require('../../dist/vue-ssr-client-manifest.json')


let template = fs.readFileSync(path.resolve(__dirname,'../../dist/index.ssr.html'),'utf8')
// 渲染打包后的结果
let render = vueServerRenderer.createBundleRenderer(serverBundle,{
    template,
    clientManifest
})


let app = new koa()
let router = new Router()


router.get('/',async (ctx)=>{
    ctx.body = await new Promise((resolve,reject)=>{
        render.renderToString({url: '/'},(err,data)=>{
            if(err) reject(err)
            resolve(data)
        })
    })

    // ctx.body = await render.renderToString()
})

app.use(router.routes()) // ??
app.use(static(path.resolve(__dirname,'../../dist')))

//匹配不到，执行此逻辑
app.use(async (ctx)=>{
    try{
        ctx.body = await new Promise((resolve,reject)=>{
            render.renderToString({url: ctx.url},(err,data)=>{
                if(err) reject(err)
                resolve(data)
            })
        })     
    }catch(e){
        ctx.body = 404
    }

})

app.listen(3000,()=>{
    console.log('ssr render...')
})


/**
 * ssr 的路由系统
 */