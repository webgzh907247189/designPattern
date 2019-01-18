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
        result[code] = result[code] ||{}
        result[code][lan] = item
        return result
    }
    console.log(obj)
 }



 