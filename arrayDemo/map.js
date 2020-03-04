{
    console.log(Reflect.apply(Object.prototype.toString, '1', [])); // [object String]
    console.log(Object.prototype.toString.call('1')) // [object String]

    console.log(Math.max.apply(null, [1, 2, 3]))
    console.log(Reflect.apply(Math.max, Math, [1, 2, 3]))
}

{
    console.log(['0'] == false) // true
    // 遇到 == 先把 false 转为 Number(fasle) -> 0
    // ['0'] -> '0' // 通过toString 或者 valueOf 方法
    // '0' -> 0 (转为 Number('0'))
    // 进行比较
}



// map
{
    var a = [1, 2, 3, 4]
    var b = a;
    var c = a.map(() => {
        var s = a.shift()
        return s
    })

    console.log(a, '---', c);
    // [3,4] [1,2,empty * 2]
}

{
    var a = ['a', 'b', 'c', 'd']
    var z = []
    // for(var i=0;i<a.length;i++){
    var s = a.map((item, i) => {
        var f = a.splice(i, 1)
        z.push(f);
        return item
    })
    console.log(a, '--', z, '--', s)
    //['b','d']     [['a'],['c']]     ['a','c',empty * 2]
}




// 节流 (第一个人说了算)
{
    function throttle(time, fn) {
        let start = 0
        return function () {
            let ctx = this
            let end = +new Date()
            if (end - start >= time) {
                fn.apply(ctx, arguments)
                start = end
            }
        }
    }

    let throttleFn = throttle(1000, () => {
        console.log('111')
    })

    throttleFn()
    throttleFn()
}

// 防抖 (最后一个人说了算)
{
    function debounce(time, fn) {
        let timer = null;

        return function () {
            let ctx = this

            if (timer) {
                clearTimeout(timer)
            }

            timer = setTimeout(() => {
                fn.apply(ctx, arguments)
            }, time)
        }
    }

    let debounceFn = debounce(1000, () => {
        console.log('111')
    })

    debounceFn()
    debounceFn()
}

// 借用throttle的思想，实现一个到预定时间无论怎样都会给用户响应的 throttle
{
    function throttle(time, fn) {
        let start = 0
        let timer = null
        return function () {
            let ctx = this
            let args = [...arguments]
            let end = +new Date()
            if (end - start >= time) {
                fn.apply(ctx, args)
                start = end
            } else {
                clearTimeout(timer)
                timer = setTimeout(() => {
                    fn.apply(ctx, args)
                    start = end
                }, time)
            }
        }
    }

    let throttleFn = throttle(1000, () => {
        console.log('111')
    })

    throttleFn()
    throttleFn()
}



/**
 * https://juejin.im/post/5ad6b34a6fb9a028cc61bfb3
 */

function throttle(fn,wait) {
    let _fn =fn,
    // 保存需要被延迟的函数引用
    timer,
    // 是否首次调用
    flags = true;
  
    return function() {
        let args = arguments,
            self = this;

        if(flags) {
            // 如果是第一次调用不用延迟，直接执行即可
            _fn.apply(self,args);
            flags = false;
            return flags;
        }

        // 如果定时器还在，说明上一次还没执行完，不往下执行
        if(timer) return false;

        timer = setTimeout(function() {
                // 延迟执行
                clearTimeout(timer);

                // 清空上次的定时器
                timer = null;

                // 销毁变量
                _fn.apply(self,args);
            },wait);
    }
}



{
    // ES6版的柯里化函数
    function curry(fn) {
        console.log(fn.length) // 4
        const g = (...allArgs) => allArgs.length >= fn.length ?
            fn(...allArgs) : 
            (...args) => g(...allArgs, ...args)

        return g;
    }
    const foo = curry((a, b, c, d) => {
        console.log(a, b, c, d);
    });
    foo(1)(2)(3)(4);    // 1 2 3 4
    const f = foo(1)(2)(3);
    f(5);   
}

{
    function test(arr) {
        return function () {
            if(arguments.length){
                arr = [...arr, ...Array.from(arguments)]
                return test(arr)
            }else {
                return arr.reduce((result,item)=>{
                    result += item;
                    return result
                },0)
            }
        }
    }
    function sum() {
        let arr = Array.from(arguments)
        return test(arr)
    }
    
    console.log(sum(3)())
    console.log(sum(1)(2)())
    console.log(sum(3)(4)(5)())
    console.log(sum(3,4,5)()) 
}




Function.prototype.uncurrying = function() {
    let self =this;
    // self 此时就是下面的Array.prototype.push方法

    return function() {
        let obj = Array.prototype.shift.call(arguments);

        /*
            obj其实是这种样子的
            obj = {
                'length': 1,
                '0': 1
            }
        */
        return self.apply(obj,arguments);
        // 相当于Array.prototype.push(obj, 110)
    }
};
let slice = Array.prototype.push.uncurrying();

let obj = {'length':1,'0':1};
slice(obj,110);
console.log(obj); // { '0': 1, '1': 110, length: 2 }






/** 惰性加载 */
// 常规的是这样写的
let addEvent = function(ele,type,fn) {
    if(window.addEventListener) {
        return ele.addEventListener(type,fn,false);
    }else if(window.attachEvent) {
        return ele.attachEvent('on'+type,function() {
            fn.call(ele);
        });
    }
};


let addEvent = function(ele,type,fn) {
    if(window.addEventListener) {
        addEvent = function(ele,type,fn) {
            ele.addEventListener(type,fn,false);
        }
    }
    else if(window.attachEvent) {
        addEvent = function(ele,type,fn) {
            ele.attachEvent('on'+type,function() {
                fn.call(ele)
            });
        }
    }

    // addEvent 已经被重新定义了
    addEvent(ele,type,fn);
};



{
    /**分时函数 */
    function timeChunk(data, fn, count = 1, wait) {
        let obj, timer;
    
        function start() {
            // 关键步骤
            let len = Math.min(count, data.length);
            for (let i = 0; i < len; i++) {
                val = data.shift();     // 每次取出一个数据，传给fn当做值来用
                fn(val);
            }
        }
    
        return function() {
            timer = setInterval(function() {
                if (data.length === 0) {    // 如果数据为空了，就清空定时器
                    return clearInterval(timer);
                }
                start();    
            }, wait);   // 分批执行的时间间隔
        }
    }
    
    // 测试用例
    let arr = [];
    for (let i = 0; i < 100000; i++) {  // 这里跑了10万数据
        arr.push(i);
    }
    let render = timeChunk(arr, function(n) {   // n为data.shift()取到的数据
        let div = document.createElement('div');
        div.innerHTML = n;
        document.body.appendChild(div);
    }, 8, 20);
    
    render();
}