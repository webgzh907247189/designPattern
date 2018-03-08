{
	let strategyObj = {
	    isNotEmpty: function(value,errorMsg) {
	        if(value === '') {
	            return errorMsg;
	        }
	    },
	    // 限制最小长度
	    minLength: function(value,length,errorMsg) {
	        if(value.length < length) {
	            return errorMsg;
	        }
	    },
	    // 手机号码格式
	    mobileFormat: function(value,errorMsg) {
	        if(!/(^1[3|5|8][0-9]{9}$)/.test(value)) {
	            return errorMsg;
	        }
	    } 
	};


	class Validator {
		constructor(){
			this.cache = [];  // 保存效验规则
		}

		add(dom,rules){
			for(let itemRule of rules){
				((itemRule) => {
					let {strategy,errorMsg} = itemRule
					let [fnKey,length] = strategy.split(':')
					this.cache = [...this.cache,()=>{
							return strategyObj[fnKey].apply(dom,[dom.value,length || errorMsg,errorMsg])
						}
					]
				})(itemRule)
			}
		}

		start(){			
			for (let item of this.cache){
				let msg = item()
				if(msg){
					return msg
				}


				/*错误的写法, return直接跳出循环*/
				// return item && item() || undefined
			}
		}
	}

	let validatorRule = function(){
		let validator = new Validator()
		validator.add(registerForm.userName,[
	        {strategy: 'isNotEmpty',errorMsg:'用户名不能为空'},
	        {strategy: 'minLength:6',errorMsg:'用户名长度不能小于6位'}
	    ]);
	    validator.add(registerForm.password,[
	        {strategy: 'minLength:6',errorMsg:'密码长度不能小于6位'},
	    ]);
	    validator.add(registerForm.phoneNumber,[
	        {strategy: 'mobileFormat',errorMsg:'手机号格式不正确'},
	    ]);

		// let msg = validator.start()
		// if(msg){
		// 	return msg
		// }

		return validator.start() || undefined
	}

	let registerForm = document.getElementById("registerForm");
	registerForm.onsubmit = function(){

		let val = validatorRule()
		if(val){
			console.log(val)
			return false
		}

		// return validatorRule() && false
	}
}







/**
 *  var f 时，如果当前作用于下已经有了一个同名的变量，编译器会忽略这个声明，所以不存在f被undefined 覆盖的情况
 *  
 */
// {
// 	var x = 0;  
// 	f();  
// 	console.log(x);  
// 	var f = function(){  
// 	    x = 1;  
// 	}  
// 	f();  
// 	console.log(x);  
// 	function f(){  
// 	    x = 2;  
// 	}  
// 	f();  
// 	console.log(x);  
// }