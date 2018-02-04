/*
 * express默认使用jade模板
 * path模块解释  http://javascript.ruanyifeng.com/nodejs/path.html  https://www.cnblogs.com/52cik/p/learn-node-path.html
 */

// let str = path.dirname('path/upload/file/123.jpg') //根据一个文件或目录得到它所在的目录路径
// console.log(str) // path/upload/file

// let str = path.dirname(__filename) // 等价于 __dirname
// console.log(str, __dirname) // 当前文件所在目录


let express = require('express')
let path = require('path')
let bodyParser = require('body-parser')
let ejs = require('ejs')
let app = express()

app.use(bodyParser.json({type: 'application/json'}))


// app.use(express.static(path.join(__dirname,'../dist')))
app.use(express.static(path.resolve(__dirname,'./static')))
//console.log(path.resolve(__dirname,'../dist')) // D:\gzh\demo\dist  (将相对路径转为绝对路径,它可以接受多个参数，依次表示所要进入的路径，直到将最后一个参数转为绝对路径)
// path.resolve(__dirname,'/dist') // D:\dist


app.engine('html', ejs.__express) // 使用EJS模板，不用配置该项。html模板需要配置
app.set('view engine','html')     // 调用render函数时能自动为我们加上’.html’ 后缀,若没设置，在render时需要手动补充完整文件名(detail.html)
app.set('views', path.join(__dirname, './view'));




app.get('/',(req,res,next)=>{
	res.render('index',{title: '测试dist'})
})
app.get('/b.html',(req,res,next)=>{
	res.render('b')
})



app.set('port',process.env.port || 3000)

let getPort = app.get('port')

let server = app.listen(getPort,()=>{
	let port = server.address().port
	let host = server.address().address
	console.log('服务启动成功  http://%s:%s',host,port)
})

