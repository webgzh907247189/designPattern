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