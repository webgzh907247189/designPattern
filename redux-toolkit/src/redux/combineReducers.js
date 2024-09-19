export default function combineReducers(reducers) {
    const reducerKeys = Object.keys(reducers);

    // 这里是真实的 实际运行的 reducers
    return (state = {}, action) => {
        // 此次派发动作 是否引起状态改变
        let hasChanged = false 

        // Object.create 埋坑，后面 hasOWnproperty 拿不到 key
        let stateObj = Object.create(null)

        for (let idx = 0; idx < reducerKeys.length; idx++) {
            let key = reducerKeys[idx]
            let reducer = reducers[key]
            let prevReducerState = state[key]
            
            let nextReducerState = reducer(prevReducerState,action)
            stateObj[key] = nextReducerState


            // 在循环里面，有一次 hasChanged 为true，后面的判断就不走了。减少执行。所以加了 hasChanged || prevReducerState !== nextReducerState
            // 下面两种写法的 区别 (第一种写法，每次都要比较， 第二种写法，只要发现 hasChanged 为 true 就不再比较) 库的作者要求还是蛮严的

            // hasChanged = prevReducerState !== nextReducerState
            hasChanged = hasChanged || prevReducerState !== nextReducerState
        }
        return hasChanged ? stateObj : state
    };
}
