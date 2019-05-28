const Koa = require('koa');
const app = new Koa();
const xlsx = require('node-xlsx');
const fs = require('fs');

// 数据源
const obj = xlsx.parse("./" + "result.xlsx");


const sheetData = obj[0].data
const sheetDataLength = sheetData[1].length


let list = []
let result = []
let resultList = []


sheetData.forEach(element => {
    list = list.concat(element)
})

list.forEach((item)=>{
    let flag = result.find( key => item === key)
    if(flag){
        result.push('')
    }else{
        result.push(item)
    }
})


let len = result.length
let lineNum = len % sheetDataLength  === 0 ? len / sheetDataLength : Math.floor( (len / sheetDataLength) + 1 );
for (let i = 0; i < lineNum; i++) {
    let temp = result.slice(i*sheetDataLength, i*sheetDataLength+sheetDataLength);
    resultList.push(temp);
}

let data = [
    {
        name : 'sheetxxx',
        data: resultList
    }
]
// console.log(data);

var buffer = xlsx.build(data);
fs.writeFile('./test.xls', buffer, function (err){
    console.log(err)
})

app.listen(3001,()=>{
	console.log('服务启动成功')
});