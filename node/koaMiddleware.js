{
    let str="How are you doing today?"
    let arr1 = str.split(" ",4)    // (该参数可指定返回的数组的最大长度。如果设置了该参数，返回的子串不会多于这个参数指定的数组)
    // ["How", "are", "you", "doing"]

    let arr2 = str.split(" ",2)
    // ["How", "are"]
}


{
    let obj = {
        name: '11',
        get sex(){
            return 'zzz'
        }
    }

    /**
     * 这样写 简化使用  (可以在return 中写很多简化的东西)
     */
    console.log(obj.sex) // zzz
}



// https://juejin.im/post/5c1631eff265da615f772b59    koa 与 express 的中间件区别 


/*
 * ctx.state 推荐的命名空间，用于通过中间件传递信息和你的前端视图。
 * ctx.state.user = await User.find(id);  用 state 来记录信息
 * 
 * 
 * Koa这样处理error，在catch方法中发送error事件(ctx 的 onerror emit 错误 -> this.app.emit('error', err, this))，以便开发者自定义异常处理逻辑。
 * 在 application.js 的 handleRequest() catch 错误，且调用ctx的 onerror方法
 * 
 * 
 * Koa中res.end由中间件执行完成之后自动调用，这样避免在connect忘记调用res.end导致用户得不到任何反馈。 
 * (handleRequest -> fnMiddleware(ctx).then(handleResponse).catch(onerror) -> handleResponse -> respond(ctx))
 */





const Koa = require('koa');
const app = new Koa();


let mid1 = async (ctx,next) => {
    let name = ctx.cookies.get("name")

    console.log(name,'开始执行中间件1 打印cookie',ctx.cookies)    
    await next().then((d)=>{
        console.log('1111',d)
    })

    /**
     * response 直接被挂在到ctx上面，所以 可以直接ctx 访问 request 的属性
     */
    ctx.response.type = 'text/html';
    // 设置response的内容:
    // ctx.response.body = '<h1>Hello, koa2!</h1>';
    ctx.body = '检查应用是否存活';

    console.log('执行中间件1执行完成',ctx.state)  // ctx的state 已经被挂载属性, 在此可以直接被访问
}

/**
 * app.use() 执行之后 返回 app
 * 可以链式调用 中间件
 */
app.use(mid1).use(async (ctx,next) => {
    console.log('开始执行中间件2')
    await next()
    console.log('执行中间件2执行完成')
});

// app.use(function *(next){
//     console.log('generate 测试 前')
//     yield next
//     console.log('generate 测试 后')
// })

app.use(async (ctx,next) => {
    console.log('test  before')
    ctx.state.test = '我是第三个midddleware'

    await next()
    console.log('test  end')
})


app.listen(3001,()=>{
	console.log('服务启动成功')
});