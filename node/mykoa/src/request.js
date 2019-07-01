let url = require('url')

let request = {
    get method(){
        // ctx.request.method  this 指向 ctx.request 
        return this.req.method
    },
    get path (){
        return url.parse(this.req.url,true).pathname
    }
}

module.exports = request