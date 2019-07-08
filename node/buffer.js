// Buffer 为了node处理 二进制
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