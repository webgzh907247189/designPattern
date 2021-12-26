let fs = require('fs')
let path = require('path')
let iconv = require('iconv-lite')

let rs = fs.createReadStream(path.resolve(__dirname,'./testRead.txt'),{highWaterMark: 3})
// 防止解析出现乱码错误
// rs.setEncoding('utf8')

let ws = fs.createWriteStream(path.resolve(__dirname,'./pipe.txt'),{highWaterMark: 1})

// rs.on('data',(d)=>{
//     let flag = ws.write(d)
//     if(!flag){
//         rs.pause()
//     }
// })

// ws.on('drain',()=>{
//     console.log('写入成功')
//     rs.resume()
// })

rs.pipe(ws)




let rs1 = fs.createReadStream(path.resolve(__dirname,'./shici.txt'),{highWaterMark: 11})
// 防止解析出现乱码错误 可解决大部分编码问题，但不是从根本上解决问题
rs1.setEncoding('utf8')
let data = ''
rs1.on('data',(chunk)=>{
    data += chunk
})

rs1.on('end',()=>{
    console.log(data)
})




let rs2 = fs.createReadStream(path.resolve(__dirname,'./shici.txt'),{highWaterMark: 11})
let dataList = []
rs2.on('data',(chunk)=>{
    dataList.push(chunk)
})

rs2.on('end',()=>{
    let buf = Buffer.concat(dataList)
    let str = iconv.decode(buf,'utf8') //编码支持包
    console.log(buf.toString(), '111',str)
})