/**
 * https://juejin.im/post/6881231745073561614
 * https://www.cnblogs.com/jiasm/p/7683930.html(未看完) 
 * 
 * 1. async 俗称异步执行脚本
 * 2. async 是告诉浏览器,可以不必等到它下载解析完后再加载页面,也不用等它执行完后再执行其他脚本,  
 * 3. 多个async无法保证他们的执行顺序,例如async1和async2无法按顺序执行
 * 4. 解析到script标签后,async是直接下载
 * 
 * 1. defer俗称推迟执行脚本
 * 2. defer是在解析到结束到</html>标签后才会执行,俗称推迟执行脚本,多个defer可以按顺序执行,
 * 3. 例如defer1和defer2可以按顺序执行(实际上也不保证顺序执行)
 * 4. 解析到script标签后,defer是最后下载
 */


 /**
  * 相同点:
  * 1. 多个async或者defer标签实际上都不能保证顺序执行
  * （当所有的脚本文件都很小很小的时候,结果会在很大概率稳定在 async 执行比 defer 早）
  * 2. 都不会阻塞解析其他script标签内容的解析和页面渲染
  * 3. 他们都会在浏览器load事件前执行，但是不保证是在DomContentLoad事件前还是后执行
  * 4. defer不一定在async后面执行，从我的实验结果和书上对它们对解析来看
  */