let express = require('express')
let bodyParseer = require('body-parser')
let cors = require('cors')
let session = require('express-session')
let app = express()


app.use(bodyParseer.urlencoded({extended: true}))
app.use(bodyParseer.json())
app.use(session({
    secret: 'ssr',
    resave: true,
    saveUninitialized: true
}))

app.use(cors({
    origin: `http://localhost:3000`
}))

let json = [{name: '接口获取数据1',id: 1},{name: '接口获取数据2',id: 2}]
app.get('/api',function(req,res){
    res.json(json)
})

app.post('/api/login',function(req,res){
    let user = req.body
    req.session.user = user
    res.json({
        code: 0,
        data: {
            user,
            success: '登陆成功'
        }
    })
})

app.get('/api/logout',function(req,res){
    req.session.user = null
    res.json({
        code: 0,
        data: {
            user: null,
            success: '退出成功'
        }
    })
})

app.post('/api/users',function(req,res){
    let user = req.session.user
    let json = {}

    if(user){
        json = {
            code: 0,
            data: {
                user,
                success: '获取用户信息成功'
            }
        }
    }else{
        json = {
            code: 1,
            data: {
                success: '用户未登陆'
            }
        }
    }
    res.json(json)
})

app.listen(4000,function(){
    console.log('json starting')
})