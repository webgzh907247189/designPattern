/**
 * https://mp.weixin.qq.com/s/gFI6JrnMjTdBXXoclY49tg
 */
{
	function autoCache(fn) {
	    let cache = null;
	    return function(...args) {
	        if (cache) {
	        	console.log('我的cache  缓存')
	            return cache;
	        } else {
	        	console.log('正常运行')
	            cache = fn.apply(this || {}, args);
	            return cache;
	        }
	    }
	}

	const big = autoCache(() => {
	    console.log('calculate');
	    return 1+1;
	});

	const getData = autoCache(() => {
	    console.log('fetch');
	    return new Promise((resolve) => {
	        setTimeout(resolve.bind(null, 'result'), 1000);
	    });
	});

	console.log(big());  // 正常运行   calculate    2
	console.log(big());  // 缓存                    2

	getData().then(console.log);   // 正常运行          fetch    result
	getData().then(console.log);  //  我的cache  缓存            result

}


{	
	function autoCache(target,name,descriptor){
		let fn = descriptor.value
		let cache = null
		descriptor.value = function(...args){
			// return cache = cache || fn.apply(this,args)
			
			if(cache){
				console.log('calculate  在decoration中的情况   有缓存',cache)
				return cache
			}else{
				console.log('calculate  在decoration中的情况  没有缓存',cache)
				return cache = fn.apply(this,args)
			}
		}
		return descriptor
	}

	function useCount(count){
		let useCount = 0 
		return function(target,name,descriptor){
			let fn = descriptor.value

			descriptor.value = function(...args){
				console.log('函数的调用次数%s',useCount)
				if(useCount < count){
					useCount ++
					return fn.apply(this.args)
				}

			}
			return descriptor
		}
	}
	class Test{

		@autoCache
		big(){
			console.log('calculate  在class中的情况')
			return 1+1;
		}

		@useCount(2)
		useFnCount(){	
			console.log('useFnCount被调用')
			return 2+2
		}
	}

	let test1 = new Test()
	test1.big()
	test1.big()

	test1.useFnCount()
	test1.useFnCount()
	test1.useFnCount()
	test1.useFnCount()
}