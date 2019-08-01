function createSelect(selector,reduce){
    let lastState
    let lastResult
    return function(state){
        let newState = selector(state)
        //缓存上一次结果
        if(lastState !== newState){
            lastResult = reduce(newState)
            lastState = newState
        }
        return lastResult
    }
}

export default createSelect