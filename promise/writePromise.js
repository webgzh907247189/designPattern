/**
 * https://juejin.im/post/5bfc9e4ee51d451dca4794af
 * 慕课的高阶组件  &  node stream
 */

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
			return new MyPromise((resFn,rejFn)=>{
				// 采用Map 集合映射来完成
				let map = new Map([
					[{status: 'success',res: this.__succ_res},handle],
					[{status: 'error',res: this.__err_res},errBack],
					[{status: '',res: ''},'']
				])

				for (let [{status,res},fn] of map){
					if (status == this.status){
						fn(...res)
					} else if(status == '') {
						 this.__queue.push({resolve: handle, reject: errBack})
					}
				}

				function handle(value) {
					//then方法的onFulfilled有return时，使用return的值，没有则使用保存的值
	                let returnVal = onFulfilled instanceof Function && onFulfilled(value) || value;

	                //如果onFulfilled返回的是新MyPromise对象或具有then方法对象，则调用它的then方法
	                if (returnVal && returnVal['then'] instanceof Function) {
	                    returnVal.then(res => {
	                        resFn(res);
	                    }, err => {
	                        rejFn(err);
	                    });
	                } else {//其他值
	                    resFn(returnVal);
	                };
				}

				/**
				 * 值得一提的是，如果返回的是普通值，应该调用的是resFn，而不是rejFn，
				 * 因为这个返回值属于新MyPromise对象，它的状态不因当前MyPromise对象的状态而确定。即是，返回了普通值，未表明reject状态，我们默认为resolve状态。
				 *
				 */
				function errBack(reson) {
					if (onRejected instanceof Function) {
			        	//如果有onRejected回调，执行一遍
			            let returnVal = onRejected(reason);

			            //执行onRejected回调有返回，判断是否thenable对象
			            if (typeof returnVal !== 'undefined' && returnVal['then'] instanceof Function) {
			                returnVal.then(res => {
			                    resFn(res);
			                }, err => {
			                    rejFn(err);
			                });
			            } else {
			                //无返回或者不是thenable的，直接丢给新对象resFn回调
			                resFn(returnVal);				//resFn，而不是rejFn
			            };
			        } else {//传给下一个reject回调
			            rejFn(reason);
			        };
				}
			})
		}
	}

	new MyPromise((resolve,reject)=>{
		setTimeout(()=>{
			resolve(1)
		},1000)
	}).then((res)=>{
		console.log(res,'res')
		return 'aaa'
	}).then((res)=>{
		console.log(res,'res')
		return 'aaa'
	})
}


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
			return new MyPromise((resFn,rejFn)=>{
				// 采用Map 集合映射来完成
				let map = new Map([
					[{status: 'success',res: this.__succ_res},handle],
					[{status: 'error',res: this.__err_res},errBack],
					[{status: '',res: ''},'']
				])

				for (let [{status,res},fn] of map){
					if (status == this.status){
						fn(...res)
					} else if(status == '') {
						 this.__queue.push({resolve: handle, reject: errBack})
					}
				}

				function handle(value) {
					//then方法的onFulfilled有return时，使用return的值，没有则使用保存的值
	                let returnVal = onFulfilled instanceof Function && onFulfilled(value) || value;

	                //如果onFulfilled返回的是新MyPromise对象或具有then方法对象，则调用它的then方法
	                if (returnVal && returnVal['then'] instanceof Function) {
	                    returnVal.then(res => {
	                        resFn(res);
	                    }, err => {
	                        rejFn(err);
	                    });
	                } else {//其他值
	                    resFn(returnVal);
	                };
				}

				/**
				 * 值得一提的是，如果返回的是普通值，应该调用的是resFn，而不是rejFn，
				 * 因为这个返回值属于新MyPromise对象，它的状态不因当前MyPromise对象的状态而确定。即是，返回了普通值，未表明reject状态，我们默认为resolve状态。
				 *
				 */
				function errBack(reson) {
					if (onRejected instanceof Function) {
			        	//如果有onRejected回调，执行一遍
			            let returnVal = onRejected(reason);

			            //执行onRejected回调有返回，判断是否thenable对象
			            if (typeof returnVal !== 'undefined' && returnVal['then'] instanceof Function) {
			                returnVal.then(res => {
			                    resFn(res);
			                }, err => {
			                    rejFn(err);
			                });
			            } else {
			                //无返回或者不是thenable的，直接丢给新对象resFn回调
			                resFn(returnVal);				//resFn，而不是rejFn
			            };
			        } else {//传给下一个reject回调
			            rejFn(reason);
			        };
				}
			})
		}
	}



	MyPromise.resolve = (arg) => {
	    if (typeof arg === 'undefined' || Number.isNaN(arg)) { //无参数 / null(arg == null)
	        return new MyPromise((resolve) => {
	            resolve(arg);
	        });
	    } else if (arg instanceof MyPromise) {
	        return arg;
	    } else if (arg['then'] instanceof Function) {
	        return new MyPromise((resolve, reject) => {
	            arg.then((res) => {
	                resolve(res);
	            }, err => {
	                reject(err);
	            });
	        });
	    } else {
	        return new MyPromise(resolve => {
	            resolve(arg);
	        });
	    }
	};

	MyPromise.reject = (arg) => {
	    return new MyPromise((resolve, reject) => {
	        reject(arg);
	    });
	};
}


{
	class MyPromise {
		constructor(fn) {
			//...略
		}
	    then(onFulfilled, onRejected) {
	    	//...略
		}
	    catch(errHandler) {
	        return this.then(undefined, errHandler);
	    }
	    finally(finalHandler) {
	        return this.then(finalHandler, finalHandler);
	    }
	};
}


{
	MyPromise.all = (arr) => {
	    if (!Array.isArray(arr)) {
	        throw new TypeError('参数应该是一个数组!');
	    };
	    return new MyPromise(function(resolve, reject) {
	        let i = 0, result = [];
	        next();
	        function next() {
	            //如果不是MyPromise对象，需要转换
	            MyPromise.resolve(arr[i]).then(res => {
	                result.push(res);
	                i++;
	                if (i === arr.length) {
	                    resolve(result);
	                } else {
	                    next();
	                };
	            }, reject);
	        };
	    })
	};

	MyPromise.race = arr => {
	    if (!Array.isArray(arr)) {
	        throw new TypeError('参数应该是一个数组!');
	    };
	    return new MyPromise((resolve, reject) => {
	        let done = false;
	        arr.forEach(item => {
	            //如果不是MyPromise对象，需要转换
	            MyPromise.resolve(item).then(res => {
	                if (!done) {
	                    resolve(res);
	                    done = true;
	                };
	            }, err => {
	                if (!done) {
	                    reject(err);
	                    done = true;
	                };
	            });
	        })
	    })

	}
}






/**
 * 异步迭代器
 */
{
	let promise = [
		new Promise((res,rej)=>{
			setTimeout(()=>{
				res('111')
			},7000)
		}),
		new Promise((res,rej)=>{
			setTimeout(()=>{
				res('222')
			},1000)
		}),
		new Promise((res,rej)=>{
			res('333')
		}),
	]

	async function test(){
		for await (let item of promise){
			console.log(item)
		}
	}
	test()
}