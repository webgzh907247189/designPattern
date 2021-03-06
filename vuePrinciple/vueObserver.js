
{
	let arr = []
	console.log(arr.__proto__ == Object.getPrototypeOf(arr))  //true
	console.log(Array.prototype == Object.getPrototypeOf(arr))//true


	console.log( Object.getPrototypeOf(arr).__proto__ === Array.prototype.__proto__ )  //true
	console.log( Object.getPrototypeOf(arr).__proto__ === Object.prototype )  //true
	console.log( Object.getPrototypeOf(arr).__proto__.__proto__ === null )  //true
}


{
	let arr = []
	console.log( Object.getOwnPropertyNames(arr) )//["length"]

	let obj = {}
	console.log( Object.getOwnPropertyNames(obj) )//[]
}


{
	let obj = {name: '111'}

	let a = Object.getOwnPropertyNames(obj)[0]
	let b = Object.getOwnPropertyDescriptor(obj,a)

	console.log(a,b)  // name   {value: "111", writable: true, enumerable: true, configurable: true}
}

/**
 * https://juejin.im/post/5b38527951882574a672615d
 * 
 * Object.getOwnPropertyNames(obj)  获取所有的keys  返回的是数组(包含不可以枚举的属性)  与 Object.keys() 返回的也是数组
 *
 * Object.getOwnPropertyDescriptor(obj,item)  获取obj 的 key 属性值  返回的是对象
 */
{
	let obj = {name: 'zzz'}
	obj.__proto__ = null

	Object.getOwnPropertyNames(obj).forEach((item)=>{
		let itemDesc = Object.getOwnPropertyDescriptor(obj,item)
		itemDesc.value = 'AAAAAAAAAAAAAA'
		Object.defineProperty(obj,item,itemDesc)
	})
	console.log(obj)   //{name: "AAAAAAAAAAAAAA"}

	Object.getOwnPropertyDescriptor(obj,'name')  //{value: "AAAAAAAAAAAAAA", writable: true, enumerable: true, configurable: true}
}





{
    let obj = {name: '11'}
    let s = Object.getOwnPropertyDescriptor(obj, 'name')
    var sarr = Object.getOwnPropertyNames(obj)
    console.log(s,sarr) // name 的描述符
}
{
    const obj = {
        foo: 123,
        get bar() { return 'abc' }
    };
      
    let s = Object.getOwnPropertyDescriptors(obj)
    console.log(s) // obj 对象 的描述符


    const target2 = {};
    Object.defineProperties(target2, Object.getOwnPropertyDescriptors(obj));
    let des = Object.getOwnPropertyDescriptor(target2, 'bar')
    console.log(des,target2) // get方法被成功拷贝
}

//Object.getOwnPropertyDescriptors() 配合Object.create()方法，将对象属性克隆到一个新对象。这属于浅拷贝。
{   
    const obj = {
        foo: 123,
        get bar() { return 'abc' }
    }; 
    const clone = Object.create(Object.getPrototypeOf(obj),Object.getOwnPropertyDescriptors(obj));
    console.log(clone, clone === obj)   // clone 跟 obj 属性一样
    console.log(Object.getOwnPropertyDescriptors(clone))
}
{
    let prot = {}
    const obj = Object.create(
        prot,
        Object.getOwnPropertyDescriptors({
          foo: 123,
        })
    );
    console.log(obj,prot)

    console.log(Object.getOwnPropertyDescriptors(obj))
}





//ES6 规定__proto__只有浏览器要部署，其他环境不用部署。
{
	let obj = {
		eat(){
			return '吃饭'
		}
	}

	let o = {
		__proto__: obj,
		eat(){
			return `${super.eat()} | 喝水`
		}
	}

	console.log(o.eat())  // 吃饭 | 喝水
}

{
	let obj = {
		eat(){
			return '吃饭'
		}
	}

	let o = {
		eat(){
			return `${super.eat()} | 喝水`
		}
	}

	Object.setPrototypeOf(o,obj)
	console.log(o.eat())  // 吃饭 | 喝水
}

/**
 * 如果第一个参数不是对象，会自动转为对象。但是由于返回的还是第一个参数，所以这个操作不会产生任何效果。
 */
{
	Object.setPrototypeOf(1, {}) === 1 // true
	Object.setPrototypeOf('foo', {}) === 'foo' // true
	Object.setPrototypeOf(true, {}) === true // true
}








{
	let fn = function (argument) {
		// body...
	}
	console.log(fn.name)  //fn



	let fn1 = function a(argument) {
		// body...

		// a()  // 内部可以调用，外部调用 会报错  外部无法调用
	}
	console.log(fn1.name)  //a

	a() //报错 (无法调用，只有在 a 函数内部可以成功调用)
}










/**
 * https://juejin.im/entry/5be0d229e51d4520fe640450
 *
 * Object.getOwnPropertyDescriptors(obj) 接受一个对象，并返回一个带有描述符集的对象。
 */

{
	let person1 = {
	    set name(newName) {
	    	console.log(newName)
	    }
	}

	let person2 = {}
	Object.assign(person2, person1)

	//person2 {name: undefined}
}


{
	let person1 = {
	    set name(newName) {
	    	console.log(newName)
	    }
	}

	let person2 = {}
	Object.assign(person2, person1)

	const person3 = {}
	Object.defineProperties(person3,Object.getOwnPropertyDescriptors(person1))
	person1.name = 'x'
	person2.name = 'x'
	person3.name = 'x'

	console.log(person1,person2,person3)
	/**
	 * person2 丢失了 setter ，因为它没有复制过来。  赋值之后，只有person2有 name 值
	 *
	 * 使用 Object.create() 对浅拷贝对象也有同样的限制。
	 */
}


















/**
 * Object.fromEntries()方法是Object.entries()的逆操作，用于将一个键值对数组转为对象。
 */
{
	let obj = Object.fromEntries([ ['foo', 'bar'],['baz', 42] ])
	// { foo: "bar", baz: 42 }
}

{
	const entries = new Map([
		['foo', 'bar'],
		['baz', 42]
	]);
	  
	let obj = Object.fromEntries(entries)
	// { foo: "bar", baz: 42 }
}

{
	const map = new Map().set('foo', true).set('bar', false);
	let obj = Object.fromEntries(map)
	// { foo: true, bar: false }

	let queryObj = Object.fromEntries(new URLSearchParams('foo=bar&baz=qux'))
	// { foo: "bar", baz: "qux" }
}










{
	let paramsString = "q=URLUtils.searchParams&topic=api"
	let searchParams = new URLSearchParams(paramsString);

	for (let p of searchParams) {
		console.log(p); // ["q", "URLUtils.searchParams"]   ["topic", "api"]
	}

	for (let p of searchParams.entries()) {
		console.log(p); // ["q", "URLUtils.searchParams"]   ["topic", "api"]
	}

	searchParams.has("topic") === true; // true

	searchParams.get("topic") === "api"; // true

	searchParams.getAll("topic"); // ["api"]

	searchParams.get("foo") === ""; // false   searchParams.get("foo") === null

	searchParams.append("topic", "webdev");
	searchParams.toString(); // "q=URLUtils.searchParams&topic=api&topic=webdev"

	searchParams.set("topic", "More webdev");   // 设置一个搜索参数的新值，假如原来有多个值将删除其他所有的值 (覆盖原有的值)。
	searchParams.toString(); // "q=URLUtils.searchParams&topic=More+webdev"

	searchParams.delete("topic");
	searchParams.toString(); // "q=URLUtils.searchParams"

	for (let p of searchParams.keys()) {
		console.log(p); // q

	for (let p of searchParams.values()) {
		console.log(p); // URLUtils.searchParams
	}
}
















{
	const ages = [11, 33, 12, 54, 18, 96];

	// 旧写法
	const youngest = Math.min.apply(Math, ages);
	const oldest = Math.max.apply(Math, ages);
	const type = Object.prototype.toString.call(youngest);
	console.log(youngest,oldest,type)  // 11 96 "[object Number]"

	// 新写法
	const youngestNew = Reflect.apply(Math.min, Math, ages);
	const oldestNew = Reflect.apply(Math.max, Math, ages);
	const typeNew = Reflect.apply(Object.prototype.toString, youngest, []);
	console.log(youngestNew,oldestNew,typeNew)  // 11 96 "[object Number]"
}