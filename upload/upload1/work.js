self.importScripts("/md5.min.js"); // 导入脚本
self.importScripts("/ajax.js"); 

// 在worker里进行的复杂计算，运行时间并不会变短，有时耗费时间甚至更长，毕竟开启worker也需要消耗一定的性能
// 这样主线程就能及时响应用户操作而不会造成卡顿现象


// 生成文件 hash
self.onmessage = e => {
  const { name } = e.data;
  const result = $getMd5(name);
  self.postMessage(result);
};
