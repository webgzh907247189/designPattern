{
    
}

const Koa = require('koa');
const app = new Koa();


let mid1 = async (ctx,next) => {
    console.log('开始执行中间件1')
    await next().then((d)=>{
        console.log('1111',d)
    })

    ctx.body = '检查应用是否存活';
    console.log('执行中间件1执行完成')
}
app.use(mid1);

app.use(async (ctx,next) => {
    console.log('开始执行中间件2')
    // await next()
    console.log('执行中间件2执行完成')
});

app.listen(3001,()=>{
	console.log('服务启动成功')
});