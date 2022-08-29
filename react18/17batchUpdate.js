let isBatchUpdate = false

let state = { number: 0 };
let updateQueue = []

function setState(newState){
    if(isBatchUpdate){
        updateQueue.push(newState)
    }else{
        state = newState
    }
}

function batchUpdate(fn){
    isBatchUpdate = true
    fn()

    // 批量更新完成之后更新 state
    updateQueue.forEach((itemState) => {
        state = itemState
    })

    isBatchUpdate = false
}

function userFn(){
    setState({ number: state.number + 1 })
    console.log(state.number)

    setState({ number: state.number + 1 })
    console.log(state.number)

    setTimeout(() => {
        console.log(state.number)

        setState({ number: state.number + 1 })
        console.log(state.number)

        setState({ number: state.number + 1 })
        console.log(state.number)
    }, 1000);
}

batchUpdate(userFn)