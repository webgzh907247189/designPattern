const Koa = require('koa');
const app = new Koa();
var xlsx = require('node-xlsx');
var fs = require('fs');

app.use(async (ctx,next) => {
    console.log('test  before')
    console.log('test  end')
})



var obj = xlsx.parse("./" + "result.xlsx");
var o = obj[0].data
console.log(JSON.stringify(o));

app.listen(3001,()=>{
	console.log('服务启动成功')
});