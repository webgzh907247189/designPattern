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
 *
 * generator的yield表示： 后面表达式的值
 */


/**
 * ES6新增了Promise函数用于简化项目代码流程。然而在使用promise时，我们仍然要使用callback，并且并不知道程序要干什么
 * https://juejin.im/post/5a7125c36fb9a01c952663d1?utm_source=gold_browser_extension
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

/**
 * 每次调用 next 方法，会返回一个对象，表示当前阶段的信息（ value 属性和 done 属性）。
 * value 属性是 yield 语句后面表达式的值，表示当前阶段的值；-> (一条直线被2个点，分为3段)
 * done 属性是一个布尔值，     表示Generator函数是否执行完毕（不是表示yield是否执行完毕）    ，即是否还有下一个阶段。 <false: 没有执行完毕，true: 执行完毕>
 */


{
	let draw = function (count){
		// 抽奖业务逻辑
		console.log(`剩余的次数${count}`)
	}

	let drawCount = function *(count){
		while(count>0){
			count--
			yield draw(count)
		}
	}

	let drawDes = drawCount(5)
	let div = document.createElement('div')
	div.id = 'create-element-by-test'
	// div.innerHTML = '13213213'
	div.textContent = 'this is test for createElement'
	document.body.appendChild(div)

	document.getElementById('create-element-by-test').addEventListener('click',()=>{
		/**
		 * 调用Generator函数不会立即执行，而是返回遍历器对象。疲于手动执行遍历器对象
		 */
		let a = drawDes.next()
		console.log(a)   //{value: undefined, done: false or true}
	},false)
}


{
	let ajax = function *(){
		yield new Promise((resolve,reject)=>{
			setTimeout(()=>{
				resolve({code: '0'})
			},200)
		})
	}

	/**
	 * 调用Generator函数不会立即执行，而是返回遍历器对象。疲于手动执行遍历器对象
	 */
	let pull = function(){
		let gen = ajax()
		let step = gen.next()
		step.value.then((d)=>{
			if(d.code !== '0'){
				setTimeout(()=>{
					console.log('wait')
					pull()
				},1000)
			}else{
				console.log('完成')
			}
		})
	}

	pull()
}








/**
 *  async关键字表示是一个异步的函数，await表示需要等待执行。相对于yield表达式，语义化更强。
 *  async函数返回值是Promise对象，这比Generator函数的返回值是Iterator对象方便多了，可以使用then方法来指定下一步的操作。
 *  
 *  await关键字后边的表达式可以是一个Promise对象，或者简单(复杂)数据类型(Number, String, RegExp, Boolean, Array, Objext)。
 *  如果是简单(复杂)数据类型，async函数会隐式调用Promise.resolve方法将其转换为Pormise对象。
 */
async function as () {
  return await 123   //如果是其他数据类型，也是如此。
}
as().then(data => {
  console.log(data)
})  // 123

// 如果await关键字后面的表达式是非Promise、非thenable的普通的值，则会隐式调用Promise.resolve方法将其转换为Promise对象





// 如果某个await关键字后面的表达式抛出错误，async函数的状态就会变为reject，那么函数就会暂停执行，后面的表达式就不会在继续执行。
// 因为Promise函数有一个特点是，一旦状态改变，就不会再变，之后在调用也是保持同一个状态。
function foo () {
  throw new Error('err')
}
async function as () {
  await foo()
  return Promise.resolve('succ') // 不会执行到这里，因为Promise对象的状态一旦改变就不会在变了，因此不执行。
}
as()
.then(data => {})
.catch(err => {
	console.log(err);
})




/**
 * 因为async函数默认情况下返回的是Promise对象，因此可以将async函数作为await关键字后面的表达式。
 */
async function foo () {
  return Promise.resolve('async')
}
async function as () {
  return await foo()   // 调用foo函数会返回Promise对象
}
as().then(data => {
  console.log(data)
})






/**
 * 如果async函数内部没有抛出错误，函数正常执行。那么每一个await关键字后面的异步任务会继发执行。
 * 也就是说，一个异步任务结束之后才会执行另外一个异步任务，而不是并发执行。
 */

async function foo () {
  return new Promise((resolve, reject) => {
    window.setTimeout(() => {
      resolve(10)
    }, 1000)
  })
}
async function bar () {
  return new Promise((resolve, reject) => {
    window.setTimeout(() => {
      resolve(20)
    }, 2000)
  })
}
async function as () {
  let t1 = Date.now()
  const a = await foo()
  const b = await bar()
  let t2 = Date.now()
  console.log(t2 - t1)  // 有误差，大概3004ms
  return a + b
}
as().then(data => {
  console.log(data)   // 大概3s后输入30
})



// 方法二:
async function as () {
  const t1 = Date.now()
  const arr = await Promise.all([foo(), bar()])
  const t2 = Date.now()
  console.log(t2 - t1)
  return arr[0] + arr[1]
}
as().then(data => {
  console.log(data)  // 30
})


// 方法一：
async function as () {
  const t1 = Date.now()
  const [fo, ba] = [foo(), bar()]
  // 以上两个函数同时执行，并将结果作为await关键字的表达式
  const a = await fo
  const b = await ba
  const t2 = Date.now()
  console.log(t2 - t1)
  return a + b
}




/**
 * try...catch只能用于处理同步的操作，对于异步任务无法捕获到错误。
 * 而await关键字能够暂停函数处理，等待异步任务结束之后返回。
 * 因此在async函数中使用try...catch结合await关键字捕获异步错误是一个不错的方法。
 */
async function as () {
  let a = 0
  let b = 0
  try {
    a = await foo()
    b = await bar()
  } catch (e) {}
  return a + b
}
as().then(data => {
  console.log(data) // 30
})


/**
 * async函数是基于Generator函数实现的，是Generator函数的语法糖。其内置执行器，调用后返回Promise对象.......
 * async函数内部抛出错误或者await关键字后面的表达式抛出错误，会使async函数返回的Promise对象从pending状态变为reject状态，从而可以被catch方法捕获错误。
 * 而且，Promise对象的状态一旦改变就不会再变，之后的异步任务就不会执行了。
 *
 * await关键字后面的表达式可以是Promise对象，也可以是其他数据类型。如果是其他数据类型，则会通过Promise.resolve将其转换为Promise对象
 *
 * async函数内部如果有多个await关键字，其后的异步任务会继发执行。如果每一个异步任务不相互依赖，则可以使用Promise.all让其并发执行，
 * 这样可以在同样的时间里完成多个异步任务，提高函数执行效率。
 *
 * 对于async内部抛出的错误，可以使用try...catch来捕获异常。
 * 虽然try...catch只能用于捕获同步任务，但是await关键字可以使得异步任务同步化,因此可以结合try...catch和await关键字捕获异步任务。
 */

{
	function foo (obj) {
	  return new Promise((resolve, reject) => {
	    window.setTimeout(() => {
	      let data = {
	        height: 180
	      }
	      data = Object.assign({}, obj, data)
	      resolve(data)
	    }, 1000)
	  })
	}

	function bar (obj) {
	  return new Promise((resolve, reject) => {
	    window.setTimeout(() => {
	      let data = {
	        talk () {
	          console.log(this.name, this.height);
	        }
	      }
	      data = Object.assign({}, obj, data)
	      resolve(data)
	    }, 1500)
	  })
	}

	function main () {
	  return new Promise((resolve, reject) => {
	    const data = {
	      name: 'keith'
	    }
	    resolve(data)
	  })
	}


	main().then(data => {
	  foo(data).then(res => {
	    bar(res).then(data => {
	      return data.talk()   // keith 180
	    })
	  })
	})


	function *gen () {
	  const data = {
	    name: 'keith'
	  }
	  const fooData = yield foo(data)
	  const barData = yield bar(fooData)
	  return barData.talk()
	}

	function run (gen) {
	  const g = gen()
	  const next = data => {
	    let result = g.next(data)
	    if (result.done) return result.value
	    result.value.then(data => {
	      next(data)
	    })
	  }
	  next()
	}
	run(gen)

	async function main () {
	  const data = {
	    name: 'keith'
	  }
	  const fooData = await foo(data)
	  const barData = await bar(fooData)
	  return barData
	}
	main().then(data => {
	  data.talk()
	})
}


/**
 *  https://segmentfault.com/a/1190000007678185  (promise的reject之后，then还会执行)
 */




/**
 * Promise.all() 里面放的是数组，实际上all() 里面存放着是多个promise 
 *
 * p1(),p2(),p3()  三个运行完之后，是三个promise实例
 */
function p1(){
	return new Promise((resolve,reject)=>{
        setTimeout(()=>{
            resolve('111')
        },2000)
    })
}

function p2(){
	return new Promise((resolve,reject)=>{
        setTimeout(()=>{
            resolve('2222')
        },0)
    })
}

function p3(){
	return new Promise((resolve,reject)=>{
        setTimeout(()=>{
            resolve('333')
        },1000)
    })
}

Promise.all([p1(),p2(),p3()]).then((d)=>{
	console.log(d)   // ["111", "2222", "333"]
})





/**
 * promise的reject之后，then还会执行
 * then 是上面的promise 运行完成之后，才运行的函数(resolve,reject 都会运行then)
 */
new Promise((resolve,reject)=>{
	setTimeout(()=>{
		resolve('111')
	},2000)
}).then((d)=>{
	console.log('AAAAAAAAAAAAAAAAAAAAAAAAAA')  // AAAAAAAAAAAAAAAAAAAAAAAAAA
	console.log(d)                             // 111
})





/**
 * https://juejin.im/post/5b6e5cbf51882519ad61b67e#heading-8
 */
{
	let promise = new Promise(function(resolve,reject){
    	throw new Error('出错了') // 抛出错误
	})

	promise.then(()=>{
	    console.log('success1')
	},()=>{
	    console.log('error1')
	})
	/**
	 * 如果发现错误，就会进入失败态 不需要手动的   reject
	 */
}



/**
 * 异步迭代器
 */
{
	let promise = [
		new Promise((res,rej)=>{
			setTimeout(()=>{
				res('111')
			},7000)
		}),
		new Promise((res,rej)=>{
			setTimeout(()=>{
				res('222')
			},1000)
		}),
		new Promise((res,rej)=>{
			res('333')
		}),
	]

	async function test(){
		for await (let item of promise){
			console.log(item)
		}
	}
	test()
}




{
	function* a(){
		yield 'a'
		yield 'b'
		return 'c'
	}
	
	let g = a()
	for(let item of g){
		console.log(item,'~~')
	}
	/** return 的不参与for  of 循环 */
	/**
	 * a ~~
	 * b ~~
	 */
}

{
	function* a(){
		yield 'a'
		yield 'b'
		return 'c'
	}
	
	let g = a()
	
	let [one,two] = g
	console.log(one,two)
	/**
	 * a
	 * b
	 */
}





{

	https://juejin.im/post/5b784baf51882542ed141a84?utm_source=gold_browser_extension
	https://juejin.im/post/5b798501f265da43473130a1?utm_source=gold_browser_extension
	https://juejin.im/post/5a9315e46fb9a0633a711f25
	https://www.jianshu.com/p/22f82cc60285
	https://github.com/pyloque/fastscan/blob/master/index.js
	http://www.ayqy.net/blog/es-module/
	http://www.ayqy.net/blog/es-module/

	https://juejin.im/post/5b561426518825195f499772
	https://juejin.im/post/5b02fe326fb9a07ab1117c82
	https://juejin.im/post/5b06f44b6fb9a07abc2a53c1
	https://juejin.im/post/5af38e0c518825670c45ef6e
}	


{
    class Schedure{
        async add(p){
            // Schedure.arr.push(p)
            // console.log(Schedure.arr)

            // Promise.resolve('1').then(()=>{
            //     Promise.race(Schedure.arr[0](),Schedure.arr[1]()).then(()=>{
            //         console.log(d,'ddd')
            //     })
            // })
            // return new Promise((resolve,reject)=>{resolve('1')})
            await Schedure.arr.push(p)
        }
        static arr = []
    }

    const timeout = (time) => new Promise(resolve => {
        setTimeout(resolve,time)
    })

    const schedure = new Schedure()
    const addTask = (time,order) => {
        schedure.add(() => timeout(time)).then(() => console.log(order))
    }

    addTask(1000,'1')
    addTask(500,'2')
    addTask(300,'3')
    addTask(400,'4')
    console.log(Schedure.arr)

    //2314
}