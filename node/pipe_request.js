/**
 * 模拟 服务转发调用服务的情况  出现数据丢失
 * @type {[type]}
 */

let express = require('express')
let path = require('path')
let bodyParser = require('body-parser')
let request = require('request')
let fs = require('fs')
let ejs = require('ejs')
let app = express()

app.use(bodyParser.json({type: 'application/json'}))

app.engine('html', ejs.__express)
app.set('view engine','html')
app.set('views', path.join(__dirname, './view'));

app.get('/',(req,res,next)=>{
	// res.writeHead(200,{'Content-Type':'text/html;charset=utf-8'})   // json 返回正常
	
	res.setHeader('Content-Type', 'text/html;charset=gb2312');  // json 返回不正常

	let res11 = request({
		method: 'GET',
		url: 'https://class.hujiang.com/homeapi/v2/homepage/tagMixInfo/52',
		gzip: true
	}, function (error, response, body) {
		console.log(response.caseless.dict['content-length'],'response-header-content-length')
	})

	res11.pipe(res)

	// res.end('2222222')
})


let getPort = app.get('port') || 3000
let server = app.listen(getPort,()=>{
	let port = server.address().port
	let host = server.address().address
	console.log('服务启动成功  http://%s:%s',host,port)
})