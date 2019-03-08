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



// Proxy
{
    // apply方法拦截函数的调用、call和apply操作。
    var target = function () { return 'I am the target'; };
    var handler = {
    apply: function () {
        return 'I am the proxy';
    }
    };

    var p = new Proxy(target, handler);

    p()
    // "I am the proxy"
}




{
    // defineProperty方法拦截了Object.defineProperty操作。
    var handler1 = {
        defineProperty (target, key, descriptor) {
          return false;
        }
    };
    var target1: Object = {};
    var proxy = new Proxy(target1, handler1);
    proxy.foo = 'bar' // 不会生效
    // defineProperty 方法返回 false，导致添加新属性总是无效。
      
}

// this指向
{
    const target = new Date();
    const handler = {};
    const proxy = new Proxy(target, handler);

    proxy.getDate();  // error
}

{
    const target = new Date('2015-01-01');
    const handler = {
    get(target, prop) {
        if (prop === 'getDate') {
        return target.getDate.bind(target);
        }
        return Reflect.get(target, prop);
    }
    };
    const proxy = new Proxy(target, handler);

    proxy.getDate() // 1
}