/**
 * https://juejin.im/post/5c73a602e51d457fd6235f66
 * https://juejin.im/post/5c813aa5f265da2dd94cd7c2
 */

{
    // call 可以继承
    function Product(name, price) {
        this.name = name;
        this.price = price;
    }
    function Food(name, price) {
        Product.call(this, name, price);
        this.category = 'food';
    }
    var cheese = new Food('feta', 5);
    console.log(cheese)
    // Food { name: 'feta', price: 5, category: 'food' }
}




{
    // apply 
    var array = ['a', 'b'];
    var elements = [0, 1, 2];
    array.push.apply(array, elements);
    console.log(array); // ["a", "b", 0, 1, 2]
}
{
    var numbers = [5, 6, 2, 3, 7];
    var max = Math.max.apply(null, numbers)  // 7
    var min = Math.min.apply(null, numbers); // 2
}




/**
 * bind
 */ 
{
    // 偏函数
    function list() {
        return Array.prototype.slice.call(arguments);
    }
      
    function addArguments(arg1, arg2) {
          return arg1 + arg2
    }
      
    var list1 = list(1, 2, 3); // [1, 2, 3]
      
    var result1 = addArguments(1, 2); // 3
    console.log(list1,result1)


    var leadingThirtysevenList = list.bind(null, 37);
    var list2 = leadingThirtysevenList();  // [37]
    leadingThirtysevenList(1, 2, 3);  // [37, 1, 2, 3]


    var addThirtySeven = addArguments.bind(null, 37);
    var result2 = addThirtySeven(5);   // 37 + 5 = 42 

    var result3 = addThirtySeven(5, 10); // 37 + 5 = 42 ，第二个参数被忽略
}


























/**
 * call原理
 * 
 * 当 fn1.myCall(fn2)时，绑定当前this 需要context.fn = this等价于context.fn = fn1 
 * 调用的时候 context.fn() 等价于 fn2.fn()此时this是fn2 并执行fn1。
 */
{
    Function.prototype.myCall = function(ctx){
        ctx = ctx ? Object(ctx) : window
        ctx.fn = this
        let args = [...arguments].slice(1)
        let result = ctx.fn(args)
        Reflect.deleteProperty(ctx,'fn')
        return result
    }
}

// 使用 Symbol 实现 唯一的 key, 防止 ctx也出现fn这个key
{
    Function.prototype.myCall = function(ctx){
        ctx = ctx ? Object(ctx) : window

        const fn = Symbol('fn')
        ctx[fn] = this
        let args = [...arguments].slice(1)
        let result = ctx[fn](args)
        Reflect.deleteProperty(ctx,'fn')
        return result
    }
}



/**
 * apply 原理
 */
{
    Function.prototype.myApply = function(ctx){
        ctx ? Object(ctx) : window
        ctx.fn = this
        let args = [...arguments][1]

        // undefind  就 直接运行  ->  此处应该写冗余了
        if(!args){
            return ctx.fn()
        }
        let result = ctx.fn(args)
        Reflect.deleteProperty(ctx,'fn')
        return result
    }
}

// 使用 Symbol 实现 唯一的 key, 防止 ctx也出现fn这个key
{
    Function.prototype.myApply = function(ctx){
        ctx = ctx ? Object(ctx) : window

        const fn = Symbol('fn')
        ctx[fn] = this
        let args = [...arguments].slice(1)
        let result = ctx[fn](args)
        Reflect.deleteProperty(ctx,'fn')
        return result
    }
}




/**
 * bind 原理
 */
{
    Function.prototype.myBind = function(ctx){
        let _this = this
        let args = [...arguments].slice(1)
        return function(){
            let fnArgs = [...arguments]
            return _this.apply(ctx,[...fnArgs,...args])
        }
    }

    var obj = {
        name: 'joker'
    }
    function fn(name, age) {
        console.log(this)  //  this是fn
    }
    var result = fn.myBind(obj)
    result() // {name: "joker"}
}










{
    let obj = {
        name: 'joker'
    }
    function fn(name, age) {
        console.log(this)  //  this是fn
    }

    let bindFn = fn.bind(obj)
    let instance = new bindFn()

    //  this 指向 fn
}

// bind 之后 可以 new (充当构造函数)
{
    Function.prototype.myBind = function(ctx){
        let _this = this
        let args = [...arguments].slice(1)

        function Fn (){}

        function fnBound(){
            let fnArgs = [...arguments]
            return _this.apply(this instanceof fnBound ? _this : ctx, [...fnArgs,...args])
        }

        Fn.prototype = _this.prototype
        fnBound.prototype = new Fn
        return fnBound
    }

    var obj = {
        name: 'joker'
    }
    function fn(name, age) {
        console.log(this)  //  this是fn
    }
    var result = fn.myBind(obj)
    result() // {name: "joker"}
}




























/**
 * https://juejin.im/post/5c7e9ff35188251b94065adf
 * 
 * WeakMap
 * 
 * WeakSet对象允许你将弱保持对象存储在一个集合中   它和Map类似，但有两点不同：
 * 1. WeakSet对象中只能存放对象引用, 不能存放值, 而Set对象都可以。
 * 2. WeakSet对象中存储的对象值都是被弱引用的, 如果没有其他的变量或属性引用这个对象值, 则这个对象值会被当成垃圾回收掉.
 *  正因为这样, WeakSet对象是无法被枚举的, 没有办法拿到它包含的所有元素.
 */
{
    let myElement = document.getElementById('logo');
    let myWeakmap = new WeakMap();

    myWeakmap.set(myElement, {timesClicked: 0});

    myElement.addEventListener('click', function() {
    let logoData = myWeakmap.get(myElement);
    logoData.timesClicked++;
    }, false);
}