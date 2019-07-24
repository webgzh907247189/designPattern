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
    function dispatch(action){
        state = reducer(state,action)
        listeners.forEach((item)=>{
            item()
        })
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

    return {
        getState,
        dispatch,
        subscribe
    }
}


export default createStore