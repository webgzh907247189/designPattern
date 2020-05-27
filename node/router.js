/**
 * https://juejin.im/post/5ec488adf265da771b2fcded
 * 
 * koa-router 原理
 * 
 * 多个相同的路由，采用 method，path 进行过滤出来 routers() 使用的 stack
 * 在 compose 里面 对 stack 进行 循环处理，每次传入 next，进入下一个路由系统 -> 匹配不到进行 next 操作，控制权交给下一个中间件
 */

class Router{
    constructor(){
        this.stack = []
    }
    get(path,callback){
        let layer = new Layer(path,callback,'get')
        this.stack.push(layer)
    }
    compose(stack,ctx,next){
        async function dispatch(idx){
            // 如果到最好，还继续next，就回到原来到koa到next
            if(idx === stack.length){
                return next()
            }
            let layer = stack[idx]
            await layer.callback(ctx,()=>{dispatch(idx+1)})
        }
        return dispatch(0)
    }
    routers(){
        return async (ctx,next) => {
            let {path,method} = ctx
            let stack = this.stack.filter((item)=>{
                return item.match(path,method)
            })
            this.compose(stack,ctx,next)
        }
    }
}
class Layer{
    constructor(path,callback,method){
        this.callback = callback
        this.path = path
        this.method = method
    }
    match(path,method){
        return this.method === method.toLowerCase() && this.path === path
    }
}

let koa = require('koa')

let app = new koa()
let router = new Router()

router.get('/',async(ctx,next)=>{
    console.log('2')
    ctx.body += '11'
    next()
    console.log('6')
})
router.get('/',async(ctx,next)=>{
    console.log('3')
    ctx.body += '222'
    next()
    console.log('5')
})

app.use((ctx,next)=>{
    console.log('1')
    ctx.body = 'router没走'
    next()
    console.log('7')
})
// 装载路由
app.use(router.routers())

app.use((ctx,next)=>{
    console.log('4')
})

app.listen(3001,()=>{
    console.log('session server starting')
})