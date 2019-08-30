const express = require('express')

let app = express()

// 路劲分组
// restful get/useer post/user put/user delete/user
app.get('/',(req,res,next)=>{
    console.log('1')
    next()
},(req,res,next)=>{
    console.log('2')
    next()
})
.get('/',(req,res,next)=>{
    console.log('3')
    next()
})
.get('/',(req,res,next)=>{
    console.log('4')
    res.end('ok')
},)

app.listen('3000',()=>{
    console.log('server start...')
})