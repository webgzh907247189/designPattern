let express = require('express')

// Vdom 需要react，因为是依赖 React.createElement()
import React from 'react' 
import SsrTest from '../src/ssr/test'
import {renderToString} from 'react-dom/server'

let app = express()
app.use(express.static('static'))
app.get('/',function(req,res){
    let html = renderToString(<SsrTest/>)

    res.send(`
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <title>React App</title>
        </head>
        <body>
            <div id="root">${html}</div>
            <script src="indexssr.js"></script>
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
 * 
 * ssr 
 * 服务器端运行代码产生html
 * 服务端把html发送给浏览器
 * 浏览器收到html，渲染
 * 浏览器引入js下载  还是需要依赖js 绑定事件，绑定事件只有在浏览器进行
 * 执行已经下载的js
 * 浏览器的代码接管页面，后面与浏览器渲染是一样的
 */