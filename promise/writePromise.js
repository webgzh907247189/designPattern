{
	class MyPromise{
		constructor(callback){
			this.__succ_res = null;     //保存成功的返回结果
	        this.__err_res = null;      //保存失败的返回结果
	        this.status = 'pending';    //标记处理的状态

	        callback((...arg) => {
	            this.__succ_res = arg;
	            this.status = 'success';
	        }, (...arg) => {
	            this.__err_res = arg;
	            this.status = 'error';
	        });
		}

		then(onFulfilled, onRejected){
			// if (this.status === 'success') {
			// 	onFulfilled(...this.__succ_res);
			// } else if (this.status === 'error') {
			// 	onRejected(...this.__err_res);
			// };


			// 采用Map 集合映射来完成
			let map = new Map([
				[{status: 'success',res: this.__succ_res},onFulfilled],
				[{status: 'error',res: this.__err_res},onRejected]
			])

			for(let [{status,res},fn] of map){
				if(status == this.status){
					fn(...res)
				}
			}
		}
	}


	new MyPromise((resolve,reject)=>{
		resolve(1)
	}).then((res)=>{
		console.log(res,'res')
	})
}


/**
 * 可以异步调用
 */
{
	class MyPromise{
		constructor(callback){
			this.__succ_res = null;     //保存成功的返回结果
	        this.__err_res = null;      //保存失败的返回结果
	        this.status = 'pending';    //标记处理的状态
	        this.__queue = [];          //事件队列

	        callback((...arg) => {
	            this.__succ_res = arg;
	            this.status = 'success';
	            this.__queue.forEach(json => {
	               json.resolve(...arg);
	            });
	        }, (...arg) => {
	            this.__err_res = arg;
	            this.status = 'error';
	            this.__queue.forEach(json => {
                	json.reject(...arg);
            	});
	        });
		}

		then(onFulfilled, onRejected){
			// 采用Map 集合映射来完成
			let map = new Map([
				[{status: 'success',res: this.__succ_res},onFulfilled],
				[{status: 'error',res: this.__err_res},onRejected],
				[{status: '',res: ''},{resolve: onFulfilled, reject: onRejected}]
			])

			for (let [{status,res},fn] of map){
				if (status == this.status){
					fn(...res)
				} else if(status == '') {
					 this.__queue.push(fn)
				}
			}
		}
	}

	new MyPromise((resolve,reject)=>{
		setTimeout(()=>{
			resolve(1)
		},1000)
	}).then((res)=>{
		console.log(res,'res')
	})
}


{
	
}