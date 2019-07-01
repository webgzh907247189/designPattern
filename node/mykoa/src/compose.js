function compose(middlewares){
    if(!Array.isArray(middlewares)){
        throw new TypeError('Middleware stack must be an array!')
    }

    for(let itemFn of middlewares){
        if (typeof itemFn !== 'function') throw new TypeError('Middleware must be composed of functions!')
    }

    return (ctx) => {   // context, next  多一个next参数 ？？？？？？？？？？？？？    
        // 控制一个中间件只能调用一次 next
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