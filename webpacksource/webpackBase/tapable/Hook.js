class Hook{
    constructor(args){
        if(!Array.isArray(args)){
            args = []
        }
        this.args = args // 把参数的数组
        this.taps = [] // 把存放时间函数放到数组中 (注册的 tap 函数)

        this.call = CALL_DELEGATE; // 初始化 call 方法
        this.callAsync = ASYNC_CALL_DELEGATE // 初始化 asyncCall 方法

        this.promise = PROMISE_DELEGATE

        this.interceptors = [] // 拦截器 数组
    }

    _createCall(type){
        return this.compile({
            taps: this.taps,
            args: this.args,
            interceptors: this.interceptors,
            type,
        })
    }

    compile(){
        throw new Error('抽象方法，应该被重写')
    }

    tapAsync(options, fn){
        this._tap('async', options, fn)
    }

    // 用户手动 调用 tap 方法
    tap(options, fn){
        this._tap('sync', options, fn)
    }

    _tap(type, options, fn){
        if(typeof options === 'string'){
            options = { name: options }
        }
        let tapInfo = { ...options, type, fn }  // type = sync fn: 函数名字 name： 名称

        tapInfo = this._runRegisterInterceptor(tapInfo)

        this._insert(tapInfo)
    }

    _insert(tapInfo){
        this._resetCompiltion(); // 每次insert 重置一下

        // before 的逻辑
        let before;
        if(typeof tapInfo.before === 'string'){
            before = new Set([tapInfo.before])
        }else if(Array.isArray(tapInfo.before)){
            before = new Set(tapInfo.before)
        }

        let stage = 0
        if(typeof tapInfo.stage === 'number'){
            stage = tapInfo.stage
        }

        let tapsLength = this.taps.length;
        while(tapsLength != 0){
            tapsLength --
            let lastTapInfo = this.taps[tapsLength]
            this.taps[tapsLength + 1] = lastTapInfo
            let itemState = lastTapInfo.stage || 0

            if(before){
                if(before.has(lastTapInfo.name)){
                    before.delete(lastTapInfo.name)
                    continue;
                }
                if(before.size > 0){
                    continue;
                }
            }

            if(itemState > stage){
                continue
            }
            tapsLength ++
            break;
        }
        this.taps[tapsLength] = tapInfo;
        // }else{
        //     this.taps.push(tapInfo)
        // }
        
    }
    // 重置
    _resetCompiltion(){
        this.call = CALL_DELEGATE; // 初始化 call 方法
        this.callAsync = ASYNC_CALL_DELEGATE // 初始化 asyncCall 方法
    }

    tapPromise(options, fn){
        this._tap('promise', options, fn)
    }

    _runRegisterInterceptor(tapInfo){
        for (const interceptor of this.interceptors) {
            if(interceptor.register){
                let newTapInfo = interceptor.register(tapInfo)
                if(newTapInfo){
                    tapInfo = newTapInfo
                }
            }
        }
        return tapInfo
    }

    intercept(interceptor){
        this.interceptors.push(interceptor)
    }
}


const CALL_DELEGATE = function(...args){
    this.call = this._createCall('sync') // 调用她的时候，会动态创建call 函数，重写 this.call
    return this.call(...args) // 执行新创建的 call 方法
}
module.exports = Hook

const ASYNC_CALL_DELEGATE = function(...args){
    this.callAsync = this._createCall('async') // 调用她的时候，会动态创建call 函数，重写 this.call
    return this.callAsync(...args) // 执行新创建的 call 方法
}

const PROMISE_DELEGATE = function(...args){
    this.promise = this._createCall('promise') // 调用她的时候，会动态创建call 函数，重写 this.call
    return this.promise(...args) // 执行新创建的 call 方法
}



// 动态编译
{
    function a(b,c){
        if(b == 1){
            a = d
        }else {
            a = e;
        }
    }
    
    function d(){
        console.log('111')
    }
    
    function e(){
        console.log('222')
    }
    a(1, '2')
    a(1, '2')
    a(1, '2')
}


{
    // var longestSubsequence = function(arr, difference) {
    //     const list = arr.reduce((result, item) => {
    //         let target = item - difference
    //         let flag = arr.find(_ => _ === target)
    //         if(flag){
    //             result.add(item)
    //         }
    //         return result;
    //     }, new Set())
    //     return list
    // };

    var longestSubsequence = function(arr, difference) {
        const map = new Map();
        let res = 1;
        for(let i = 0; i < arr.length; i++) {
            map.set(arr[i], (map.get(arr[i] - difference) || 0) + 1);
            res = Math.max(res, map.get(arr[i]));
        }
        return map;
    };
    
    console.log(longestSubsequence([1,2,3,4], 1))
    console.log(longestSubsequence([1,3,5,7], 1))

    console.log(longestSubsequence([1,5,7,8,5,3,4,2,1], -2))
}


{
    var plusOne = function(digits) {
        let flag = true
        for(i = digits.length - 1; i >= 0 ; i--){
            let item = digits[i]
            // if(flag){
            //     item = item >= 9 ? 0 : item + 1
            //     flag = false
            // }
           
            if(item >= 9){
                flag = true
            }
            item = item >= 9 ? 0 : item + 1
            // digits[i] = item
            break;
        }
        return digits
    };

    digits = [1,2,3]
    console.log(plusOne(digits))
}