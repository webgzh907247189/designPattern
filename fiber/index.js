
// requestId与setTimeout，setInterval的返回值一样，是一个标识符，
// 如果在之后，希望清理掉该回调的话，可以直接cancelIdleCallback(requestId)即可
// 关于这一点，与计时器是完全相同的。
// cancelIdleCallback(requestId);

// didTimeout -> 是否超时触发（只读）
// timeRemaining -> 该帧剩余可用时间  deadline.timeRemaining可以得到的最长时间，也是50ms

// http://www.zhangyunling.com/702.html
// requestIdleCallbakc的执行与requestAnimationFrame有一个相同的特性，不管当前帧，是否有空闲时间，
// 它的最早执行时间，都是在下一帧开始的
var requestId = requestIdleCallback(myNonEssentialWork,{
    timeout : 100
});
function myNonEssentialWork(deadline){ // 解构赋值 报错
    console.log(deadline.timeRemaining(), '??',deadline.didTimeout)
}


/**
 * requestIdleCallback的第二个参数，它是一个可配置的对象，只支持一个参数，timeout，
 * 如果一帧内，一直没有空闲的时间可以执行requestIdleCallback的回调函数的话，
 * 那么当到达timeout设置的超时时间，requestIdleCallback就不在保持原有的效果了，
 * 而是在到达超时时间时，立即把回调推入到正在执行的事件列表中，
 * 这个时候，requestIdleCallback的表现就与setTimeout的表现一致了。
 * 
 */


 /**
  * reconcile 阶段 可以被打断
  * commit 阶段 不能被打断
  * 
  * fiber 树 遍历规则 (深度优先遍历) fiber 是一个普通的 js 对象
  * 1. 先儿子 在弟弟  后叔叔
  * 2. 自己所有子节点完成算自己完成
  */