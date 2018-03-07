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

		add(dom,rules){

			for(let itemRule of rules){
				((itemRule) => {
					let {strategy:strategy1,errorMsg} = itemRule
					let [,length] = strategy1.split(':')
					this.cache = [...this.cache,()=>{
							return strategy[strategy1].apply(dom,[dom.value,length || errorMsg,errorMsg])
						}
					]
				})(itemRule)
			}
		}

		start(){
			console.log(this.cache[1]())
			return true

			
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
	    // debugger

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

		let msg = validator.start()
		if(msg){
			return msg
		}

		// return validator.start() || undefined
	}

	let registerForm = document.getElementById("registerForm");
	registerForm.onsubmit = function(){

		let val = validatorRule()
		console.log(val,'11')
		if(val){
			console.log(val)
			return false
		}

		return false

		// return validatorRule() && false
	}
}
