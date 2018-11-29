/**
 * https://juejin.im/entry/5bfd6f906fb9a049fa0f7478
 */

{
	class Button {
	    constructor (light) {        
	    	this.light = light;    
	    }

	    onPress () {        
	    	if (this.light.status === 'close') {            
	    		this.light.status = 'open';
	            console.log('开灯');        
	        } else {            
	        	this.light.status = 'close';
	            console.log('关灯');        
	        }    
	    }
	}

	class Light {
	    constructor () {
	        this.status = 'close';    
	    }
	}

	const light = new Light();
	const button = new Button(light);
	button.onPress();
	button.onPress();
	button.onPress();
}


{
	class Button {
	    constructor (light) {        
	    	this.light = light;    
	    }
	    onPress () {        
	    	if (this.light.status === 'close') {            
	    		this.light.status = 'light';
	            console.log('开弱光灯');        
	        } else if (this.light.status === 'light') {            
	        	this.light.status = 'strong';
	            console.log('开强光灯');        
	        } else {            
	        	this.light.status = 'close';
	            console.log('关灯');        
	        }    
	    }
	}

	class Light {
	    constructor () {
	        this.status = 'close';    
	    }
	}

	const light = new Light();
	const button = new Button(light);
	button.onPress();
	button.onPress();
	button.onPress();
}



/**
 *  允许一个对象在其内部状态变化时候去改变它的行为, 对象似乎看起来改变了它的类
 */
{
	class Button {
	    constructor (light) {        
	    	this.weakLightStatus = new WeakLightStatus(light);
	        this.strongLightStatus = new StrongLightStatus(light);        
	        this.offLightStatus = new OffLightStatus(light);    
	    }    
	    onPress () {
	        this[light.status].onPress();    
	    }
	}

	class Light {
	    constructor () {        
	    	this.status = 'offLightStatus';
	    }
	    // 切换状态类
	    setStatus (statusClass) {
	        this.status = statusClass;
	    }
	}// 抽象类

	class LightStatus {
	    constructor (light) {        
	    	this.light = light;
	    }
	}// 弱光

	class WeakLightStatus extends LightStatus {    
		constructor (light) {        
			super(light);    
		}    

		onPress () {        
			this.light.setStatus('strongLightStatus');        
			console.log('开弱光灯');    
		}
	}

	// 强光
	class StrongLightStatus extends LightStatus {    
		constructor (light) {        
			super(light);    
		}    
		onPress () {
	        this.light.setStatus('offLightStatus');
	        console.log('开强光灯');    
	    }
	}// 关闭

	class OffLightStatus extends LightStatus {    
		constructor (light) {        
			super(light);    
		}    
		onPress () {        
			this.light.setStatus('weakLightStatus');        
			console.log('关灯');
    	}
	}

	const light = new Light();
	const button = new Button(light);

	button.onPress();
	button.onPress();
	button.onPress();
	button.onPress();
}

/**
 * 归纳分析: (状态模式描述了对象状态的变化以及对象如何在每一种状态下表现出不同的行为。)
 * 把变化的属性(状态)封装成不同的类, 并把请求委托给当前的对象状态, 不同的状态此时执行不同的行为
 * 从使用者角度看, 我们使用的对象在不同状态下有不同的行为, 彷佛这个对象是由不同类实例化而来, 这是因为请求委托的缘故
 */



/** 状态模式包含如下角色：
 * Context: 环境类   State: 抽象状态类   ConcreteState: 具体状态类
 *
 * 类比之前我们上述的实例场景: Context指的就是Button类. State指的就是LightStatus. ConcreteState指的就是各个不同状态的类。
 * 状态模式描述了对象状态的变化以及对象如何在每一种状态下表现出不同的行为。
 * 状态模式的关键是引入了一个抽象类来专门表示对象的状态，这个类我们叫做抽象状态类，而对象的每一种具体状态类都继承了该类，并在不同具体状态类中实现了不同状态的行为，包括各种状态之间的转换。
 *
 */