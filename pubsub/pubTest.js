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
 * 同一个事件订阅同一个事件
 * arrayClone 貌似要不要都可以
 */
{
    let obj = {
       list: [],

       // 订阅
       listener: function (key,fn) {
           this.list[key] = [...(this.list[key] || []),fn]
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
           let resultList = this.arrayClone(listFns,listFns.length)
           for(let itemFn of resultList){
               itemFn.apply(this,args)
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
