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
			this.cache = [...this.cache,strategy[fnKey].apply(dom,[dom.value,length,errorMsg])]
		}

		start(){
			for (let item of this.cache){
				item()
			}
		}
	}

	let validator = new Validator()
	validator.add(registerForm.password,'minLength:6','密码长度不能小于6位');
}