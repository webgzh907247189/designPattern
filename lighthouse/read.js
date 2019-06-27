

1. mobx调优 修正 warning
10. tsx 的interface 简化  数据流简化(ctx || inject) 全新数据源
11. hooks
12. storybook
15. vue的书看完
16. 在js里直接加prefetch就好了，vue有配置项

6. 打包js code split 有问题

9. fundebug 接入
5. vue 接入？ systemjs
13. https://github.com/grpc/grpc-web
14. sentry





2. useState
3. useEffect
4. hot 热加载
5. https://x5.tencent.com/tbs/guide/serviceworker.html   serviceWork
6. https://juejin.im/user/59a77dc5518825243445bb76/posts react相关知识
7. https://juejin.im/post/5cee4ba4518825092c715438  https://juejin.im/user/5c6256596fb9a049bd42c770/posts  vue

react typescript
three.js




0. 会前端优化 (网络优化,渲染优化)
1. 深入了解http缓存http请求相关知识
2. 了解浏览器渲染原理
(解析 HTML dom -> 计算样式 cssom  -> 计算图层布局 render tree -> 绘制图层 painer  ->  整合图层，得到页面 将数据由 CPU 输出给 GPU 最终绘制在屏幕上)
复杂的视图层会给这个阶段的 GPU 计算带来一些压力，在实际应用中为了优化动画性能，我们有时会手动区分不同的图层

当前可视区域的高度 ->  window.innerHeight || document.documentElement.clientHeight 
元素距离可视区域顶部的高度 -> getBoundingClientRect()

所有任务划分为两种，一种是同步任务，一种是异步任务。同步任务是指在主线程上排队执行的任务，前一个任务结束，后一个任务才能执行。
异步任务是指不进入主线程执行，而进入“任务队列”的任务，只有当“任务队列”通知主线程可以执行了，该任务才会进入主线程。异步任务分为两种，宏任务和微任务

在VO扫描的时候会先扫描函数声明，把函数名作为key，函数体作为value； 然后再扫描变量声明，如果此变量在vo中已经存在相同的key，就忽略掉。

react-styleguidist
https://github.com/inversify/inversify-basic-example  react DI
https://github.com/jamiebuilds/react-loadable   切分chunk
https://github.com/stratiformltd/react-loadable-visibility 异步加载

https://github.com/piotrwitek/react-redux-typescript-guide  tsx 文档
https://github.com/adeelibr/react-hooks-demo/blob/master/src/hooks/UseEffectExample.js  hooks
https://medium.com/@martin_hotell/10-typescript-pro-tips-patterns-with-or-without-react-5799488d6680  tsx 文档

https://github.com/qq449245884/xiaozhi  博客



http://googlehelper.net/
cloud.google.com
https://bwh1.net/clientarea.php?action=invoices
https://bwh88.net/ipchange.php?incorrect=true



http://www.ptbird.cn/vue-draggable-dragging.html
https://blog.csdn.net/zjiang1994/article/details/79809687
vuedraggable中文文档


PreloadWebpackPlugin
https://my.oschina.net/susouth/blog/2877935




{
    自律使得我们更自由

https://www.rails365.net/    学习网站    speed plugin(大的loader用)
http://leeight.github.io/blog/2014/06/v8-full-codegen/   node 基础
https://github.com/hfpp2012/TypeScript-Nodejs-Github-Report node

https://mp.weixin.qq.com/s/_w_ToN9nTMOGBDFkeL1tjw node module.export
https://www.cnblogs.com/ghost-xyx/p/6394134.html vuex
https://www.jianshu.com/p/c6356958ca52  vuex
http://www.imooc.com/article/283532    vuex
https://segmentfault.com/a/1190000018577041   vuessr
https://zhuanlan.zhihu.com/p/37148975     文章
https://juejin.im/post/5a8fe1cef265da4e83267d7c   pwa
https://www.jianshu.com/p/d3c4e87727c3   nest
https://www.jianshu.com/p/f05d07b17414   nest
http://www.linyunbbs.com/thread-3019-1-1.html    Node+TS+Koa+vue 商城全栈（前后端）开发


https://www.imooc.com/read/26?distId=2710   一条龙的 Node·Vue·React 服务器部署
https://class.imooc.com/python   python学习

https://github.com/caijinyc/vue-music-webapp vue音乐app学习  webpack + (vue + nest|koa + ts  + ssr + mpvue + 数据库 + graphql + nextcss + ci/cd + node + python) + PWA? 多store
用eslint + Fundebug是拦截线上也许错误啥的 (eslint管静态 fundebug管动态运行的) Sessionstack
{

"build":"",
 "prebuild":"eslint"
}

https://github.com/sqaiyan/NeteaseMusicWxMiniApp  小程序音乐app mpvue  


https://juejin.im/post/5b9a2f07e51d450e7d099492  (每天阅读一个 npm 模块)
https://github.com/Advanced-Frontend/Daily-Interview-Question (工作日每天一道前端大厂面试题)


读完 vue + node 书
慕课的vue 黄


TypeScript + PWA + node + taro + ast + 静态资源缓存(微信公众号 basket.js) + webpack(最新) + koa + nest.js + ssr + system.js

小程序( ts + mpvue | wepy + koa )


amp + workbox + quicklink
}

https://cnodejs.org/topic/56e84480833b7c8a0492e20c

https://github.com/jasonslyvia/a-cartoon-intro-to-redux-cn

https://juejin.im/post/5cef5392e51d4510727c801e?utm_source=gold_browser_extension#comment


https://juejin.im/post/5c35432de51d45517d2f8bd8

https://juejin.im/post/5cca5ad2e51d456e6154b4c7



https://juejin.im/post/5ce21cfb6fb9a07eec599b9f



https://juejin.im/post/5ce25a76e51d4510835e01f3

https://github.com/sunyongjian/blog/issues/21

https://juejin.im/post/5cf475d66fb9a07ea944594e#heading-24

https://juejin.im/post/5c62ea95e51d457ffe60c084#heading-2

https://juejin.im/post/5cb30243e51d456e431ada29#heading-4

算法 https://github.com/wangzheng0822/algo/blob/master/javascript/06_linkedlist/SinglyLinkedList.js


https://juejin.im/post/5d0043915188255e780b6309?utm_source=gold_browser_extension#heading-1

https://juejin.im/post/5d082214f265da1bb564f97b?utm_source=gold_browser_extension

https://juejin.im/post/5d0373a95188251e1b5ebb6c

https://juejin.im/post/5c64e11151882562e4726d98#heading-1


https://juejin.im/post/5d08d3d3f265da1b7e103a4d#heading-43

https://juejin.im/post/5d1093e0f265da1bc5526f75#heading-0

{
    https://github.com/jerryOnlyZRJ/node-practice
    https://v8.js.cn/blog/fast-async/

    https://juejin.im/post/5af2fd776fb9a07a9c04372f
    https://github.com/justemit/coding-note

    https://github.com/yjhjstz/deep-into-node

    https://juejin.im/post/5bf7c563e51d452d705fe8d1
    https://juejin.im/post/5baf3c865188255c64190886#heading-19

    https://juejin.im/post/5bf6095f6fb9a049f9123492#heading-2
    https://juejin.im/book/5bc1bf3e5188255c3272e315/section/5bcb1fa5f265da0a857aaecc


    https://juejin.im/post/5c1902e751882546150aef0c
    https://juejin.im/post/5c1fa158f265da613c09cb36#heading-15

    https://juejin.im/post/5c1631eff265da615f772b59#heading-6
    https://juejin.im/post/5a372716518825258a5fbc80#heading-2


    https://juejin.im/post/5ce74a4ef265da1b6a346deb
    https://juejin.im/post/5c3bdc43e51d4552232fbc5e#heading-0



    https://juejin.im/post/5c6a151f518825625e4ac830

    https://juejin.im/post/5c63b5676fb9a049ac79a798?utm_source=gold_browser_extension

    https://juejin.im/post/5c75fa4af265da2d84109219?utm_source=gold_browser_extension
    https://juejin.im/post/5b4ff3bee51d4519721b9986

    https://www.jianshu.com/p/8c1cb18d219c
    https://juejin.im/post/5c21f4e5f265da61117a54a0#heading-27


    https://mp.weixin.qq.com/s/ODVQVsl9m8V9RgYwLbuSrA

    https://juejin.im/post/5cd15712e51d453a393af4c5?utm_source=gold_browser_extension


    https://juejin.im/post/5ce3b519f265da1bb31c0d5f#heading-4

    https://juejin.im/book/5c47343bf265da612b13e5c0/section/5c4737375188255de8397ae3

}