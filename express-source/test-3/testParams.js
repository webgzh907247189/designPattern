/**
 * stack 是一个数组，可以理解为栈
 * 每一层都是layout层
 * 每一层又是一个数组，分为多层(最少两层，一个path，一个handler)
 */

const express = require('express')

let app = express()
app.param('id',(req,res,next)=>{
    req.user = {name: 'test1'}
    next()
})
app.param('id',(req,res,next)=>{
    req.user.name = '通过param 修改了req.user'
    next()
})

app.use((req,res,next)=>{
    console.log('middlerare...')
    next()
})

// 路劲分组
// restful get/useer post/user put/user delete/user
app.get('/',(req,res,next)=>{
    console.log('1')
    next()
},(req,res,next)=>{
    console.log('2')
    next()
})
.get('/user/:id',(req,res,next)=>{
    console.log('3')
    res.setHeader('content-Type','application/json;utf-8')
    res.end(JSON.stringify(req.user))
})
.get('/',(req,res,next)=>{
    console.log('4')
    res.end('ok')
})
.post('/',(req,res,next)=>{
    console.log('5')
    res.end('ok')
})



app.listen('3000',()=>{
    console.log('server start...')
})