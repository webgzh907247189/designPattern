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
					return strategy[fnKey].apply(dom,[dom.value,length || errorMsg,errorMsg])
				}
			]
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
		validator.add(registerForm.password,'minLength:6','密码长度不能小于6位');
		validator.add(registerForm.userName,'isNotEmpty','用户名不能为空');
		validator.add(registerForm.phoneNumber,'mobileFormat','手机号码格式不正确');

		// let msg = validator.start()
		// if(msg){
		// 	return msg
		// }

		return validator.start() || undefined
	}

	let registerForm = document.getElementById("registerForm");
	registerForm.onsubmit = function(){

		// let val = validatorRule()
		// if(val){
		// 	console.log(val)
		// 	return false
		// }
		
		return validatorRule() && false
	}
}
