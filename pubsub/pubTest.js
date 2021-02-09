const Emitter = require('events');

const emitter = new Emitter();

emitter.on('test',(...arguments) => {
    console.log('1111', ...arguments)
})

emitter.on('test',(...arguments) => {
    console.log('222222',...arguments)

    emitter.on('test',(...arguments) => {
        console.log('3333',...arguments)
    })
})
emitter.emit('test', 'cccc')
emitter.emit('test', 'ffff')

/**
 * 1111 cccc
 * 222222 cccc
 * 1111 ffff
 * 222222 ffff
 * 3333 ffff
 */



/**
 * https://cnodejs.org/topic/571e0c445a26c4a841ecbcf1
 * 通过源码解析 Node.js 中 events 模块里的优化小细节
 * 
 * 同一个事件订阅同一个事件
 * arrayClone 貌似要不要都可以
 */
{
    let obj = {
       list: [],

       // 订阅
       listener: function (key,fn) {
           // 注意此处的写法，会影响发布订阅的循环订阅问题

           /**
            * nextTick 的 flushCallback 每次执行 都进行拷贝一次，是有含义的
            * 
            * this.list[key] = [...(this.list[key] || []),fn]
            * 编译之后相当于 concat
            * 
            * const listFns = this.list[key] || [];this.list[key] = listFns.concat(fn);
            * 此时因为在 fn2 函数里面开始 执行 obj.listener('drink'， xx) 此时  let listFns = this.list[key] 已经确定了，指向引用地址 bbb
            * 由于进行 concat 操作，导致 新的订阅函数(obj.listener('drink'， xx)) 被推入 listFns 函数，指向一块新的引用地址ccc，但是循环里面用的还 是上次的引用地址，所以没有出现循环引用的问题 
            * 
            * 
            * this._events[eventName] ? this._events[eventName].push(callback) : this._events[eventName] = [callback];
            * 此时因为在 fn2 函数里面开始 执行 obj.listener('drink'， xx) 此时  let listFns = this.list[key] 已经确定了，指向引用地址 bbb
            * 由于进行push，导致 引用地址 bbb 被添加一个新的函数(obj.listener('drink'， xx)), 所以会出现循环引用的问题
            */

            // 写法1 -> 不太出现循环引用问题
            // this.list[key] = [...(this.list[key] || []),fn]

            // 写法2 -> 可能会出现循环引可能用问题
            this.list[key] ? this.list[key].push(fn) : this.list[key] = [fn];
       },

       //发布
       trigger: function(){
           let [key,...args] = [...arguments]

           let listFns = this.list[key]
           if(listFns.length == 0 || !listFns){
               return
           }
           // 防止在一个事件监听器中监听同一个事件，接而导致死循环
           // 同一个事件监听同一个事件，造成这个数组对应的key的数组
           // 每执行一次，数组增加一次，所以数组会持续的增加
        //    let resultList = this.arrayClone(listFns,listFns.length)
        //    for(let itemFn of listFns){
        //        itemFn.apply(this,args)
        //    }

           for (var i = 0; i < listFns.length; ++i){
                Reflect.apply(listFns[i], this, args);
            }
       },

       arrayClone(arr, i) {
           let copy = new Array(i);
           while (i--){
             copy[i] = arr[i];
           }
           return copy;
       },

       // 监听一次
       once: function(key,fn){
           // 先绑定，调用后删除
           function wrap() {
               fn.apply(this,[...arguments]);
               this.removeListener(key, wrap);
           }
           // 自定义属性 为了删除
           wrap.listen = fn;
           this.listener(key, wrap);
       },

       //取消订阅
       removeListener: function(){
           let [key,fn] = Array.from(arguments)
           let fns = this.list[key]

           if(!fns){
               return;
           }
           
           if(!fn){
               fns.length = 0
           }else{
               this.list[key] = fns.filter(itemFn => fn !== itemFn && fn !== itemFn.listen)
           }
       }
   }

   function fn2(water){
       console.log(`晚上喝的是${water}`)
       obj.listener('drink',(...arguments) => {
           console.log('111',...arguments)
       })
   }

   obj.listener('drink',fn2)

   obj.trigger('drink','椰子水')
   obj.trigger('drink','喝水')

   /**
    *	今晚的晚餐是全家
    * 	我只会监听一次...  参数是全家 {list: Array(0), listener: ƒ, trigger: ƒ, once: ƒ, removeListener: ƒ}
    *  once测试
    *  晚上喝的是椰子水
    *  晚上喝的是喝水
    *  111 喝水
    */
}
