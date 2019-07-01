const Event = require('events')
const http = require('http')
const compose = require('./compose')
const request = require('./request')
const response = require('./response')
const context = require('./context')

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
        let s = middlewaresFn(ctx)
        // handleResponse = () => respond(ctx)
        // console.log(s)
        return s.then(()=>{
            ctx.res.end('123213')
            ctx.body = 'zzzz'
        }).catch(this.onError)
    }

    onError(err){
        // promise error
        console.log(err)
    }

    listen(...args){
        http.createServer(this.callback()).listen(...args)
    }
}

function respond(ctx){
    res.end()
}

module.exports = Application