/**
 * http://leeight.github.io/blog/2014/06/v8-full-codegen/   node 基础 (编译器)
 */

const http = require('http');
const Koa = require('koa');
const KoaRouter = require('koa-router');
const views = require('koa-views');
const ejs = require('ejs');
const serve = require("koa-static");


//  koa redirect之后,下面的代码还会走吗
//  / 路径下 render不对
//  https://www.chrisyue.com/please-dont-put-script-tag-at-the-end-of-body.html


const app = new Koa();

/**
 * koa-router 做了兼容处理 可以不 new 
 */
// const router = new KoaRouter();
const router = KoaRouter();



router.use(views(__dirname + '/view'));

/**
 * { subdomainOffset: 2, proxy: false, env: 'development' } 
 */
console.log(app.inspect(),'11')

/**
 * 执行这个,以后的路由访问  不会在被执行
 */
// app.use(ctx => {
//   ctx.body = '检查应用是否存活';
// });



// router.get('/', (ctx) => {
// 	console.log('11111111')
// 	ctx.body = '检查应用是否存活';
// })
router.get('/',  function *(ctx){
	console.log('11111111')
	yield ctx.render('test.html')
})


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


app.use(router.routes());  // 添加路由中间件
app.use(router.allowedMethods()); // 对请求进行一些限制处理




// app.use(serve(__dirname+ "/view1",{ extensions: ['html']})); //??????????  (注意放的位置,应该在roter之后)
// app.use(serve(__dirname+ "/view1"));
app.use(serve(__dirname+ "/view",{ extensions: ['html']}));  //这个放的位置会影响router，具体为对应的根路由影响


app.listen(3000,()=>{
	console.log('服务启动成功')
});