let express = require('express')
let cors = require('cors')
let app = express()

app.use(cors({
    origin: `http://localhost:3000`
}))
let json = [{name: '接口获取数据1',id: 1},{name: '接口获取数据2',id: 2}]
app.get('/',function(req,res){
    res.json(json)
})

app.listen(4000,function(){
    console.log('json starting')
})