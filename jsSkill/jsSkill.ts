/**
 *  Symbol 不能直接 和字符串 相加    得到字符串
 *  https://juejin.im/post/5c8085d5e51d4542176d1322
 * 
 * tsconfig.json  的  target 为 es5 会报错
 */
import "reflect-metadata";
{
	let sym = Symbol.for('aa')
	let result = (sym as any)+ ''
	console.log(result) //error
}
{
    let sym = Symbol('aa')
	let result = sym.toString() + ''
	console.log(result) //'aa'
}
{
    let sym = Symbol('aa')
	let result = String(sym) + ''
	console.log(result) //'aa'
}



{
    let sym = Symbol('aa')
    let val1 = (sym as any).description

    let sym2 = Symbol.for('aa')
    let val2 = Symbol.keyFor(sym2)
    let val3 = (sym2 as any).description
    console.log(val1 === val2, val1, val3)
    // true  "aa"  "aa"  "aa"
}





/**
 * Reflect 和 Proxy
 * https://juejin.im/post/5c7e6857e51d4542194f8c6f
 * https://juejin.im/post/5c204ce36fb9a049d975363d
 */
{
    function A(name){
        this.name = name
    }

    let a = new A('test')
    let b = Reflect.construct(A,['zzz'])
    console.log(a,b)
    // {name: "test"} , {name: "zzz"}
}