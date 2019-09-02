let http = require('http')
let queryString = require('querystring')
let crypto = require('crypto')
let uuid = require('uuid')

/**
 * session 重启服务状态丢失
 */
let session = {}
let session_name = 'shop'
// httpOnly 如果为true 不能通过浏览器获取到cookie
http.createServer((req,res)=>{
    let cookieObj = queryString.parse(req.headers['cookie'],'; ')
    let cardId = cookieObj[session_name]

    if(cardId && session[cardId]){
        session[cardId].mny -= 10
        res.setHeader('content-type','text/html;charset=utf8;')
        res.end(`卡还有${session[cardId].mny}钱`)
    }else{
        let cardId = uuid.v4()
        session[cardId] = {
            mny: 100
        }
        res.setHeader('Set-cookie',`${session_name}=${cardId}`)
        res.setHeader('content-type','text/html;charset=utf8;')
        res.end(`卡还有${session[cardId].mny}钱`)
    }

}).listen(3001,()=>{
    console.log('session server starting')
})