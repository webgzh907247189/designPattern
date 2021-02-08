const babel = require('@babel/core');
const code = `
    let obj = {
       list: [],
         id: 0,

       // 订阅
       listener: function (key,fn) {
          //  this.list[key] = [...(this.list[key] || []),fn]

            // if(this.list[key]){
            //         this.list[key].push(fn)
            //     }else{
            //         this.list[key] = [fn]; // {newListener:[fn1]}
            // }
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
//            let resultList = this.arrayClone(listFns,listFns.length)
           for(let itemFn of listFns){
               this.id ++
               itemFn.apply(this,args)

                if(this.id >= 1000){
                        break;
               }
           }

//            for (var i = 0; i < listFns.length; ++i){
//                 this.id ++
//                 Reflect.apply(listFns[i], this, args);
//                 if(this.id >= 1000){
//                         break;
//                     }
//             }
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
   };
   function fn2(water){
    console.log('晚上喝的是 + water')
      obj.listener('drink',(...args) => {
          console.log('111',args)
      })
  };
  obj.listener('drink',fn2);
  obj.trigger('drink','椰子水');`




   const ast1 = babel.transform(code, {
    presets: [
      [
        '@babel/preset-env',
        {
          // useBuiltIns: 'usage',
          // corejs: 3
        }
      ]
    ],
    plugins: [
      // ["@babel/plugin-transform-runtime"]
    ]
  });
  console.log(ast1.code)