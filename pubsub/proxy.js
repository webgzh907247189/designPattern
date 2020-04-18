{
    const value = {number: 10}

    const fn = (x = { ...value }) => {
        console.log(x.number *=2)
    }

    console.log(fn())  // 20
    console.log(fn())  // 20
    console.log(fn(value)) // 40
    console.log(fn(value)) // 40
}

{
    // 箭头函数和普通函数的区别
    //     普通函数：
    //     (1).this总是代表它的直接调用者
    //     (2).在默认情况下，没找到直接调用者，this指向window
    //     (3).在严格模式下，没有直接调用者的函数中的this是undefined
    //     (4).使用call，apply，bind绑定，this指的是绑定的对象
    //     箭头函数：
    //     (1).在使用 => 定义函数的时候，this的指向是定义时所在的对象，而不是使用时所在的对象，bind()、call()、apply()均无法改变指向
    //     (2).不能用做构造函数，也就是说不能使用new命令，否则就会抛出一个错误
    //     (3).不能使用arguments对象，但是可以使用…rest参数 -> 箭头函数没有this、super、arguments，也没有new.target绑定
    //     (4).不能使用yield命令
    //     (5).没有原型属性

    const fn = () => {
        console.log('1', this)
        console.log(arguments) // 3. 箭头函数没有 arguments
    }
    fn.call({name: '11'}) // 1. 使用call 无法改变 this 指向

    let s = new fn() // 2. 报错，不能用做构造函数，也就是说不能使用new命令，否则就会抛出一个错误

    function *testGen(){
        yield '1'
        yield fn()
        return 11111
    }

    let gen = testGen()
    gen.next()
    gen.next() // 4. 爆错 -> 不能使用yield命令 (arguments is not defined)
}




{
    // 实现一个sleep函数
    function sleep(delay) {
        // 获取一个初始时间
        let startTime = new Date().getTime()
        // 如果时间差小于延迟时间，就一直循环
        while (new Date().getTime() - startTime < delay) {
            continue
        }
    }
    
    console.log('111')
    sleep(2000)
    console.log('222')
}



{
    // let和var的区别
    // let没有变量提升，存在暂时性死区，必须等let声明完以后，变量才能使用
    // let变量不能重复声明
    // let声明的变量只在let代码块有效

    var ss = '1aaa'
    {
        let ss = '???'
        console.log(ss) // ??
    }
    console.log(ss) // 1aaa
}




/**
 * Object.defineProperty 可以监听数组的变化，
 * Object.defineProperty 无法对 push、shift、pop、unshift 等方法进行响应
 * 
 * 对于新增加的数组项，Object.defineProperty 依旧无法监听到。
 * 因此，在 Mobx 中为了监听数组的变化，默认将数组长度设置为1000，监听 0-999 的属性变化。
 * 如果想要监听到 push、shift、pop、unshift等方法，该怎么做呢？在 Vue 和 Mobx 中都是通过重写原型实现的
 */
{
    const arr = ['ss', 'ff'];

    arr.forEach((item, index)=>{
        Object.defineProperty(arr, `${index}`,{
            get(){
                console.log('get')
                return item
            },
            set(value){
                console.log('set', value)
                item = value
            }
        })
    })

    console.log(arr[1])
    arr[0] = 'gg'
    console.log(arr[0], arr)
    // get
    // ff
    // set gg
    // get
    // gg ['gg','ff']

    arr[3] = 10; // 只有 Proxy 生效
    // arr.push(10); // 只有 Proxy 生效
    console.log(arr) // [(...), (...), empty, 10] -> ['gg','ff', empty, 10]

    // 对于新增加的数组项，Object.defineProperty 依旧无法监听到。
    // 因此，在 Mobx 中为了监听数组的变化，默认将数组长度设置为1000，监听 0-999 的属性变化。
    // 如果想要监听到 push、shift、pop、unshift等方法，该怎么做呢？在 Vue 和 Mobx 中都是通过重写原型实现的。


    {
        const arrayProto = Array.prototype;
        const subArrProto = Object.create(arrayProto);
        const methods = ['pop', 'shift', 'unshift', 'sort', 'reverse', 'splice', 'push'];
        methods.forEach(method => {
          /* 重写原型方法 */
          subArrProto[method] = function() {
            arrayProto[method].call(this, ...arguments);
          };
          /* 监听这些方法 */
          Object.defineProperty(subArrProto, method, {
            set() {},
            get() {}
          })
        })
    }
}


