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