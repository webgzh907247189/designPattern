import { observe } from './index'
// 拦截用户调用的数组方法
// push pop unshift shift sort splice reverse

// 之所以有上面的这些方法，因为这些方法会改变数组的长度 -> concat 不在范围内，因为不改变原数组

let oldArrayProtoMethods = Array.prototype
// 不能直接修改原型上面的方法，不然Array都被改了

// 拷贝的新的对象，可以找到数组的方法
let arrayMethods = Object.create(oldArrayProtoMethods)

let methods = [
    'push',
    'pop',
    'unshift',
    'shift',
    'sort',
    'splice',
    'reverse'
]

// vm.$set 内部调用的是 splice 方法
// 因为 依赖收集很耗费性能，所以有时候可以使用 frezz方法，冻结

// 可以对数组进行监控，但是性能消耗大，没这样做
methods.forEach((method) => {
    arrayMethods[method] = function(...args){
        // Array.prototype.push -> this ->  Array.prototype
        const result = oldArrayProtoMethods[method].apply(this,args)

        let inserted;
        switch (method){
            case 'push':
            case 'unshift':
                inserted = args
            case 'splice':
                // 获取新增的那一项
                inserted = args.slice(2) // [].splice(1,2,'xxx')
            default:
                break;
        }

        if(inserted){
            observableArray(inserted)
        }
        // console.log(this.__ob__.dep)
        this.__ob__.dep.notify() // 通知试图更新
        return result;
    }
})

// 对数组新增的每一项进行观测
function observableArray(data){
    for(let i=0; i< data.length; i++){
        observe(data[i])
    }
}

function dependArray(data){
    for(let i=0; i< data.length; i++){
        const item = data[i];
        item.__ob__ && item.__ob__.dep.depend();

        if(Array.isArray(item)){
            // 循环绑定依赖
            dependArray(item)
        }
    }
}
export { arrayMethods, observableArray, dependArray }