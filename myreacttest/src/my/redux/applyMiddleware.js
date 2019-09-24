import compose from './compose'
function applyMiddleware(...middlerares){
    return function(createStore){
        return function(...args){
            let store = createStore(...args)
            
            let dispatch

            // 没有直接传入store，因为遵循  最小开放策略，只放开需要的 方法
            let middlerareAPI = {
                dispatch: (...args) => {
                    // debugger;
                    // console.log(dispatch,'ff');

                    // 这个dispatch 是下面的compose运行的返回值，是增强版的 dispatch
                    return dispatch(...args)
                },
                getState: store.getState
            }
            let fns = middlerares.map((middlerare)=>{
                return middlerare(middlerareAPI)
            })

            dispatch = compose(...fns)(store.dispatch)
            return {
                ...store,
                dispatch
            }
        }
    }
}

export default applyMiddleware