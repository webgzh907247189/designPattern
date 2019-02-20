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























/**
 * arguments对象，可以拿到全部实参
 * 
 * FunctionName.length 函数的形参个数
 */

{
    function myFunction(a, b) {
        console.log(arguments,myFunction.length);  // Arguments[1, 2, 3, 4, 5], 2
        const args = Array.prototype.slice.call(arguments, myFunction.length);
        console.log(args);   //[3, 4, 5]
    }
    myFunction(1, 2, 3, 4, 5); //[3, 4, 5]
}


// optional chaining还不是官方标准的一部分，但它是个stage-1的实验性功能。需要在babelrc中加入@babel/plugin-proposal-optional-chaining来启用它
// let data = {name:{sex}}
// let val = data?.name?.sex