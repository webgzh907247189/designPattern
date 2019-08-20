let express = require('express')

// Vdom 需要react，因为是依赖 React.createElement()
import React from 'react' 
import {StaticRouter,Route,matchPath} from 'react-router-dom'
import {renderToString,renderToNodeStream} from 'react-dom/server'
import {renderRoutes,matchRoutes} from 'react-router-config'
import {Provider} from 'react-redux'
import proxy from 'express-http-proxy'
import routers from './router'
import Header from '../src/ssr/header'
import {getServerStore} from '../src/store'

let app = express()

app.use(express.static('static'))

app.use('/api',proxy('http://localhost:4000',{
    proxyReqPathResolver(req){
        return `/api${req.url}`
    }
}))

app.get('*',function(req,res){
    // 收集组件的样式
    let context = {name: '11',csses: []}
    let store = getServerStore(req)

    // let matchRouters = routers.filter(router => matchPath(req.path,router))
    let matchRouters = matchRoutes(routers,req.path)

    console.log(matchRouters,'matchRouters')
    let getData = matchRouters.reduce((result,item)=>{
        // console.log(item.route,'itemitemitem')
        if(item.route.loadData){
            // result.push(item.route.loadData(store))

            // 保证每个promise已经是成功状态，promise.all 一定会成功
            result.push(new Promise((resolve,reject)=>{
                return item.route.loadData(store).then(resolve,resolve)
            }))
        }
        return result
    },[])

    // console.log(getData,'getDatagetDatagetData')

    Promise.all(getData).then((resultList)=>{
        let html = renderToNodeStream(
            <Provider store={store}>
                <StaticRouter context={ context } location={req.path}>
                    {/* <Header/> */}
                    {/* {
                        routers.map(router => (
                            <Route {...router}/>
                        ))
                    } */}

                    {
                        renderRoutes(routers)
                    }
                </StaticRouter>
            </Provider>
        )

        // render 之后在拿css，放前面拿不到
        let cssStr = context.csses.join('\n')
        
        // console.log(context.url)
        if(context.action == 'REPLACE'){
            //不写的话，可以跳转，但是没有302 状态码
            res.redirect(302,context.url)
            
            // 与上面的差别是？
            // res.statusCode = 302

        // 配合 NotFound 组件
        }else if(context.notFound){
            res.statusCode = 404
        }

        res.write(`
            <!DOCTYPE html>
            <meta charset="utf-8">
            <html lang="en">
            <head>
                <title>React App</title>
            </head>
            <style>${cssStr}</style>
            <body>
                <script>
                    window.context = {
                        state: ${JSON.stringify(store.getState())}
                    }
                </script>
                <div id="root">
        `)

        // end表示节点流还没有结束
        html.pipe(res, { end: false })
        // 监听事件结束后 把剩下的流推过去
        html.on('end', _ => {
            res.write(`</div>
                        <script src="indexssr.js"></script>
                    </body>
                    </html>`)
            res.end()
        })
    })
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
 * 
 * react-router-dom 三种路由  StaticRouter ，BrowserRouter， HashRouter
 */