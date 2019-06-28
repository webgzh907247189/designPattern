const Event = require('events')
const http = require('http')
const compose = require('./compose')

class Application extends Event{
    constructor(){
        super()
        this.middlewares = []
    }

    use(fn){
        this.middlewares.push(fn)
        return this
    }

    createContext(req,res){
        return {
            req,
            res
        }
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