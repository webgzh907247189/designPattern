{
    console.log(Reflect.apply(Object.prototype.toString, '1', [])); // [object String]
    console.log(Object.prototype.toString.call('1')) // [object String]

    console.log(Math.max.apply(null, [1,2,3]))
    console.log(Reflect.apply(Math.max, Math , [1,2,3]))
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
    var a = [1,2,3,4]
    var b = a;
    var c = a.map(() => {
        var s = a.shift()
        return s
    })

    console.log(a,'---',c);
    // [3,4] [1,2,empty * 2]
}

{
    var a = ['a','b','c','d']
    var z = []
// for(var i=0;i<a.length;i++){
    var s = a.map((item,i)=>{
        var f = a.splice(i,1)
        z.push(f);
        return item
    })
    console.log(a,'--',z,'--',s)
    //['b','d']     [['a'],['c']]     ['a','c',empty * 2]
}




// 节流 (第一个人说了算)
{
    function throttle(time,fn){
        let start = 0
        return function(){
            let ctx = this
            let end = +new Date()
            if (end - start >= time) {
                fn.apply(ctx, arguments)
                start = end
            }
        }
    }

    let throttleFn = throttle(1000,()=>{
        console.log('111')
    })

    throttleFn()
    throttleFn()
}

// 防抖 (最后一个人说了算)
{
    function debounce(time,fn){
        let timer = null;

        return function(){
            let ctx = this

            if (timer) {
                clearTimeout(timer)
            }

            timer = setTimeout(()=>{
                fn.apply(ctx, arguments)
            },time)
        }
    }

    let debounceFn = debounce(1000,()=>{
        console.log('111')
    })

    debounceFn()
    debounceFn()
}

// 借用throttle的思想，实现一个到预定时间无论怎样都会给用户响应的 throttle
{
    function throttle(time,fn){
        let start = 0
        let timer = null
        return function(){
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
                },time)
            }
        }
    }

    let throttleFn = throttle(1000,()=>{
        console.log('111')
    })

    throttleFn()
    throttleFn()
}