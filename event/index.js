// https://github.com/LiangJunrong/document-library
// 主线程从 “任务队列” 中读取执行事件，不断循环重复的过程，就被称为 事件循环（Event Loop）


// JavaScript 的运行机制：
// 所有同步任务都在主线程上执行，形成一个 “执行栈”（execution context stack）。
// 主线程之外，存在一个 “任务队列”（task queue），在走主流程的时候，如果碰到异步任务，那么就在 “任务队列” 中放置这个异步任务。
// 一旦 “执行栈” 中所有同步任务执行完毕，系统就会读取 “任务队列”，看看里面存在哪些事件。那些对应的异步任务，结束等待状态，进入执行栈，开始执行。
// 主线程不断重复上面三个步骤。
// 而 JavaScript 的异步任务，还细分两种任务：
// 宏任务（Macrotask）：script（整体代码）、setTimeout、setInterval、XMLHttpRequest.prototype.onload、I/O、UI 渲染
// 微任务（Microtask）：Promise、MutationObserver


// node环境下和浏览器环境下 执行结果不一样
setTimeout(() => {
    console.log("timer1");
    Promise.resolve().then(function() {
      console.log("promise1");
    });
});
  
setTimeout(() => {
    console.log("timer2");
    Promise.resolve().then(function() {
      console.log("promise2");
    });
});


let box = document.getElementById('box')
let observable = new IntersectionObserver((entries)=>{
  // console.log(entries, 'entries')

  // entries 当前已监听 并且 发生交叉的目标集合
  entries.forEach((entrie) => {

    // isIntersecting 是否正在交叉  ->  判断元素是否可见
    let tips = entrie.isIntersecting ? '进入了内部' : '离开了内部'
    console.log(tips,entrie)
  })
}) // 指定父元素，默认为视窗

// 监听的目标元素
observable.observe(box)


new IntersectionObserver((entries) => {
  console.log(entries, 'entries')
  let item = entries[0]
  if(item.isIntersecting){
    console.log('滚动到了底部')
  }
}).observe(document.querySelector('.reference'))