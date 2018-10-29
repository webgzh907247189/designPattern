let express = require('express')
let path = require('path')
let bodyParser = require('body-parser')
let ejs = require('ejs')
let app = express()

app.use(bodyParser.json({type: 'application/json'}))

app.use(express.static(path.resolve(__dirname,'./static')))



app.engine('html', ejs.__express)
app.set('view engine','html')
app.set('views', path.join(__dirname, './view'));

// app.use("*", function(request, response, next) {
//     response.writeHead(200, { "Content-Type": "application/json;charset=utf-8" });
//     next();
// });

app.get('/a',(req,res,next)=>{	
	res.json({messgae: '1232131111123213sadsa12321313213dfff'})
})

app.set('port',process.env.port || 4000)

let getPort = app.get('port')

let server = app.listen(getPort,()=>{
	let port = server.address().port
	let host = server.address().address
	console.log('服务启动成功  http://%s:%s',host,port)
})

