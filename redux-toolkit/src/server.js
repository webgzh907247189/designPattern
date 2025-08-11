const koa = require('koa')
const app = new koa()

app.use(async (ctx, next) => {
	ctx.set('Access-Control-Allow-Origin', ctx.get('origin'));
	ctx.set('Access-Control-Allow-Credentials', 'true');
	// ctx.set('Access-Control-Allow-Headers', 'Content-Type, Content-Length, Authorization, Accept, X-Requested-With , yourHeaderFeild');
  	// ctx.set('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');
	await next();
})
app.use((ctx, next) => {
    console.log(ctx.request.url.startsWith('/todos/deatail/'), 'ctx.request.url')
    if(ctx.request.url.startsWith('/todos/deatail/')){
        ctx.statusCode = 200
        ctx.body  = {
            data: {
                name: '1111',
                sex: '222'
            }
        }
    }else{
        next()
    }
})

app.listen(9000, () => {
    console.log('server is running at port 9000')
})