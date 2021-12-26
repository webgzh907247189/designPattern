1. target="_blank" 也有一个安全漏洞。新的页面可以通过 window.opener 访问旧的窗口对象，甚至可以使用 window.opener.location = newURL 将旧页面导航至不同的网址。 加上 rel="noopener noreferrer"
2. $borderCast $dispatch 简化流程
3. provider inject 带来的问题，非响应式，使用函数获取最新的值
4. 调整生产的缓存策略 善于去发现问题，思考问题
5. 阅读源码，带来了什么？只是秀还是在业务中使用
6. 真正4年+ 和培训班的区别
7. 使用中间件简化if判断
8. 指定要返回数组的长度   let temp = "1-2-3-4-5";let split2 =temp.split("-", 2); // [1,2]
9. [].map(a,b,c) c的指向为map回掉函数的this，vue的jsx
10. Vue.observable 响应式数据
11. requeire.context() webpack 批量引入功能
12. webpack 的 mainFileds 加速匹配
13. 加速快发体验，优化开发中的问题，package.json 经常变更问题，批量引入问题
14. 替换qs，用单元测试驱动，保持基本功能一样

15. vue频繁变更的数据，单独抽出去，放到另一个组件里面，vue是组件级别的更新
16. vue组件当key 使用 WeakMap 装载，就算这个item被删除，不会造成内存泄漏
17. 查看当前页面已经加载的js，有多少的使用率，为code split 作出基础
18. 通过 performace 查看 页面加载的js 的时间，扣除不必要的js作为vender.js 加载 (看Main -> task, 某一个帧)
19. vuex 不是必须的，放在 vender.js 里面，加载时间很长，监听vuex的action完成行为，每次对localStorage io操作，很费时
20. {...null,...undefined} -> {}
[...null,...undefined] -> 报错
null == undefined  true -> null 只等于 undefined
null == '' false
通过 xx == undefined, && xx !== undefined 来判断是不是null
21. vuex-persite 全量写入数据，太大，影响io
22. axios的promise处理和react的tranction处理，异曲同工，包装函数，使得函数扩展
23. (https://juejin.im/post/5f0dd54df265da230c20a226)
针对 options 请求，-> 原因 跨域 && 非简单请求造成的 -> 解决 1: 都用简单请求 2: 使用 Access-Control-Max-Age 解决
24. 使用patch-package 处理问题，如何解决，如何修复，node_modules 的 node_modules 的处理 
25. 不是简单的写代码，遇到问题如何解决，如何规避问题



// 几种刷新和回车的区别
// 使用 Ctrl+F5 强制刷新页面时，会对本地缓存文件直接过期，然后跳过强缓存和协商缓存，直接请求服务器
// 点击刷新或 F5 刷新页面时，对本地缓存文件过期，然后带If-Modifed-Since和If-None-Match发起协商缓存验证新鲜度
// 浏览器输入URL回车，浏览器查找 Disk Cache，有则使用，没有则发送网络请求



{
    function user(obj){
        obj.name = '11';
        obj = new Object;
        obj.name = 'zzz'
    }
    
    let p = new Object()
    user(p)
    console.log(p.name); // 11
    /**
     * 对象作为参数，传递进去的是这个对象的地址，obj.name是给person这个对象赋值;
     * obj = new Object(),把obj指向另一个对象，obj.name现在是给这个新对象赋值，不影响person这个变量指向的对象；
     * 两个obj指向的对象的引用地址不同。
     * ECMAScript中所有函数的参数都是按值传递的。
     * 也就是说，把函数外部的值复制给函数内部的参数，就和把值从一个变量复制到另一个变量一样。
     * 不过需要注意的是，基本类型的传递如同基本类型变量的复制一样，传递方式是按值传递，这意味着在函数体内修改参数的值，
     * 不会影响到函数外部。而引用类型的值传递，如同引用类型变量的复制一样，传递方式是按引用传递，也就是传入函数的是原始值的地址，
     * 因此在函数内部修改参数，将会影响到原始值。
     */
}



{
  // finally 不一定是最后执行，看 finally注册的顺序
  // finally 的回掉函数 没有参数，返回值 也不会被下一个 注册的链式 接收
  new Promise((resolve) => {
    resolve(1)
  }).finally((d)=>{
    console.log(d, 'finally0')
    return 'zasdasdasd'
  }).then((d)=>{
    console.log(d, 'then2')
    return '???????????'
  }).finally((d)=>{
    console.log(d, 'finally1')
    return 'zasdasdasd1111'
  }).finally((d)=>{
    console.log(d, 'finally2')
    return 'zasdasdasd222'
  }).then((d)=>{
    console.log(d, 'thenssssssssss')
  })

  /**
   * undefined "finally0"
   * 1 "then2"
   * undefined "finally1"
   * undefined "finally2"
   * ??????????? thenssssssssss
   */
}


/**
 * promise thenable 对象情况
 */
{
  var t = {
    then(resolve,reject){
        console.log('ttt')
        reject('??')
    }
  }

  // 执行 reject 方法
  Promise.reject(t).then((d) => {
      console.log(d, '1111')
  }, (d) => {
      console.log(d, '2222')
  })
  // t 222
}
{
  var t = {
    then(resolve,reject){
        console.log('ttt')
        reject('??')
    }
  }

  // 执行 t里面的then 方法，并且进入 resolve
  Promise.resolve(t).then((d) => {
      console.log(d, '1111')
  }, (d) => {
      console.log(d, '2222')
  })
  // ttt
  // ?? 222
}



/**
 * promise.resolve || reject 返回 Promise的情况
 */
{
  // 进入 reject
  // Promise.resolve 直接把 里面的 promise 返回
  Promise.resolve(Promise.reject('1')).then((d) => {
    console.log(d, '1111')
  }, (d) => {
      console.log(d, '2222')
  })
  // 1, 2222
}

{
  Promise.reject(Promise.resolve('1')).then((d) => {
    console.log(d, '1111')
  }, (d) => {
      console.log(d, '2222')
  })
  // Promise { '1' } '2222'
}


// 解构 也会把 原型链上面的 属性给解构了  -> 类似与直接进行 取值
// newObj 已经是一个新的对象了 ->  o 这个对象的原型还是 直接 create 指向的对象
{
  const o = Object.create({ x: 1, y: 2 });
  o.z = 3;

  let { x, ...newObj } = o;
  let { y, z } = newObj;
  console.log(x, y, z)
  // 1 undefined 3
}


{
  空值合并运算符 ?? 
    1. 它被用于为变量分配默认值：
      // 当 height 的值为 null 或 undefined 时，将 height 的值设置为 100
      height = height ?? 100;

    2.?? 运算符的优先级非常低，仅略高于 ? 和 =，因此在表达式中使用它时请考虑添加括号。
    3. 如果没有明确添加括号，不能将其与 || 或 && 一起使用。
}


/**
 * 任何一个await语句后面的 Promise 对象变为reject状态，那么整个async函数都会中断执行
 * 第二个await语句是不会执行的，因为第一个await语句状态变成了reject。
 * 
 * 规避 可以使用  try-catch处理 或者 promise.catch 处理
 */
{
  async function asyncTest() {
    await Promise.reject('出错了');
    await Promise.resolve('hello world'); // 不会执行
  }

  asyncTest()
}

/**
 * await命令后面是一个 Promise 对象，返回该对象的结果。如果不是 Promise 对象，就直接返回对应的值。
 */
{
  function testAwait(){
    return Promise.resolve({url: '123123'})
  }   

  async function show() {
    const imageSrc = (await testAwait()).url
    console.log(imageSrc)
    return imageSrc
  }
  show() 
}


{
  // WeakMap 键名所指向的对象，不计入垃圾回收机制
  // WeakMap 对象是一组键/值对的集合，其中的键是弱引用的。其键必须是对象，而值可以是任意的
  
  // WeakSet 只能是对象的集合，而不能是任何类型的任意值
  // WeakSet 没有遍历方法，因为其成员都是弱引用，弱引用随时都会消失，遍历机制无法保证成员的存在
  // WeakSet集合中对象的引用为弱引用。如果没有其他的对WeakSet中对象的引用，那么这些对象会被当成垃圾回收掉。 
  //这也意味着WeakSet中没有存储当前对象的列表。正因为这样，WeakSet 是不可枚举的
  // 因为是弱引用，所以WeakMap、WeakSet的键值对是不可枚举的
  {
    // 对应的 item & item 可能被删除的情况
    function getOnlyKey(item) {
      if (!uidMap.has(item)) {
          uidMap.set(item, uidKey++);
      }
      return uidMap.get(item);
    }
  }
}


27555


{
  const arr = [1, [2, [3, [4, 5]]], 6];
  const list = JSON.stringify(arr).replace(/\[|\]/g, '').split(',')
  console.log(list)
}
{
  const arr = [1, [2, [3, [4, 5]]], 6];
  const getList = (list) => {
    return list.reduce((result, item) => {
      return result.concat(Array.isArray(item) ? getList(item) : item)
    }, [])
  }
  console.log(getList(arr))
}


{
  https://github.com/mqyqingfeng/Blog/issues/2
  // 1
function inheritPrototype(subType, superType) {
  function F() {}
  F.prototype = superType.prototype;
  var f = new F();
  f.constructor = subType;
  subType.prototype = f;
  }
  
  function SuperType4(name) {
  this.name = name;
  this.colors = ["red", "blue", "green"];
  }
  
  SuperType4.prototype.sayName = function() {
  console.log(this.name);
  };
  
  function SubType4(name, age) {
  SuperType4.call(this, name);
  this.age = age;
  }
  inheritPrototype(SubType4, SuperType4);
  
  SubType4.prototype instanceof SuperType4
  new SubType4('dd','pp').__proto__
  new SubType4('dd','pp').__proto__.__proto__
  new SubType4('dd','pp').__proto__.__proto__.__proto__
  
  
  
  // 2
  function inheritPrototype(subType, superType) {
  subType.prototype = superType.prototype;
  subType.constructor = subType;
  }
  
  function SuperType7(name) {
  this.name = name;
  this.colors = ["red", "blue", "green"];
  }
  
  SuperType7.prototype.sayName = function() {
  console.log(this.name);
  };
  
  function SubType7(name, age) {
  SuperType7.call(this, name);
  this.age = age;
  }
  inheritPrototype(SubType7, SuperType7);
  SubType7.prototype instanceof SuperType7
  new SubType7('dd','pp').__proto__
  new SubType7('dd','pp').__proto__.__proto__
}


{
  秋招
  https://pan.baidu.com/s/1wcC48wAzq0YHSTI7Ctscxw  
  密码: ppl1  

  前端性能优化CRP
  链接：https://pan.baidu.com/s/1TzzLaYtx6HZtbW0Oj8Cnbg 
  提取码：47fx
}
{
  nest
  相关的录播视频链接：https://pan.baidu.com/s/1PFu6Sa80EkKDQaeD3SB0FA 
  提取码：490u 
  复制这段内容后打开百度网盘手机App，操作更方便哦
}

{
  axios，flex，
  bfc，渲染过程，@import link,
  $dispatch 含义(配合 $on,为什么$on可以完成这个操作，因为都在this.$vm上)
  看完文的那个vue进阶 精选
}




// 先是初始化作用域链
// 然后是初始化this和arguments
// 然后是形参赋值
// 再到变量提升



// 数组 一般是链表存储，哈希表读取
// 怎么区分堆内存栈内存

// 对对象来说 指针是放在栈啊 数据放在堆
// 快的是栈 慢的是堆
// 引用类型存在堆，非引用类型 放在栈
// https://blog.csdn.net/xiebaochun/article/details/85711635
 

http://www.zhufengpeixun.com/grow/html/103.10.webpack-optimize.html 