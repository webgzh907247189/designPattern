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




{
    const getTypeFn = (type) => {
        return (target) => {
            return Object.prototype.toString.call(target) === `[object ${type}]`;
        };
    };
    const isObject = getTypeFn('Object');

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
                const result = Reflect.get(target,key) || '暂无此值'
                return result;
            },
            set(){
                return Reflect.set(target,key,value)
            }
        }
    }

    const obj = {name: '111',sex: {
        home: '',
        age: 'zzz',
        eat: {
            price: '1',
            price1: ''
        }
    }}

    let proxyObj = observable(obj,handle)
    console.log(proxyObj)

    // obj.sex.eat.price1 ->  "暂无此值"
    // obj.sex.eat.price  ->  1
}