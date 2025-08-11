const obj = {
    name: '11',
    get aliseName(){
        return this.name + '??'
    }
}

// console.log(obj.aliseName)


const proxyObj = new Proxy(obj, {
    // receiver 是代理对象
    get(target, key, receiver){
        // console.log(key) 

        // 这样写 每次都从 代理对象上取
        return Reflect.get(target, key, receiver)


        // 直接这样写只会取 一个 key   ->  [aliseName]
        // 因为 target 是 obj， 直接向 obj 取值 name (相当于访问了 obj.name),  此时没有触发 proxy 的 get (因为 直接 从 obj 上面 取值了，没有触发 proxy 之后的 proxyObj)
        // return target[key]
    }
})


console.log(proxyObj.aliseName)