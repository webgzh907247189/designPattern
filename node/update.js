let path = require('path')
let fs = require('fs')

{
    // 扩展名
    console.log(path.extname(path.resolve(__dirname,'./result')),'zz')

    // 非扩展名
    console.log(path.basename(path.resolve(__dirname,'./result.xlsx'),'sx'))

    // 父文件夹
    console.log(path.dirname(__dirname))

    // 判断文件是否存在
    console.log(fs.accessSync(path.resolve(__dirname,'./util.js'))) 
    // 废弃的方法  ->  fs.exists(判断是不是存在)
}

{
    // 加不加 utf-8 || utf8 有影响 影响很大，不加会变成 buffer
    let r = fs.readFileSync(path.resolve(__dirname,'./util.js'),'utf-8')
    console.log(r)
}

/**
 * 文件查找
 * 先找文件，文件找不到找包
 * 包有pakeage.json 按照其 main 对应的来找，没有pakeage.json 先找包里面index.js
 * 
 * 第三方包查找
 * 按照文件夹里面的 node_modules 查找
 */