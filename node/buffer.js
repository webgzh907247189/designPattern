// readFile 读取比较小的文件，文件太大，容易内存泄漏 ，大的文件用流处理

// Buffer 为了node处理 二进制
// Buffer 一旦声明(三种声明方式，1.数组 2. 字符串 3.alloc(size) )，不能随便改变大小 ，Buffer里面存放的是16进制，默认的编码是 utf8，要是使用的编码，需要转换

// 一个汉字 utf8(3个字节)   gbk(2个字节)
// md5 叫 摘要算法，不算加密，因为不能解密
{
    console.log(125 .toString(16)) // 7d
    console.log(parseInt('11111111',2))  // 255
}

// 一个汉字 3个字节 * 8个位 (每个字节8个位)
// base64(只是一种编码) = 4个字节 * 6个位


{
    let r = Buffer.from('吃饭').toString('base64')
    console.log(r) // 5ZCD6aWt

    let str = Buffer.from('吃饭').toString() // .toString('utf8') 省略
    console.log(str) // 吃饭

    // 废弃了  let buf = new Buffer()
    let buf = Buffer.alloc(6) // 6个字节大小的buffer

    let buf1 = Buffer.from([0x16]) // 16进制的声明
    let buf2 = Buffer.from([22])  // 10进制的声明
    console.log(buf,buf1,buf2)
}

{
    // base 64 的表示
    let base64 = 'abcdefjhijklmnopqrstuvwxyz'
    base64 += base64.toUpperCase()
    base64 += '0123456789+/'
}

{
    // 0.1+ 0.2 != 0.3
    // js 双精度浮点 54位
    
    // 如何把小数转为二进制 (乘2取整法)
    0.1 * 2 = 0.2  0
    0.2 * 2 = 0.4  0
    0.4 * 2 = 0.8  0
    0.8 * 2 = 1.6  1
    0.6 * 2 = 1.2  1
    0.2 * 2 = 0.4  0
    // 结果 -> 0.0001100110011

    // 0.1 转为二进制 0.0001100110011001100110011001100110011001100110011001101  四舍五入了，大于 0.1
    // 0.2 转为二进制 0.001100110011001100110011001100110011001100110011001101   四舍五入了，大于 0.2
}





{
    let buf1 = Buffer.from('吃饭')
    let buf2 = buf1.slice(0,3)
    console.log(buf1.toString(),buf2.toString())
}

{
    let buf1 = Buffer.from('吃')
    let buf2 = Buffer.from('饭')
    let buf3 = Buffer.alloc(6)

    //targetBuffer, targetStart, sourceStart, sourceEnd
    // buf1.copy(buf3,0,0,3) //与下面但同等
    buf1.copy(buf3)

    buf2.copy(buf3,buf1.length)
    console.log(buf3.toString())


    // 多个buffer的拼接 (参数二 -> 合并后 buf 中的 Buffer 实例的总长度)
    let result = Buffer.concat([buf1,buf2],6)
    console.log(result.toString())


    let r = result.indexOf('饭')
    console.log(r) // 3
}

{
    let buf1 = Buffer.from('我吃饭我睡觉我喝水我')
    Buffer.prototype.split = function(str){
        let list = []
        let index = 0
        let strBuffer = Buffer.from(str)
        let strLength = strBuffer.length

        let offerSet = this.indexOf(strBuffer)

        while(offerSet != -1){
            let r = this.slice(index,offerSet)
            list.push(r)

            index = offerSet + strLength
            offerSet = this.indexOf(strBuffer,index)
        }        
        list.push(this.slice(index))

        // buffer 使用 foreach 遍历
        list.forEach((item)=>{
            console.log(item.toString())
        })
        
        return Buffer.concat(list)
    }
    console.log(buf1.split('我').toString())
}

















// fs的写 -> 文件不存在会创建文件；写的时候，会清空文件，在写。


let path = require('path')
let fs = require('fs')
// r 读取
// w 写入
// a 追加
// r+ 可读可写  读为主，文件不存在，报错误  ->  非清空写
// w+ 可写可读  写为主，文件不存在，正常创建 -> 清空写
// fd 文件描述符
// 0o666 2 读取 4 写入 1执行 (438 -> 0o666 转为10进制) 

let buf = Buffer.alloc(21)
fs.open(path.resolve(__dirname,'testRead.txt'),'r',0o666,(err,fd)=>{
    console.log(fd) //文件描述符
    // fd: 文件描述符, buffer: 要读取到哪个buffer中, offset: 从buffer哪个位置开始, 
    // length: 向buffer写入多少个, position: 从文件哪个位置开始读取

    fs.read(fd,buf,0,6,0,(err,bytesRead)=>{
        console.log(bytesRead,buf)
        fs.close(fd,()=>{
            console.log('文件关闭成功')
        })
    })
})