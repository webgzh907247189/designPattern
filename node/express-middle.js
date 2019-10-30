var expressMiddlewares = [
    function fun1(next) {
        console.log('1111')
        next();
        console.log('6666')
    },
    function fun2(next) {
        console.log('2222')
        next();
        console.log('5555')
    },
    function fun3(next) {
        console.log('3333')
        next();
        console.log('4444')
    }
]

function requestHandler(list) {
    var i=0;
  
    //由expressMiddlewares链式调用
    function next(err) {
  
        if (err) {
            return 
        }
  
        if (i<list.length) {
            list[i++](next);
        } else {
            return ;
        }
    }
  
    //触发第一个middleware
    next();
}
requestHandler(expressMiddlewares)









var koamMiddlewares = [
    function fun1(next) {
        console.log('1111')
        next();
        console.log('6666')
    },
    function fun2(next) {
        console.log('2222')
        // next();
        next();
        console.log('5555')
    },
    function fun3(next) {
        console.log('3333')
        next();
        console.log('4444')
    }
]

function compose(list) {
    console.log('compose --- start')
    return function () {
        let index = -1;

        return dispatch(0)
        function dispatch(i) {
            if (i <= index) return Promise.reject(new Error('next() called multiple times'))
            index = i
            let fn = list[index]
            if (!fn) return Promise.resolve()
            return Promise.resolve(fn(dispatch.bind(null,index + 1)))
        }
    }
}
compose(koamMiddlewares)()