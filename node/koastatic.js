const Koa = require('koa')
const path = require('path')
const mime = require('mime')
// const queryString = require('querystring')

const fs = require('fs')
const fsPromises = fs.promises

let app = new Koa()

// const serve = require('koa-static');
// app.use(serve(__dirname));

app.use(static('./view'))
// .use(bodyParse())
.use((ctx,next)=>{
    console.log(ctx.req.method,ctx.path)
    if(ctx.method.toLocaleLowerCase() === 'get' && ctx.path === '/v1/opt/mix/rfq/tradablePairs'){
        let queryObj = ctx.request.body
        console.log('1111',queryObj)
        ctx.body = {name: '111'}
    }else{
        ctx.body = 'static test'
    }
})

app.listen(3001,()=>{
    console.log('static koa 3001')
})


function static(pathName){
    return async (ctx,next) => {
        let requestPath = path.join(pathName,ctx.path)
        console.log(requestPath,'requestPath',ctx.path)
        try{
            let statObj = await fsPromises.stat(requestPath)
            // 不是文件就是目录
            if(!statObj.isFile()){
                requestPath = path.join(requestPath,'index.html')
            }
            ctx.set('Content-type',`${mime.getType(requestPath)};charset=utf-8;`)
            ctx.body = fs.createReadStream(requestPath)
        }catch(e){
            await next() // 编写中间件，无论怎样，先 await next 让后续的中间件正常运行
        }
    }
}

function bodyParse(){
    return async (ctx,next) => {
        await new Promise((resolve,reject)=>{
            let arr = []
            ctx.req.on('data',function(data){
                arr.push(data)
            })
    
            ctx.req.on('end',function(){
                ctx.request.body = {}
                
                if(ctx.get('Content-type') === 'application/x-www-form-urlencoded'){
                    // Buffer.concat(arr).toString()
                    ctx.request.body = queryString.parse(arr.toString())
                }
                resolve()
            })
        })  

        await next()
    }
}