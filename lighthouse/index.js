/**
 * 生成站点报告
 * 
 * https://juejin.im/book/5b936540f265da0a9624b04b/section/5bb6218ee51d450e7762f873
 * 
 * 掘金小册 (前端性能优化原理与实践)
 */

// npm install -g lighthouse
// lighthouse https://juejin.im/books --view



{
    0. 前端优化 (网络优化,渲染优化)
    1. 深入了解http缓存http请求相关知识
    2. 了解浏览器渲染原理

    (解析 HTML dom -> 计算样式 cssom  -> 计算图层布局 render tree -> 绘制图层 painer  ->  整合图层，得到页面 将数据由 CPU 输出给 GPU 最终绘制在屏幕上)
    复杂的视图层会给这个阶段的 GPU 计算带来一些压力，在实际应用中为了优化动画性能，我们有时会手动区分不同的图层

    当前可视区域的高度 ->  window.innerHeight || document.documentElement.clientHeight 
    元素距离可视区域顶部的高度 -> getBoundingClientRect()
}
浏览器的GPU加速功能是将需要进行动画的元素提升到一个独立的层，这样就可以避免浏览器进行重新布局和绘制，所以能大大提高网页的性能。

在VO扫描的时候会先扫描函数声明，把函数名作为key，函数体作为value； 然后再扫描变量声明，如果此变量在vo中已经存在相同的key，就忽略掉。


// https://juejin.im/post/5c6a732151882528735f2d33
// https://juejin.im/post/5c337ae06fb9a049bc4cd218
{
    浏览器与Node的事件循环(Event Loop)区别
    一个浏览器通常由以下常驻线程组成：
        GUI 渲染线程  (，解析HTML、CSS，构建DOM树，布局和绘制等)
        JavaScript引擎线程  (责处理 JavaScript脚本，执行代码。该线程与 GUI渲染线程互斥，当 JS引擎线程执行 JavaScript脚本时间过长，将导致页面渲染的阻塞)
        定时触发器线程 (负责执行异步定时器一类的函数的线程，如： setTimeout，setInterval。)
        事件触发线程 (主要负责将准备好的事件交给 JS引擎线程执行)
        异步http请求线程 (负责执行异步请求一类的函数的线程，如： Promise，axios，ajax等)
    

    Node.js的运行机制如下:
        V8引擎解析JavaScript脚本。
        解析后的代码，调用Node API。
        libuv库负责Node API的执行。它将不同的任务分配给不同的线程，形成一个Event Loop（事件循环），以异步的方式将任务的执行结果返回给V8引擎。
        V8引擎再将结果返回给用户。
    
    
    
    node中的事件循环的顺序：
        外部输入数据-->轮询阶段(poll)-->检查阶段(check)-->关闭事件回调阶段(close callback)-->定时器检测阶段(timer)-->
        I/O事件回调阶段(I/O callbacks)-->闲置阶段(idle, prepare)-->轮询阶段（按照该顺序反复运行）
        
        1.update_time
        //在事件循环的开头，这一步的作用实际上是为了获取一下系统时间，以保证之后的timer有个计时的标准。这个动作会在每次事件循环的时候都发生，确保了之后timer触发的准确性。（其实也不太准确....)
        
        timers 阶段：这个阶段执行timer（setTimeout、setInterval）的回调
        I/O callbacks 阶段：处理一些上一轮循环中的少数未执行的 I/O 回调
        idle, prepare 阶段：仅node内部使用
        poll 阶段：获取新的I/O事件, 适当的条件下node将阻塞在这里
        check 阶段：执行 setImmediate() 的回调
        close callbacks 阶段：执行 socket 的 close 事件回调   
}





{
    npm install的时候首先会下载对应资源包的压缩包放在用户目录下的.npm文件夹下，然后解压到项目的node_modules中，并且提取依赖包中指定的bin文件，在linux下会创建一条软连接，
    所以在linux下我们真正执行的是.bin文件夹下文件指向的文件
}
{
    npm i nrm -g //nrm 测试速度的包
    nrm ls
    nrm test 测试 速度
}
{
    npm shrinkwrap 锁包   
}




{
    JavaScript 内存调试技巧与泄露分析 -> https://github.com/andycall/master-of-javascript-memory
    算法 ->  https://github.com/wangzheng0822/algo/tree/master/javascript
}






{
    // 子类必须在 constructor 方法中调用 super 方法，否则新建实例时会报错。这是因为子类没有自己的 this 对象，而是继承父类的 this 对象，然后对其进行加工。
    // 只有调用 super 之后，才可以使用 this 关键字，否则会报错。这是因为子类实例的构建，是基于对父类实例加工，只有 super 方法才能返回父类实例。
    class A{}
    var a = new A

    console.log(a instanceof A, A.prototype.isPrototypeOf(a), a.__proto__.isPrototypeOf(a)) // true true true

    // ES5 的继承，实质是先创造子类的实例对象 this，然后再将父类的方法添加到 this 上面（ Parent.apply(this)）
    // ES6 的继承机制完全不同，实质是先创造父类的实例对象 this （所以必须先调用 super() 方法），然后再用子类的构造函数修改 this
}

{
    let r = add(2)(3)(4)() //9
    console.log(r, 'r')

    function add(...args){
        let sum = 0 + args[0]

        function fn(...args){
            if(args.length) {
                sum += args[0]
                return fn
            }else {
                return sum
            }
        }

        return fn
    }
}

{
    // https://mp.weixin.qq.com/s/wXpAi3P5Zo6D2smKALO4nQ
    // 《Effective JavaScript》P11：当 +用在连接字符串时，当一个对象既有 toString方法又有 valueOf方法时候，JS通过盲目使用 valueOf方法来解决这种含糊

    '' + { toString: () => 'S',valueOf: () => 'J'} // J
} 

{
    // 取整 |0
    1.3 | 0 // 1
    -1.9 | 0 // -1


    // 对一个数字 &1 可以判断奇偶数，负数也同样适用， num&1
    const num = 3
    !!(num &1)  // true
    !!(num %2)  // true


    // 要返回多行语句（例如对象文本），需要使用 ()而不是 {}来包裹函数体。这样可以确保代码以单个语句的形式进行求值。
    const a = (diameter) => (
        Math.PI * diameter
    )

    let r = a(1)
    console.log(r)


    // 数字补0操作
    const addZero1 = (num,len = 2) => (`0${num}`).slice(-len)
    const addZero2 = (num,len = 2) => (`${num}`).padStart(len,'0')

    addZero1(3)// 03
    addZero2(32,4) // 0032

    
    // 统计重复次数
    let cars = ['BMW', 'Benz','Benz','Tesla','BMW','Toyota'];
    let carsObj = cars.reduce(function(obj, name){
        obj[name] = obj[name] ? ++obj[name] : 1;
        return obj;
    },Object.create(null));

    console.log(carsObj)
    // => { BMW: 2, Benz: 2, Tesla: 1, Toyota: 1 }

    let carsObj = [{id: 1},{id: 2},{id: 4},{id: 2},{id: 2},{id: 1}];
    let carsObjResult = carsObj.reduce(function(result, item){
        
        let [equalItem,count] = [...result].find(([ele]) => {
            return ele.id === item.id
        }) || []

        if(equalItem){
            result.set(equalItem, ++count)
        }else{
            result.set(item, 1)
        }

        return result;
    },new Map);

    console.log(carsObjResult) //Map { { id: 1 } => 2, { id: 2 } => 3, { id: 4 } => 1 }
    


    // 删除元素 
    let arrTest = ['a','b','c','d']
    function deleteItem(arr,index){
        arr.copyWithin(index, index + 1).pop()
        return arr
    }
    console.log(deleteItem(arrTest, 1))

    let arrTest1 = ['a','b','c','d']
    function spliceOne(list, index) {
		for (; index + 1 < list.length; index++){
			list[index] = list[index + 1];
		}
        list.pop();
        
        return list
    }
    console.log(spliceOne(arrTest1, 1))


    // 判断校验 ???????????????

    // 数组解构 拿值
    let {2: item} = ['a', 'b', 'c']
    console.log(item) // c
}

{
    function validate(values){
        if (!values.first){
            return false;
        }
        
        if (!values.last){
            return false;
        }

        return true;
    }

    console.log(validate({first: 'Bruce',last: 'Wayne'})); // true



    const schema ={
        first: { 
            required: true
        },
        last : {
            required: true
        }
    }
    
    const validate = (schema, values) => {
        for (field in schema){
            if (schema[field].required){
                if (!values[field]){
                    return false;
                }
            }
        }
        return true;
    }
    
    console.log(validate(schema,{first: 'Bruce'})); // false
    console.log(validate(schema,{first: 'Bruce',last: 'Wayne'})); // true
}

{
    var length = 10
    function fn(){
        console.log(this.length)
    }

    var obj = {
        length: 5,
        methods: function(fn){
            console.log(this)
            fn()
            arguments[0]()
        }
    }
    obj.methods(fn,1)
}