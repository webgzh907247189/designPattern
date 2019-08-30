/**
 * stack 是一个数组，可以理解为栈
 * 每一层都是layout层
 * 每一层又是一个数组，分为多层(最少两层，一个path，一个handler)
 */

const express = require('./lib/index')

let app = express()

app.use((req,res,next)=>{
    console.log('middlerare...')
    next()
})


app.use((req,res,next)=>{
    console.log('warning...')
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
.get('/',(req,res,next)=>{
    console.log('3')
    // 如果中间出错了会把错误交给next，然后跳过后面正常处理函数，交给错误处理中间件处理
    next()
})
.get('/',(req,res,next)=>{
    console.log('4')
    res.end('ok')
})
.post('/',(req,res,next)=>{
    console.log('5')
    res.end('ok')
})



const user = express.Router()
user.use((req,res,next)=>{
    console.log('express.Router middlerare...')
    next()
})

app.use('/user',user)
user.get('/2',(req,res,next)=>{
    res.end('user-ok')
})


app.use((err,req,res,next)=>{
    res.end('catch' + err)
})

app.listen('3000',()=>{
    console.log('server start...')
})