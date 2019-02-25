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






/*
 * ctx.state 推荐的命名空间，用于通过中间件传递信息和你的前端视图。
 * ctx.state.user = await User.find(id);
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