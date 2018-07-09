const http = require('http');
const Koa = require('koa');
const KoaRouter = require('koa-router');
const views = require('koa-views');
const ejs = require('ejs');
const serve = require("koa-static");


// koa redirect之后,下面的代码还会走吗
// 
// 
// 
// 
// 
// 



const app = new Koa();
const router = new KoaRouter();
// router.use(views(__dirname + '/view'));

// app.use(ctx => {
//   ctx.body = '检查应用是否存活';
// });

// router.get('/', (ctx) => {
// 	console.log('11111111')
// 	ctx.body = '检查应用是否存活';
// })

// router.get('/a',(req,res,next)=>{
// 	console.log('start')
// 	next()
// 	res.redirect('/b');
// 	console.log('end')
// })

router.get('/b', function *(ctx) {
	console.log('999')
	yield ctx.render('index.html')
})

app.use(serve(__dirname+ "/view",{ extensions: ['html']}));

app.use(router.routes());  // 添加路由中间件
app.use(router.allowedMethods()); // 对请求进行一些限制处理

app.listen(3000,()=>{
	console.log('服务启动成功')
});