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
    ctx.body = '11'
    next()
})
router.get('/',async(ctx,next)=>{
    ctx.body = '222'
    next()
})

app.use((ctx,next)=>{
    ctx.body = 'router没走'
    console.log('1')
    next()
})
// 装载路由
app.use(router.routers())

app.use((ctx,next)=>{
    console.log('??')
})

app.listen(3001,()=>{
    console.log('session server starting')
})