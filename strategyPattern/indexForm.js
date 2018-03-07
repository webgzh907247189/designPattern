{
	let strategy = {
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

		add(dom,rule,errorMsg){
			let [fnKey,length] = rule.split(':')
			this.cache = [...this.cache,()=>{
					return strategy[fnKey].apply(dom,[dom.value,length,errorMsg])
				}
			]
		}

		start(){
			for (let item of this.cache){
				// let msg = item()
				// if(msg){
				// 	return msg
				// }
				
				// let a = item && item()
				// console.log(a,'start()')
				// a && ( ()=> a )()

				return item && item() || undefined
			}
		}
	}

	let validatorRule = function(){
		let validator = new Validator()
		validator.add(registerForm.password,'minLength:6','密码长度不能小于6位');
		let msg = validator.start()

		console.log(msg,'msg',typeof(msg))
		if(msg){
			return msg
		}
	}

	let registerForm = document.getElementById("registerForm");
	registerForm.onsubmit = function(){
		let a = validatorRule()

		console.log(a,'aa')
		return false
	}
}
