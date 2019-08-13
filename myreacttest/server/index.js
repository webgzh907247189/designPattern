let express = require('express')

// import React from 'react'
import MyCtx from '../src/myContext'
import {renderToString} from 'react-dom/server'

let app = express()
app.get('/',function(req,res){
    let html = renderToString(<MyCtx/>)
    res.send(`
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <title>React App</title>
        </head>
        <body>
            <div id="root">${html}</div>
        </body>
        </html>
    `)
})

app.listen(3000,function(){
    console.log('ssr starting')
})


/**
 * webpack-cli 是 webpack的核心代码
 * babel-loader 转译   具体的转换操作(babel-core 编译的环境)，真正的转换靠 babel-preset-env(预设 es6+ 转成es5)
 * 
 * ssr中没有 window，没有dom，但是存在 fs这些node原生模块
 */