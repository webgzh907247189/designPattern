let http = require('http')
let queryString = require('querystring')
let crypto = require('crypto')

function generator(value){
    return crypto.createHmac('sha256','test').update(value+ '').digest('base64').replace(/[+=\/]/g,'')
}

// httpOnly 如果为true 不能通过浏览器获取到cookie
http.createServer((req,res)=>{
    res.cookie = {
        _arr: [],
        set(key,value,options={}){
            let arr = []
            if(options.signed){
                value = value + '.' + generator(value)
            }
            arr.push(`${key}=${value}`)
            if(options.domain){
                arr.push(`domain=${options.domain}`)
            }
            if(options.maxAge){
                arr.push(`max-age=${options.maxAge}`)
            }
            if(options.path){
                arr.push(`path=${options.path}`)
            }
            if(options.httpOnly){
                arr.push(`httpOnly=${options.httpOnly}`)
            }
            let str = arr.join('; ')
            this._arr.push(str)
            res.setHeader('Set-Cookie',this._arr)
        },
        get(key,options){
            let cookies = queryString.parse(req.headers['cookie'],'; ')
            if(options){
                if(!cookies[key]){
                    return ''
                }else{
                    let [oldvalue,signed] = cookies[key].split('.')
                    if(generator(oldvalue) === signed){
                        return oldvalue
                    }
                    return ''
                }
            }else{
                return cookies[key] || ''
            }
        }
    }

    if(req.url == '/r/write'){
        // res.setHeader('Set-Cookie',['name=1; domain=localhost; path=/; httpOnly=false; max-age=600'])
        // res.setHeader('Set-Cookie',['sex=1; domain=localhost; path=/; httpOnly=false; max-age=600'])

        res.cookie.set('name','name',{domain: 'localhost',path: '/',httpOnly: true,'maxAge': 600})
        res.cookie.set('sex','sex',{domain: 'localhost',path: '/',httpOnly: false,'maxAge': 600})
        res.end('ok')
    }
    if(req.url == '/r/read'){
        // res.end(JSON.stringify(queryString.parse(req.headers['cookie'],'; ')))

        res.end(res.cookie.get('name') + res.cookie.get('sex'))
    }

    if(req.url == '/visit'){
        let count
        if(res.cookie.get('visit',{signed: true})){
            count = 1 + res.cookie.get('visit',{signed: true})*1
        }else{
            count = 1
        }
        res.cookie.set('visit',count,{signed: true})

        res.setHeader('content-type','text/html;charset=utf8;')
        res.end(`第${count}个访问者`)
    }
}).listen(3001,()=>{
    console.log('cookie server starting')
})