/**
 * https://mp.weixin.qq.com/s/sPpdVb5VerfFV960s--_PQ
 * https://juejin.im/post/5c0397186fb9a049b5068e54
 */

{
    async function async1(){
        console.log('async1 start')
        await async2()
        console.log('async1 end')
    }
    async function async2(){
        console.log('async2')
    }
    console.log('script start')
    setTimeout(function(){
        console.log('setTimeout')
    },0)  
    async1();
    new Promise(function(resolve){
        console.log('promise1')
        resolve();
    }).then(function(){
        console.log('promise2')
    })
    console.log('script end')
    
    /**
     *     script start
     *     async1 start
     *     async2
     *     promise1
     *     script end
     *     promise2
     *     async1 end
     *     setTimeout
     */
}

{
    async function async1(){
        console.log('async1 start')
        await async2()
        console.log('async1 end')
    }
    function async2(){ // 去掉了 async 关键字
        console.log('async2');
    }
    console.log('script start')
    setTimeout(function(){
        console.log('setTimeout')
    },0)  
    async1();
    new Promise(function(resolve){
        console.log('promise1')
        resolve();
    }).then(function(){
        console.log('promise2')
    })
    console.log('script end')
    
    /**
     * script start
     * async1 start
     * async2
     * promise1
     * script end
     * async1 end
     * promise2
     * setTimeout
     */
}



/**
 *  带 async 关键字的函数，它使得你的函数的返回值必定是 promise 对象
 *  也就是:
 *  如果async关键字函数返回的不是promise，会自动用Promise.resolve()包装；
 *  如果async关键字函数显式地返回promise，那就以你返回的promise为准；
 * 
 * 
 *  await 等到之后，做了一件什么事情？
 *  对于await来说，分2个情况
 * 
 *  1. 不是promise对象
 *  如果不是 promise , await会阻塞后面的代码，先执行async外面的同步代码，同步代码执行完，
 *  再回到async内部，把这个非promise的东西，作为 await表达式的结果
 * 
 * 
 * 
 *  2. 是promise对象
 *  如果它等到的是一个 promise 对象，await 也会暂停async后面的代码，先执行async外面的同步代码，等着 Promise 对象 fulfilled，
 *  然后把 resolve 的参数作为 await 表达式的运算结果
 */