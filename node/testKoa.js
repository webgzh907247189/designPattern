/**
 * http://leeight.github.io/blog/2014/06/v8-full-codegen/   node 基础 (编译器)
 * 
 * https://segmentfault.com/a/1190000007468233   koa-router 源码解析
 */

const http = require('http');
const Koa = require('koa');
const KoaRouter = require('koa-router');
const views = require('koa-views');
const ejs = require('ejs');
const serve = require("koa-static");


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






// 最新的 koa-router 不支持 generate 写法
// router.get('/',  function *(ctx,next){
// 	console.log('11111111')
// 	yield ctx.render('test.html')
// })

router.get('/',  async(ctx) => {
	console.log('11111111')
	await ctx.render('test.html')
})

router.register('/f', ['get'], [function(ctx, next){
	console.log('register')
	ctx.body = '路由使用register方法';
}])
router.register('/ff', ['get'], function(ctx, next){
	console.log('register222222222')
	ctx.body = '路由使用register方法2222222';
})



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