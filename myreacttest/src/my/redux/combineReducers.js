function combineReducers(reducers){
    return (state,action) => {
        let stateObj = Object.create(null)
        for(let item in reducers){
            stateObj[item] = reducers[item](state[item],action) // 每一个reducer
        }
        return stateObj
    }
}

export default combineReducers

// 源码的 combineReducers
function combineReducers1(reducers){
    let reducersKeys = Object.keys(reducers)
    return (state,action) => {
        // 此次派发动作 是否引起状态改变
        let hasChanged = false 

        let stateObj = Object.create(null)
        for(let i=0; i<reducersKeys.length; i++){

            let key = reducersKeys[i]
            let reducer = reducers[key]
            let prevReducerState = state[key]

            let nextReducerState = reducer(prevReducerState,action)
            stateObj[key] = nextReducerState

            // 在循环里面，有一次 hasChanged 为true，后面的判断就不走了。减少执行。所以加了 hasChanged || prevReducerState !== nextReducerState
            // hasChanged = prevReducerState !== nextReducerState
            hasChanged = hasChanged || prevReducerState !== nextReducerState
        }
        return hasChanged ? stateObj : state
    }
}
