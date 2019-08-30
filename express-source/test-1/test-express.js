const express = require('./index')

let app = express()

app.get('/',(req,res)=>{
    res.end('11')
})
app.listen('3000',()=>{
    console.log('server start...')
})