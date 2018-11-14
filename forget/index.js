{
    function a(){
        // let arr = Array.from(arguments)       
        let arr = [...arguments]
        // let arr = Array.prototype.splice.call(arguments)
        
        return arr.flat()
    
    }
    a(['1'],['2'],['3'])    
}


{
    function a(){
        // let arr = Array.from(arguments)       
        let arr = [...arguments]
        // let arr = Array.prototype.splice.call(arguments)
        
        return arr.reduce((result,item)=>{
            return result.concat(item)
        },[])
    
    }
    a(['1'],['2'],['3'])    
}


{
    // （1）for...in
    // for...in循环遍历对象自身的和继承的可枚举属性（不含 Symbol 属性）。


    // （2）Object.keys(obj)
    // Object.keys返回一个数组，包括对象自身的（不含继承的）所有可枚举属性（不含 Symbol 属性）的键名。


    // （3）Object.getOwnPropertyNames(obj)
    // Object.getOwnPropertyNames返回一个数组，包含对象自身的所有属性（不含 Symbol 属性，但是包括不可枚举属性）的键名。


    // （4）Object.getOwnPropertySymbols(obj)
    // Object.getOwnPropertySymbols返回一个数组，包含对象自身的所有 Symbol 属性的键名。


    // （5）Reflect.ownKeys(obj)
    // Reflect.ownKeys返回一个数组，包含对象自身的所有键名，不管键名是 Symbol 或字符串，也不管是否可枚举。


    // 以上的 5 种方法遍历对象的键名，都遵守同样的属性遍历的次序规则。
    // 首先遍历所有数值键，按照数值升序排列。
    // 其次遍历所有字符串键，按照加入时间升序排列。
    // 最后遍历所有 Symbol 键，按照加入时间升序排列。


    // Reflect.ownKeys方法用于返回对象的所有属性，基本等同于Object.getOwnPropertyNames与Object.getOwnPropertySymbols之和。
}


{
    // 引入模块 的方式

    import a,{b} from './c'

    export let b
    export default a
}