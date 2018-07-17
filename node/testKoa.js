const http = require('http');
const Koa = require('koa');
const KoaRouter = require('koa-router');
const views = require('koa-views');
const ejs = require('ejs');
const serve = require("koa-static");


// koa redirect之后,下面的代码还会走吗
// / 路径下 render不对
// https://www.chrisyue.com/please-dont-put-script-tag-at-the-end-of-body.html


const app = new Koa();
const router = new KoaRouter();
router.use(views(__dirname + '/view'));



/**
 * 执行这个,以后的路由访问  不会在被执行
 */
// app.use(ctx => {
//   ctx.body = '检查应用是否存活';
// });



// router.get('/a',(req,res,next)=>{
// 	console.log('start')
// 	next()
// 	res.redirect('/b');
// 	console.log('end')
// })

router.get('/c', async (ctx)=> {
	console.log('222222')	
	await ctx.render('test.html')
})

router.get('/b', async (ctx,next)=> {
	console.log('33333333')
	await ctx.redirect('/d')
	console.log('redirect之后了')
})

router.get('/d', async (ctx,next)=> {
	console.log('4444')	
	await ctx.render('index.html')
})

// router.get('/',  function(ctx){
// 	console.log('11111111')
// 	ctx.body = '检查应用是否存活';
// })

router.get('/',  function *(ctx){
	console.log('11111111')
	yield ctx.render('test.html')
})

// app.use(serve(__dirname+ "/view1",{ extensions: ['html']})); //??????????
// app.use(serve(__dirname+ "/view1"));

app.use(router.routes());  // 添加路由中间件
app.use(router.allowedMethods()); // 对请求进行一些限制处理

app.listen(3000,()=>{
	console.log('服务启动成功')
});