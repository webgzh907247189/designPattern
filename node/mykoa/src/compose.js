function compose(middlewares){
    if(!Array.isArray(middlewares)){
        throw new TypeError('Middleware stack must be an array!')
    }

    for(let itemFn of middlewares){
        if (typeof itemFn !== 'function') throw new TypeError('Middleware must be composed of functions!')
    }

    return (ctx) => {   // context, next  多一个next参数 ？？？？？？？？？？？？？    
        // 控制一个中间件只能调用一次 next
        // i 在每个 dispatch 里面(同一个作用域里面) i 一直固定， index 随着 中间件运行次数而增加
        // 第一个中间件里面 i = 0， 第二个 i = 1

        // 第一次 1. index = i = 0 
        // 第二次 2. index = i = 1

        // 第二个中间件运行完毕，回到第一个中间件，此时 i = 0， 又一次触发 next 
        // i = 1， index = 1 所以，报错 (防止一个中间件里面多次运行 next)
        let index = -1

        return dispatch(0)
        function dispatch(i){
            if (i <= index) return Promise.reject(new Error('next() called multiple times'))
            index = i

            let fn = middlewares[i]

            if(i >= middlewares.length){
                return Promise.resolve()
            }
            
            try{
                return Promise.resolve(fn( ctx, () => dispatch(i+1) ))
            }catch(err){
                return Promise.reject(err)
            }
        }
    }   
}

module.exports = compose


// async function a(ctx,next){
//     console.log('111')
//     await next()
//     await next()
//     console.log('222')
// }

// async function b(ctx,next){
//     console.log('333')
// }

// compose([a,b])


// 1. index = i = 0 
// 2. index = i = 1
