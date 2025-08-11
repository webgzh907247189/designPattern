export const createStore = (createState) => {
    let state

    // 定义一个状态监听函数
    let listeners = new Set()

    const getState = () => state

    const subscribe = (listener) => {
        listeners.add(listener)
        return () => {
            listeners.delete(listener)
        }
    }


    // 修改状态的 参数
    const setState = (partial) => {
        // debugger
        const nextState = typeof partial === 'function' ? partial(state) : partial

        // 性能优化，判断老的状态和新的状态是不是同一个对象，如果是则不更新
        if(!Object.is(nextState, state)){
            const previosState = state
            state = Object.assign({}, previosState, nextState)

            // 状态明确 发生变更之后 依次调用监听函数，通知到 每个 listener
            // 这里 实际上是 -> 发布
            listeners.forEach((listener) => {
                // debugger
                // 新状态 老状态
                listener(state, previosState)
                // debugger
            })
        }
    }

    let api = {
        getState,
        setState,
        subscribe
    }

    // 调用 createState 获取 初始化状态
    state = createState(setState, getState, api)
    return api
}

export default createStore