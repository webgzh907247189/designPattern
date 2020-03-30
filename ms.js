1. target="_blank" 也有一个安全漏洞。新的页面可以通过 window.opener 访问旧的窗口对象，甚至可以使用 window.opener.location = newURL 将旧页面导航至不同的网址。
2. $borderCast $dispatch 简化流程
3. provider inject 带来的问题，非响应式，使用函数获取最新的值
4. 调整生产的缓存策略 善于去发现问题，思考问题
5. 阅读源码，带来了什么？只是秀还是在业务中使用
6. 真正4年+ 和培训班的区别

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