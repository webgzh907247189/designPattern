/**
 * vue 的 ssr只支持 beforeCreate created 生命周期
 */
let koa = require('koa')
let Router = require('koa-router') // ??
let static = require('koa-static') // ??
let fs = require('fs')
let path = require('path')


let Vue = require('vue')
let vueServerRenderer = require('vue-server-renderer')

const vm = new Vue({
    data(){
        return {
            name: 'ssr'
        }
    },
    template: '<div>{{name}}</div>'
})

let template = fs.readFileSync(path.resolve(__dirname,'../../index.html'),'utf8')

let render = vueServerRenderer.createRenderer({
    template
})


let app = new koa()
let router = new Router()


router.get('/',async (ctx)=>{
    ctx.body = await render.renderToString(vm)
})


app.use(router.routes()) // ??

app.listen(3000,()=>{
    console.log('ssr render')
})