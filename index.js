面试：
1. webWorker 使用 -> self.close() 或者 worker.terminate()
2. compose 使用 fns.reduce(a,b) => (..args) => a(b(..args)))
5. 切片上传 -> 秒传，暂停上传，恢复上传，切片上传，hash计算
6. abortCOntroller 取消 
3. 小数的使用  `${Math.round(`${parseFloat(val)}e${num}`)}e-${num}` * 1 round() 方法可把一个数字舍入为最接近的整数
科学计算法 2e-2 ===  2 * 10 -2 次方   Number(4.81 * 100)

8. vue 不更新， v-if 修改key 使其强制渲染
9. vue 数据问题，使用$set
10. http1 最多6个tcp连接  http2 最多20个tcp连接
11. Object.keys() | values()  排序问题
12. 解决问题的能力，善于思考，去发现问题，解决痛点
13. 业务场景，一个已经选中的selectList由id组成，一个数据源，需要根据 selectList 的 item 去数据源找出每一项name
常规做法，遍历数据源根据id去匹配，如何做的更好呢？(因为数据源很大，所以才用缓存，koa的query 得到的启发)
==== 
每次使用之前，去map里面找一次看有没有
selectedMap.get(selectedList) === categoryData，有的话，直接返回selectedMap.get(selectedList.toString())
没有的话，先计算nameList后面selectedMap.set(selectedList, categoryData);selectedMap.set(selectedList.toString(), list);

14. window.URL.createObjectURL(blob);  window.URL.revokeObjectURL(url); 释放数据
15. 下载图片(跨域的不跨域的，使用canvas，使用fetch的 res.blob())
16. 使用 patch-package 完成 修改源码

17. React 绑定事件有几种方法，有什么区别  -> https://juejin.im/post/5eb7961a6fb9a0436d41a8a9
class Animal { sayName = () => {throw new Error('你应该自己实现这个方法')}}
class Pig extends Animal {sayName() {console.log('I am a Pig')}}
var s = new Pig()
// s.sayName() -> 你应该自己实现这个方法

18. try catch 能捕获到哪些 JS 异常 -> 能捕捉到的异常，必须是线程执行已经进入 try catch 但 try catch 未执行完的时候抛出来的。
// 无法捕获异常
// try{ a.}catch(e){    console.log("error",e);}// outputUncaught SyntaxError: Unexpected token '}'
// 语法异常（syntaxError），因为语法异常是在语法检查阶段就报错了，线程执行尚未进入 try catch 代码块，自然就无法捕获到异常。

// 可以捕获异常
// function a(){ return new Promise((resolve, reject) => { setTimeout(() => { reject(1); })    })}
// try{ await a();}catch(e){ console.log('error',e);}console.log(111);//outputerror 1111
// 报错的时候( setTimeout 里面的 reject )，线程执行已经进入 try catch 代码块，但是并未执行完成，这样的话当然可以捕获到异常。await 将代码执行停留在 try catch 代码块里面的缘故。


19. 
https://juejin.im/post/5ec508b1e51d4578671681c8?utm_source=gold_browser_extension
https://juejin.im/post/5ec3f4a0e51d45788619b2b2?utm_source=gold_browser_extension

https://juejin.im/post/5ec49161e51d4578615acbb9?utm_source=gold_browser_extension
https://juejin.im/post/5ec358126fb9a0432a3c49e6?utm_source=gold_browser_extension

https://juejin.im/post/5ec225e26fb9a043761ce4d8?utm_source=gold_browser_extension
https://juejin.im/post/5ec220bfe51d454de44339a6?utm_source=gold_browser_extension
https://juejin.im/post/5ec34b495188256d3b6c9ea4?utm_source=gold_browser_extension
https://juejin.im/post/5eb8f5cdf265da7bd44254b4?utm_source=gold_browser_extension
https://juejin.im/post/5ec227b7e51d4528af0584ed?utm_source=gold_browser_extension


16. fetch相关操作，进度，取消，流？？？？
17. 同步版本好号使用流去操作 ？？？？
18. 怎么看帧数 看回流 重绘 ？？？？ 
19. cms 防抖截流问题 全局变量 webpack 打包

3. 缓存的课程复习 + 资料
4. 动态加载问题 ？？？掘金 静态分割 动态分割 参考cms项目id查询模块
6. chunkname ？？？request
5. webpack。环境变量设置 ？？掘金
7. webwork thunk 问题？？？
8. 批量引入的问题
9. public，private 缓存
10. tree组件
11. node问题






1. 看下ref使用函数
2. preload 使用在项目

{
    解决痛点
    跨组建传递ref
    跨组建传递数据
    跨层级通知消息(跨组件出发事件)
    interface频繁变更
    拆解函数，函数单一原则
    引入中间件思想，一个中间件做一件事情，优化代码判断
    可选链配置
    动态倒入，分包加载，针对interface
    批量引入文件
    小数计算和取值精度问题

    babel优化，cache
    webworker 计算
    反 adblock
    断网通知
    sentry 错误监控
    intersetctionObservale
    immerjs
}
