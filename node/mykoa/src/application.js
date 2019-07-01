const Event = require('events')
const http = require('http')
const compose = require('./compose')
const request = require('./request')
const response = require('./response')
const context = require('./context')
const stream = require('stream')


class Application extends Event{
    constructor(){
        super()
        this.middlewares = []
        this.context = Object.create(context)
        this.request = Object.create(request)
        this.response = Object.create(response)
    }

    use(fn){
        this.middlewares.push(fn)
        return this
    }

    createContext(req,res){
        let ctx = this.context
        ctx.request = this.request
        ctx.response = this.response

        ctx.req = ctx.request.req  = req
        ctx.res = ctx.response.res = res

        ctx.state = {}
        return ctx
    }

    callback(){
        let fn = compose(this.middlewares)
        return (req,res) => {
            const ctx = this.createContext(req,res)
            return this.handleRquest(ctx,fn)
        }
    }

    handleRquest(ctx,middlewaresFn){
        let res = ctx.res
        res.statusCode = 404

        // handleResponse = () => respond(ctx)
        return middlewaresFn(ctx).then(()=>{

            if(!ctx.body){
                return res.end('Not Found')
            }
            
            if(stream.prototype.isPrototypeOf(ctx.body)){
                res.setHeader('Content-type','application/octet-stream')
                res.setHeader('Content-Disposition',`attachment;filename=${encodeURIComponent('下载')}`)
                
                return ctx.body.pipe(res)
            }

            if(typeof ctx.body == 'object'){
                res.setHeader('Content-type','application/json')
                return res.end(JSON.stringify(res.body))
            }
            res.end(ctx.body)
        }).catch((err)=>{
            this.emit('error',err,ctx)
        })
    }

    onError(err,ctx){
        // promise error
        console.log(err)
        this.emit('error',err,ctx)
    }

    listen(...args){
        http.createServer(this.callback()).listen(...args)
    }
}

function respond(ctx){
    res.end()
}

module.exports = Application