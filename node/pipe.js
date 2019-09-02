let fs = require('fs')
let path = require('path')

let rs = fs.createReadStream(path.resolve(__dirname,'./testRead.txt'),{highWaterMark: 3})

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