/**
 * 可读流  ReadStream 继承了 Readable 接口
 * ReadStream => this.read() 调用的是父类的read()
 * 
 * Readable 调用子类的 ReadStream 的_read()
 * 子类调用父类的push方法，把数据放进去，内容会自动读取且发射出来
 */

 let {Readable,Writable,Duplex,Transform} = require('stream')
 let fs = require('fs')
 let path = require('path')
 let fsPromise = fs.promises

 class MyStream extends Readable{
     _read(){
         let data = fs.readFileSync(path.resolve(__dirname,'./pipe.txt'),'utf8')
         this.push(data)
         this.push(null) //数据push完成，push null 了
     }
 }

 let myStream = new MyStream()

 myStream.on('data',(data)=>{
    // buffer
    console.log(data.toString())
 })
 myStream.on('end',()=>{
    console.log('end')
})




/**
 * 可写流会继承 Writable 的 write()
 * write() 触发子类的 _write()
 */
class MyWritable extends Writable{
    _write(data,encoding,clearBuffer){
        // 写入的时候，写入完成清空内存
        fs.appendFileSync(path.resolve(__dirname,'./pipe.txt'),data)
        clearBuffer()
    }
}

let myWritable = new MyWritable()
myWritable.write('123')
myWritable.write('456')
myWritable.write('789')



//双工流
class MyDuplex extends Duplex{
    _write(data,encoding,clearBuffer){
        console.log(data)
        clearBuffer()
    }

    _read(){
        this.push('1234')
        this.push(null)
    }
}
let myDuplex = new MyDuplex()
myDuplex.on('data',()=>{

})
myDuplex.write('111')



// 转化流
process.stdout.write('hello')

// 输入cli
// process.stdin.on('data',(data)=>{
//     console.log(data.toString())
// })
// process.stdin.pipe(process.stdout)



class MyTransform extends Transform{
    _transform(data,encoding,clearBuffer){
        this.push(data.toString().toUpperCase())
        clearBuffer()
    }
}
process.stdin.pipe(new MyTransform).pipe(process.stdout)

// md5 是摘要算法因为无法解密
// 加密算法 可以解密