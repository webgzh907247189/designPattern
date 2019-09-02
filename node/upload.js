const Koa = require('koa')
const path = require('path')
const mime = require('mime')
const queryString = require('querystring')
const uuid = require('uuid')

const fs = require('fs')
const fsPromises = fs.promises

let app = new Koa()

// const serve = require('koa-static');
// app.use(serve(__dirname));

app.use(static('./view'))
// .use(bodyParse())
.use(betterParse({
    uploadDor: path.resolve(__dirname, 'img')
}))
.use((ctx,next)=>{
    console.log(ctx.req.method,ctx.path)
    if(ctx.method.toLocaleLowerCase() === 'post' && ctx.path === '/form'){
        let queryObj = ctx.request.body
        ctx.body = ctx.request.fields
    }else{
        ctx.body = ctx.request.fields
    }
})

app.listen(3001,()=>{
    console.log('upload koa 3001')
})


Buffer.prototype.split = function(sep){
    let arr = []
    let len = Buffer.from(sep).length
    let offSet = 0
    let current
    while (-1 !== (current = this.indexOf(sep,offSet))) {
        arr.push(this.slice(offSet,current))
        offSet = current + len
    }
    arr.push(this.slice(offSet))
    return arr
}
function betterParse({uploadDor}){
    return async function(ctx,next){
        await new Promise((resolve,reject)=>{
            let arr = []
            ctx.req.on('data',(data)=>{
                arr.push(data)
            })

            ctx.req.on('end',()=>{
                let contentType = ctx.get('Content-Type')
                if(contentType.includes('multipart/form-data')){

                    let boundary = '--' + contentType.split('=')[1]
                    let buffer = Buffer.concat(arr)

                    let lines = buffer.split(boundary).slice(1,-1)
                    ctx.request.fields = {}
                    lines.forEach((line)=>{
                        let [head,body] = line.split('\r\n\r\n')
                        head = head.toString()
                        let key = head.match(/name="([\s\S]+?)"/)[1]
                        
                        if(head.includes('filename')){
                            let content = line.slice(head.length+4,-2)
                            let filename = uuid.v4()
                            let pathName = path.join(uploadDor,filename)
                            fs.writeFileSync(pathName,content)

                            if(ctx.request.fields[key]){
                                ctx.request.fields[key].push({
                                    size: content.length,
                                    path: pathName
                                })
                            }else{
                                ctx.request.fields[key] = [{
                                    size: content.length,
                                    path: pathName
                                }]
                            }
                        }else{
                            let value = body.toString().slice(0,-2)
                            ctx.request.fields[key] = value
                        }
                    })
                }

                resolve()
            })
        })
        await next()
    }
}
function static(pathName){
    return async function(ctx,next){
        let requestPath = path.join(pathName,ctx.path)
        try{
            let stat = await fsPromises.stat(requestPath)
            if(!stat.isFile()){
                requestPath = path.join(requestPath,'index.html')
            }
            ctx.set('Content-type',`${mime.getType(requestPath)};charset=utf-8;`)
            ctx.body = fs.createReadStream(requestPath)
        }catch{
            await next()
        }
    }
}

function bodyParse(){
    return async function(ctx,next){
        await new Promise((resolve,reject)=>{
            
            let arr = []
            ctx.req.on('data',(data)=>{
                arr.push(data)
            })
            ctx.req.on('end',()=>{
                ctx.request.body = {}

                if(ctx.get('Content-type') === 'application/x-www-form-urlencoded'){
                    ctx.request.body =  queryString.parse(arr.toString())
                }
                resolve()
            })
        })
        await next()
    }
}