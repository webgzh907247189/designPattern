/**
 * {
 * 	rss: 4935680,
 *  heapTotal: 1826816,
 *  heapUsed: 650472,
 *  external: 49879
 * }
 *
 * heapTotal 和 heapUsed 代表V8的内存使用情况。 
 * external代表V8管理的，绑定到Javascript的C++对象的内存使用情况。 
 * rss, 驻留集大小, 是给这个进程分配了多少物理内存(占总分配内存的一部分) 这些物理内存中包含堆，栈，和代码段。

对象，字符串，闭包等存于堆内存。 变量存于栈内存。 实际的JavaScript源代码存于代码段内存。
 */

function test() {
  	var a = new Array(1000000).join('*');
  	// for (var i = 0; i < 50; i++) {
  	//   a[i] = new Array(1000000).join('*');
  	// }
  	return function() {
    	eval("");
  	}
}

var format = function(bytes){
  	return (bytes / 1024 / 1024).toFixed(2) + ' MB';
};
var temp = [];
var mem = process.memoryUsage(); // 获取内存使用情况 
console.log('已使用堆大小 heapUsed：' + format(mem.heapUsed));

global.gc();
let count = 0
let time = setInterval(function() {
	count++
  	temp.push(test()); //把函数保存起来，里面的函数 里面的eval 随时可能用到 a ，所以不敢回收
  	//test()();// 会被回收
  	global.gc();
  	mem = process.memoryUsage(); // 重新获取内存使用情况 对象
	console.log('运行代码后-已使用堆大小 heapUsed：' + format(mem.heapUsed),process.pid);
	  
	if(count == 10){
		clearInterval(time)
	}
}, 2000);


let time2 = setInterval(()=>{
	global.gc();
	mem = process.memoryUsage(); // 重新获取内存使用情况 对象
	console.log('即将关闭 -》 运行代码后-已使用堆大小 heapUsed：' + format(mem.heapUsed));
},10000)


setInterval(()=>{
	clearInterval(time2)
	temp = null
	global.gc();
	mem = process.memoryUsage(); // 重新获取内存使用情况 对象
	console.log('即将关闭111111 -》 运行代码后-已使用堆大小 heapUsed：' + format(mem.heapUsed));
},60000)