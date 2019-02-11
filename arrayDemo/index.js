/**
 * https://juejin.im/post/5c4061cb51882525e90ddd65
 */
var arr = ['codeZh', 'codeCn', 'taobao.cn', 'taobao.com'];

{
    let obj = arr.reduce((result,item)=>{
        if(item.includes('code')){
            getObj(result,item,'code')
        }else{
            getObj(result,item,'taobao')
        }
        return result
    },Object.create(null))
    
    function stringsplit(str,key){
        return [key,str.replace(key,'')]
    }
    
    function getObj(result,item,key){
        let [code,lan] = stringsplit(item,key)
        result[code] = result[code] || {}
        result[code][lan] = item
        return result
    }
    console.log(obj)
}

/**
 * {
        "code": {
            "Zh": "codeZh",
            "Cn": "codeCn"
        },
        "taobao": {
            ".cn": "taobao.cn",
            ".com": "taobao.com"
        }
    }
*/








{
    const list = ['codeZh', 'codeCn', 'taobao.cn', 'taobao.com']
    const result = list.reduce((map, item) => {
        const [head, tail] = item.split(/(?=[A-Z]|\.)/)  // ? 匹配表达式零次或一次
        map[head] = map[head] || {}
        map[head][tail] = item
        return map
    }, {})
    console.log(result)
}



{
    const result = {} 
    const list = ['codeZh', 'codeCn', 'taobao.cn', 'taobao.com'] 
    list.join().replace(/([a-z]+)([A-Z\.][a-z]+)/g, (m, c0, c1) => { 
        result[c0] = result[c0] || {} 
        result[c0][c1] = m 
    }) 
    console.log(result)
}