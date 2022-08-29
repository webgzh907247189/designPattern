// react18 不在依赖 isBatchUpdate，而是通过 更新优先级来控制

let state = { number: 0 };
let updateQueue = []

let InputPriority = 1 // 输入优先级   数字越小 优先级越高
let NormalPriority = 2 // 普通优先级  数字越小 优先级越高
let lastPriority;

function setState(newState, priority){
    updateQueue.push(newState)

    if(lastPriority == priority){
        return
    }
    lastPriority = priority

    setTimeout(() => {
        updateQueue.forEach((itemState) => {
            state = itemState
        })
        updateQueue.length = 0
    });
}

function batchUpdate(fn){
    fn()
}

function userFn(){
    setState({ number: state.number + 1 }, InputPriority)
    console.log(state.number)

    setState({ number: state.number + 1 }, InputPriority)
    console.log(state.number)

    setTimeout(() => {
        console.log(state.number)

        setState({ number: state.number + 1 }, NormalPriority)
        console.log(state.number)

        setState({ number: state.number + 1 }, NormalPriority)
        console.log(state.number)
    }, 1000);
}

batchUpdate(userFn)