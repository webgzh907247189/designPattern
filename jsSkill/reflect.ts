import "reflect-metadata";

/**
 * Reflect.apply(func, thisArg, args) 方法等同于 Function.prototype.apply.call(func, thisArg, args)，用于绑定this对象后执行给定函数。
 */
function getString(arr: Object[]): string{
    return (Reflect as any).apply(JSON.stringify,null,arr)
}
getString([{name: 'sadsad'}])


// Reflect.apply(JSON.stringify,null, [ [{name: '2132'},{sex: '2132'}] ])   (数组多一个数组包裹)
// "[{"name":"2132"},{"sex":"2132"}]"


{
    let obj: Object = {name: '1',sex: '男'}
    let result: boolean = (Reflect as any).deleteProperty(obj,'name')
    console.log(result)
}