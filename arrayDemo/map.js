{
    console.log(Reflect.apply(Object.prototype.toString, '1', [])); // [object String]
    console.log(Object.prototype.toString.call('1')) // [object String]

    console.log(Math.max.apply(null, [1,2,3]))
    console.log(Reflect.apply(Math.max, Math , [1,2,3]))
}

{
    console.log(['0'] == false) // true
    // 遇到 == 先把 false 转为 Number(false) -> 0
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



// https://juejin.im/post/5e532c1b6fb9a07ca5303cd5
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
{   
    function throttle(fn, delay) {
        let timer = null;
        let flag = false;//中间媒介   
        return (...args) => {
            if(flag) return;

            clearTimeout(timer);
            flag = true;
            timer = setTimeout(() => {
                fn.apply(this, args);
                flag = false;
            },delay)
        }
    }

    function throttle(time,fn){
        let timer = null;
        let flag = false
        return function(){
            let ctx = this

            if(!flag) {
                clearTimeout(timer)
                timer = setTimeout(() => {
                    fn.apply(ctx, arguments)
                    flag = false
                }, time)
                flag = true
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














{
    let str = 'aBcD';
    let str1 = str.replace(/[A-Z]/,function(targetStr,idx,source){
        // targetStr, idx,                 source
        // 找到的元素,  对应的找到的元素的下标， 源(item)
        console.log(targetStr,idx,source)  // B 1 aBcD

        return `-${targetStr.toLocaleLowerCase()}`
    })

    console.log(str, str1) // aBcD a-bcD
}
{
    let template = "我是{{name}},性别{{sex}},年龄 {{age}}";
    let obj = {
        name:"zhufeng",
        age:10,
        sex:"男"
    }

    function render(template, data) {
        const reg = /\{\{(\w+)\}\}/; 
        if (reg.test(template)) {
            template = template.replace(reg,(a,b,c,d) => {
                // {{name}} -- name -- 2 -- 我是{{name}},性别{{sex}},年龄 {{age}}
                // {{sex}} -- sex -- 12 -- 我是zhufeng,性别{{sex}},年龄 {{age}}
                // {{age}} -- age -- 17 -- 我是zhufeng,性别男,年龄 {{age}}
                console.log(a,'--',b,'--',c,'--',d)

                return data[b]
            }); 
            return render(template, data); 
        }
        return template; 
    }
    console.log(render(template, obj));   // 我是zhufeng,性别男,年龄 10
}
{
    let template = "我是{{name}},性别{{sex}},年龄 {{age}}";
    let obj = {
        name:"zhufeng",
        age:10,
        sex:"男"
    }

    function render(template, data) {
        const reg = /\{\{(\w+)\}\}/; 
        if (reg.test(template)) {
            // exec() 方法用于检索字符串中的正则表达式的匹配
            // 如果 exec() 找到了匹配的文本，则返回一个结果数组。否则，返回 null
            const name = reg.exec(template)[1];

            template = template.replace(reg, data[name]);
            return render(template, data);
        }
        return template; 
    }
    console.log(render(template, obj));   // 我是zhufeng,性别男,年龄 10
}







{
    function test(){
        console.log(this) // test {}
        this.args = [...arguments]
    }

    const obj = {a: '11'}
    const result = test.bind(obj,'1')
    let f = new result('2')
    console.log(f) // { args: ['1', '2'] }
}
{
    function test(){
        this.args = [...arguments]
        console.log(this.a, this.args) // '11'  [ '1', '2' ]
    }

    const obj = {a: '11'}
    const result = test.bind(obj,'1')
    const result1 = result('2')
}
{
    Function.prototype.myBind = function(ctx){
        let _this = this
        let args = Array.prototype.slice.call(arguments,1)
        function fn(){
            _this.apply(this instanceof fn ? this : ctx,[...args, ...arguments])
        }

        fn.prototype = Object.create(this.prototype)
        return fn
    }

    var obj = {
        name: 'joker'
    }
    function fn(name, age) {
        console.log(this)  //  this是fn
    }
    fn.prototype.aa = 'test'

    var result = fn.myBind(obj)

    // 场景1
    // result() // {name: "joker"}

    // 场景2
    let instance = new result()   
    console.log(instance,instance.aa)  // fn {} 'test'
}




{
    // 复制函数
    // 大文件上传
    // 热点图
}