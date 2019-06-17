function observable(obj,handle){
    if(typeof obj !== 'object') return obj
    
    // 从后往前实现代理
    Object.keys(obj).forEach((item)=>{
        obj[item] = observable(obj[item],handle)
    })
    return new Proxy(obj,handle())
}

function handle(){
    return {
        get(target,key,value){
            return Reflect.get(target,key)
        },
        set(){
            return Reflect.set(target,key,value)
        }
    }
}


let obj = {name: '111',sex: {title: 'nan'}}

let proxyObj = observable(obj,handle)
console.log(proxyObj)