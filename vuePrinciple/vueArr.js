/**
 * https://juejin.im/post/5b213e956fb9a01e4f47ce69  
 * 从Vue数组响应化所引发的思考
 *
 * https://blog.csdn.net/sunq1982/article/details/80540548
 */

{
	let arr = []
	console.log(arr.__proto__ == Object.getPrototypeOf(arr))  //true
	console.log(Array.prototype == Object.getPrototypeOf(arr))//true
}



/**
 * 但其实setPrototypeOf方法是ECMAScript 6的方法，肯定不是Vue内部可选的实现方案
 */
{
	function observifyArray(array){
	  	//需要变异的函数名列表
	  	var methods = ['push', 'pop', 'shift', 'unshift', 'splice', 'sort', 'reverse'];
	  	var arrayProto = Object.create(Array.prototype);
	  	methods.forEach(function(method){
		    arrayProto[method] = function(...args){
		      // 劫持修改数据
		      var ret = Array.prototype[method].apply(this, args);
		      //可以在修改数据时触发其他的操作
		      console.log("newValue: ", this);
		      return ret;
		    }
	  	});
	  	Object.setPrototypeOf(array, arrayProto);
	}

	let arr = ['aa','bb','ccc']
	observifyArray(arr)
	/**
	 * 已经改变了 arr的数组方法了
	 * console.log(arr)  查看__proto__ 发现不一样了
	 */


	arr.push('111111111')
	console.log(arr)  // newValue:  (4) ["aa", "bb", "ccc", "111111111"]    ["aa", "bb", "ccc", "111111111"]


	arr.shift()
	console.log(arr) // newValue:  (3) ["bb", "ccc", "111111111"]    ["bb", "ccc", "111111111"]
}


/**
 * Vue的实现思路。
 */
{

	function observifyArray(array){
	  	//需要变异的函数名列表
	  	var methods = ['push', 'pop', 'shift', 'unshift', 'splice', 'sort', 'reverse'];
	  	var arrayProto = Object.create(Array.prototype);

	  	methods.forEach(function(method){
		    arrayProto[method] = function(...args){
		      
		      //可以在修改数据时触发其他的操作
		      console.log('我被改变啦!');

		      // 劫持修改数据
		      return Array.prototype[method].apply(this, args);;
		    }
	  	});
	  	
	  	array.__proto__ = arrayProto
	}


	let arr = ['aa','bb','ccc']
	observifyArray(arr)
	/**
	 * 已经改变了 arr的数组方法了
	 * console.log(arr)  查看__proto__ 发现不一样了
	 */


	arr.push('111111111')
	console.log(arr)  // 我被改变啦!    ["aa", "bb", "ccc", "111111111"]


	arr.shift()
	console.log(arr) // 我被改变啦!    ["bb", "ccc", "111111111"]
}


{
	function FakeArray() {
	    Array.apply(this,arguments);
	}

	FakeArray.prototype = [];
	FakeArray.prototype.constructor = FakeArray;

	FakeArray.prototype.push = function () {
	    console.log('我被改变啦');
	    return Array.prototype.push.apply(this,arguments);
	};

	let list = ['a','b','c'];

	let fakeList = new FakeArray(list);


	/**
	 * 结果发现fakeList并不是一个数组而是一个对象，作者当时这这样认为的:
	 * 构造函数默认返回的本来就是this对象，这是一个对象，而非数组。Array.apply(this,arguments);这个语句返回的才是数组
	 *
	 *
	 * 
	 * 采用new操作符调用构造函数会依次经历以下四个步骤:
	 *
	 * 创建新对象
	 * 将构造函数的作用域给对象(因此构造函数中的this指向这个新对象)
	 * 执行构造函数的代码
	 * 返回新对象(如果没有显式返回的情况下)
	 *
	 *
	 * 在没有显式返回的时候，返回的是新对象，因此fakeList是对象而不是数组。但是为什么不能强制返回Array.apply(this,arguments)。
	 * 这个数组是由原生的Array构造出来的，所以它的push等方法依然是原生数组的方法，无法到达重写的目的。
	 *
	 * 当我们给构造函数显式返回的时候，我们得到的fakeList就是原生的数组。因此调用push方法是没法观测到的。
	 * 但是我们不能返回的Array.apply(this,arguments)更深层的原因在于我们这边调用Array.apply(this,arguments)的目的是为了借用原生的Array的构造函数将Array属性赋值到当前对象上。
	 */
}


{
	class MyArray extends Array {

	}

	const a = new MyArray(1, 2, 3);
	const b = a.map(x => x);
	const c = a.filter(x => x > 1);

	console.log(b instanceof MyArray) // true
	console.log(c instanceof MyArray) // true
}

{

	class MyArray extends Array {
	  	static get [Symbol.species]() { 
	  		return Array; 
	  	}
	}

	const a = new MyArray();
	const b = a.map(x => x);

	console.log(a instanceof MyArray) // true
	console.log(a instanceof Array) // true

	console.log(b instanceof MyArray) // false
	console.log(b instanceof Array) // true
}