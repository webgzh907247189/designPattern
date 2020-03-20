self.importScripts("/md5.min.js"); // 导入脚本
self.importScripts("/ajax.js"); 

// 生成文件 hash
self.onmessage = e => {
  const { name } = e.data;
  const result = $getMd5(name);
  self.postMessage(result);
};
