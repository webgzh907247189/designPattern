// 这个函数用于判断当前代码是否已经被打包工具（比如 Webpack）压缩过，如果被压缩过的话，
// isCrushed 函数的名称会被替换掉。如果被替换了函数名但是 process.env.NODE_ENV 又不等于 production
// 的时候，提醒用户使用生产环境下的精简代码。
function isCrushed() {}
    if ( process.env.NODE_ENV !== 'production' && typeof isCrushed.name === 'string' && isCrushed.name !== 'isCrushed') {
        warning(
        'You are currently using minified code outside of NODE_ENV === "production". ' +
        'This means that you are running a slower development build of Redux. ' +
        'You can use loose-envify (https://github.com/zertosh/loose-envify) for browserify ' +
        'or setting mode to production in webpack (https://webpack.js.org/concepts/mode/) ' +
        'to ensure you have the correct code for your production build.'
    )
}


// 判断传入的对象是否是纯对象，因为 redux 要求 action 和 state 是一个纯对象，所以这个函数诞生了。
// 正常情况下 proto === Object.prototype(因为Object.getPrototypeOf(Object.prototype) === null)，倒数第二个层级 null -> Object.prototype
function isPlainObject(obj) {
    if (typeof obj !== 'object' || obj === null) return false
  
    let proto = obj
    // 获取最顶级的原型，如果就是自身，那么说明是纯对象。
    while (Object.getPrototypeOf(proto) !== null) {
      proto = Object.getPrototypeOf(proto)
    }
  
    return Object.getPrototypeOf(obj) === proto
}


function warning(message) {
    if (typeof console !== 'undefined' && typeof console.error === 'function') {
      console.error(message)
    }
    try {
      throw new Error(message)
    } catch (e) {} 
}
  


function createStore(reducer,initState){
    let state = initState
    let listeners = []

    function getState(){
        // 此方法是保护数据的
        // return JSON.parse(JSON.stringify(state))

        // 源码直接这样返回
        return state
    }

    // 调用dispatch 返回一个新的状态
    // subscribe 方法就是对观察者模式的利用（注意不是发布订阅模式，二者有区别，不要混淆），我们通过 subscribe 方法注册我们的函数，
    // 我们的函数会给存储到 createStore 方法的一个局部变量当中，每次 dispatch 被调用之后，都会遍历一遍 currentListeners，
    // 依次执行其中的方法，达到我们订阅的要求。
    function dispatch(action){
        state = reducer(state,action)
        listeners.forEach((item)=>{
            item()
        })
        return action
    }
    // 默认状态 -> 初始化调用
    dispatch({type: '@@REDUX/INIT'})
    
    function subscribe(fn){
        listeners.push(fn)

        // 防止多次取消订阅
        let isSubscribed = true
        return () => {
            if(isSubscribed){
                let idx = listeners.indexOf(fn)
                listeners.splice(idx,1)
                isSubscribed = false
            }
        }
    }

    function replaceReducer(nextReducer) {
        reducer = nextReducer
        
        /*刷新一遍 state 的值，新来的 reducer 把自己的默认状态放到 state 树上去*/
        dispatch({ type: Symbol() })
    }

    return {
        getState,
        dispatch,
        subscribe,
        replaceReducer
    }
}


export default createStore