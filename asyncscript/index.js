/**
 * https://mp.weixin.qq.com/s/0hmeE0JbNMF1Rx7_p8oAew (写的不错)
 * https://juejin.im/post/6881231745073561614
 * https://www.cnblogs.com/jiasm/p/7683930.html(未看完) 
 * 
 * 
 * https://es6.ruanyifeng.com/#docs/module-loader
 * 
 * <script> 的属性可以加上 type="module"。这时浏览器会认为这个文件是一个JavaScript 模块，其中的解析规则、执行环境会略有不同；
 * 这时 <script> 的默认行为会像是 defer 一样，在后台下载，并且等待 DOM 解析、渲染完成之后才会执行，
 * 所以 defer 属性无法在 type="module" 的情况下发生作用。但同样可以通过  async 属性使它在下载完成后即刻执行。
 * 
 * 
 * 1. async 俗称异步执行脚本 (下载后会立刻执行，且不保证执行顺序)
 * 2. async 是告诉浏览器,可以不必等到它下载解析完后再加载页面,也不用等它执行完后再执行其他脚本,  
 * 3. 多个async无法保证他们的执行顺序,例如async1和async2无法按顺序执行
 * 4. 解析到script标签后,async是直接下载
 * 
 * 1. defer俗称推迟执行脚本
 * 2. defer是在解析到结束到</html>标签后才会执行,俗称推迟执行脚本,多个defer可以按顺序执行,
 * 3. 例如defer1和defer2可以按顺序执行(实际上也不保证顺序执行)  ->  可能会保证执行顺序 按照写的顺序进行执行
 * 4. 解析到script标签后,defer是最后下载
 */


 /**
  * 相同点:
  * 1. 多个async或者defer标签实际上都不能保证顺序执行
  * （当所有的脚本文件都很小很小的时候,结果会在很大概率稳定在 async 执行比 defer 早）
  * 2. 都不会阻塞解析其他script标签内容的解析和页面渲染
  * 3. 他们都会在浏览器load事件前执行，defer 在 DomContentLoad 事件前执行
  * 4. defer不一定在async后面执行，从我的实验结果和书上对它们对解析来看
  */