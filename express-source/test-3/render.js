/**
 * stack 是一个数组，可以理解为栈
 * 每一层都是layout层
 * 每一层又是一个数组，分为多层(最少两层，一个path，一个handler)
 * 
 * express 内置的中间件 路由中间件 错误处理中间件，静态资源服务中间件, 处理query，req.url的中间件
 */

const express = require('./lib/index')
const path = require('path')

let app = express()
app.set('views', path.resolve(__dirname,'view'))
app.set('view engine', 'html')
app.engine('.html',require('ejs').__express)

app.use((req,res,next)=>{
    res.render = function(name,options){
        let ext = app.get('view engine').includes('.') ? app.get('view engine') : `.${app.get('view engine')}`
        name = name.includes('.') ? name : `${name}${ext}`

        let filePath = path.join(app.get('views'),name)
        let render = app.engines[ext]

        render(filePath,options,done)

        function done(err,html){
            res.setHeader('content-type','text/html')
            res.end(html)
        }
    }
    next()
})


// 路劲分组
// restful get/useer post/user put/user delete/user
app.get('/',(req,res,next)=>{
    res.render('index',{title: 'test',options: {age: 10}})
})



app.listen('3000',()=>{
    console.log('server start render...')
})



{
    let str = 'hello <%=title%>  <%=age%> test'
    let obj = {title: '1',age: 10}

    function render1(str,obj){
        return str.replace(/<%=(\w+?)%>/g,function(){
            console.log(arguments[1])
            return obj[arguments[1]]
        })
    }

    let result = render1(str,obj)
    console.log(result) //hello 1  10 test
}



{
    let sbody = '<%= test.name %>'
    let str = `
        let s = ''
        with(obj){
            if(name){
                s += 'true' + `

    let strFooter = `
            }else{
                s += 'false'
            }
        }
        return s
    `

    str = str + sbody.replace(/<%=([\s\S]+?)%>/g,function(){
        return arguments[1]
    }) + strFooter

    let obj = {name: '1',age: '2',test: {name: '1'}}

    let fn = new Function('obj',str)
    let result = fn(obj)
    console.log(result)  //true1
}