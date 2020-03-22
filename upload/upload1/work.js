// self.importScripts("/md5.min.js"); // 导入脚本
// self.importScripts("/ajax.js"); 

// Worker 线程能够访问一个全局函数 importScripts() 来引入脚本，
// 该函数接受 0 个或者多个 URI 作为参数来引入资源；
// 以下例子都是合法的：
//   importScripts();                        /* 什么都不引入 */
//   importScripts('foo.js');                /* 只引入 "foo.js" */
//   importScripts('foo.js', 'bar.js');      /* 引入两个脚本 */
//   脚本的下载顺序不固定，但执行时会按照传入 importScripts() 中的文件名顺序进行。
//   这个过程是同步完成的；直到所有脚本都下载并运行完毕， importScripts() 才会返回。

self.importScripts("/md5.min.js", "/ajax.js"); // 导入脚本

// 在worker里进行的复杂计算，运行时间并不会变短，有时耗费时间甚至更长，毕竟开启worker也需要消耗一定的性能
// 这样主线程就能及时响应用户操作而不会造成卡顿现象


// 生成文件 hash
self.onmessage = e => {
  const { name } = e.data;
  const result = $getMd5(name);
  self.postMessage(result);
};
