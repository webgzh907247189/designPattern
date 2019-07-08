
{
	const proto = {
		foo: 'hello'
	};

	const obj = {
	  	foo: 'world',
	  	find() {
	    	return super.foo;
	  	}
	};

	Object.setPrototypeOf(obj, proto);
	console.log(obj.find()) 	// "hello"
}

/** super.foo指向原型对象proto的foo方法，但是绑定的this却还是当前对象obj，因此输出的就是world。 */
{
	const proto = {
	  	x: 'hello',
	  	foo() {
	    	console.log(this.x);
	  	},
	};

	const obj = {
	  	x: 'world',
	  	foo() {
	    	super.foo();
	  	}
	}

	Object.setPrototypeOf(obj, proto);
	obj.foo() // "world"
}






let EventEmitter = require('events')
{
    // 使用 setPrototypeOf 实现继承
    function A(){}
    Object.setPrototypeOf(A.prototype,EventEmitter.prototype)

    let a = new A
    a.on('test',function(){
        console.log('订阅')
    })
    a.emit('test')
}

{
    class A {}
    
    class B {}
    
    // B 的实例继承 A 的实例
    Reflect.setPrototypeOf(B.prototype, A.prototype);
    
    // B 继承 A 的静态属性
    Reflect.setPrototypeOf(B, A);
    
    const b = new B();
}

// node 的 util 继承使用 Object.setPrototypeOf 实现继承
let util = require('util')
{
    // 使用 setPrototypeOf 实现继承
    function A(){}
    util.inherits(A,EventEmitter)

    let a = new A
    a.on('test111',function(){
        console.log('订阅-使用node的util实现继承')
    })
    a.emit('test111')
}