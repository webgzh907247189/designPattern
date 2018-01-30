/**
 * http://www.cnblogs.com/chenqf/p/7412520.html
 * https://www.cnblogs.com/chenqf/p/6386163.html (缓存文章 cache-control)
 *
 * 
 * https://www.cnblogs.com/beidan/p/cache.html  (缓存,优化)
 * 加载静态资源使用与页面不同的域名 (cathay静态资源与模板url不一样) 
 * 		当浏览器向服务器请求一个静态资源时,会先发送同域名下的 cookie，服务器对于这些 cookie 不会做任何处理。因此它们只是在毫无意义的消耗带宽。所以你应该确保对于静态内容的请求是无coockie的请求。
 *   	静态资源和主页面不同域，这样加载资源的http请求就不会带上主页面种的cookie等数据，减少了数据传输量。节省流量，提升上传效率
 *
 * 动静分离，减少核心服务器的压力( -> nginx)
 *
 * 并发限制 (浏览器对同一个域名下的请求有并发的限制，（ie6为2个，其他为6个）设置单独域名服务器，可以提升请求并发数，也就是令浏览器并行下载更多资源，提高站点性能)
 *
 * 方便复用－－放在另一个服务器上，可以方便全局内其他产品的使用。
 */


/**
 * ES6新增了Promise函数用于简化项目代码流程。然而在使用promise时，我们仍然要使用callback，并且并不知道程序要干什么
 */
{
	let waitOneSecond = function () {
		return new Promise((resolve,reject)=>{
			resolve()
		})
	}

	function doSomething() {
	    let i = 0;
	    waitOneSecond() // 返回一个Promise对象
	        .then(() => console.log(i));    //5
	    i = 5;
	}

	doSomething()
}

{	
	let waitOneSecond = function () {
		return new Promise((resolve,reject)=>{
			resolve()
		})
	}

	async function doSomething(){
		let i = 0;
	    await waitOneSecond() // 返回一个Promise对象
	    console.log(i)   //0
	    i = 5;
	}
	doSomething()
}






/**
 * 乱用async/await，可能导致低效的设计模式。例如，假设我们想从数据库中获得一些用户他们的年龄平均
 * 假设我们有5个用户，上面的代码片段会轮训所有的用户并且等待每一个单独调用数据库，所以最终整个函数的等待时间是5秒。
 */

{	
	function waitOneSecond(userId){
		return new Promise((resolve,reject)=>{
			setTimeout(()=>{
				resolve(userId*1)
			},1000)
		})
	}
	async function getUserAge(userId) {
	   return await waitOneSecond(userId);// 等待1秒
	}
	async function getAverageAge(userIds) {
	    let sumOfAges = 0;
	    let numOfUsers = userIds.length;
	    for (let userId of userIds) {
	        sumOfAges += await getUserAge(userId);
	    }
	    return sumOfAges / numOfUsers;
	}
	console.log(`开始时间：${new Date().getSeconds()}`)
	let num = await getAverageAge(['1','2','3'])
	console.log(`结束时间：${new Date().getSeconds()},${num}`)
}
/**
 * 上面耗时大概3s(查询一次消耗一次时间)
 * 下面的耗时大概1s(只会查询一次)
 */

{
	function getUserAge(userId){
		return new Promise((resolve,reject)=>{
			setTimeout(()=>{
				resolve(userId*1)
			},1000)
		})
	}
	async function getAverageAge(userIds) {
	    let sumOfAges = 0;
	    let numOfUsers = userIds.length;
	    let agesPromises = userIds.map(getUserAge);//将每个用户对应的promise对象封装到数组中
	    let ages = await Promise.all(agesPromises);//使用Promise.all调用

	    return ages.reduce((result,item)=>{
	    	return result += item
	    },0)/numOfUsers
	}
	console.log(`开始时间：${new Date().getSeconds()}`)
	let num = await getAverageAge(['1','2','3'])
	console.log(`结束时间：${new Date().getSeconds()},${num}`)
}

{
	function a(){
		return '1'
	}

	function b(){
		return '11'
	}

	function c(){
		return '111'
	}

	let aa = await Promise.all([a(),b(),c()])
	let sumOfAges = aa.reduce((result,item)=>{
		return result += item*1
	},0)
	console.log(sumOfAges)
}




// https://www.cnblogs.com/onepixel/p/7143769.html