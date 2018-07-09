// let http = require('http')
// http.createServer((req,res) => {
// 	res.writeHead(200, {'Content-Type': 'text/plain;charset=utf-8;'})
// 	res.write('fidddler  test222');
// 	// let 
// 	setTimeout(()=>{
// 		res.end('测试fiddler111')
// 	},1000)
// 	//
// }).listen(3000, '127.0.0.1',function () {
// 	console.log('创建成功!!!')
// })




let express = require('express')
let path = require('path')
let bodyParser = require('body-parser')
let ejs = require('ejs')
let app = express()

app.use(bodyParser.json({type: 'application/json'}))

app.engine('html', ejs.__express) // 使用EJS模板，不用配置该项。html模板需要配置
app.set('view engine','html')     // 调用render函数时能自动为我们加上’.html’ 后缀,若没设置，在render时需要手动补充完整文件名(detail.html)
app.set('views', path.join(__dirname, './view'));


app.get('/',(req,res,next)=>{
	res.writeHead(200,{'Content-Type':'text/html;charset=utf-8'})
	setTimeout(()=>{
		res.end('测试fiddler111')
	},1000)
})

/**
 * 不使用middleware情况下
 */
// app.get('/a',(req,res,next)=>{
// 	setTimeout(()=>{
// 		res.redirect('/b');
// 		console.log('1111')
// 	},2000)
// })






/**
 * 使用express  middleware
 *
 * https://blog.csdn.net/zzwwjjdj1/article/details/52126352
 * res.xxx操作之后最好不要再有代码,就算是打印输出的代码也写在res.xxx之前
 * nodejs程序就算res.xxx响应以后,程序还会继续执行,return下更好
 *
 * res.redirect() 会调用 res.writeHead()
 *
 * 在处理HTTP请求时，服务器会先输出响应头，然后再输出主体内容，而一旦输出过一次响应头（比如执行过 res.writeHead() 或 res.write() 或 res.end()），
 * 你再尝试通过 res.setHeader() 或 res.writeHead() 来设置响应头时（有些方法比如 res.redirect() 会调用 res.writeHead()），就会报这个错误
 */
app.get('/a',(req,res,next)=>{
	console.log('start')
	next()

	res.redirect('/b');
	console.log('end')
	
},function(req,res,next){
	console.log('web测试')
	res.setHeader("Set-Cookie", ["web=test","test=web"]);
	console.log('cookie set 完成')
})

app.get('/b',(req,res,next)=>{
	res.render('index.html')
})

let getPort = app.get('port') || 3000
let server = app.listen(getPort,()=>{
	let port = server.address().port
	let host = server.address().address
	console.log('服务启动成功  http://%s:%s',host,port)
})

