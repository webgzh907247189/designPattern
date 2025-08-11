import { createStore } from './vanilla'
import { useCallback, useRef, useSyncExternalStore } from 'react' // useSyncExternalStore

// const useSyncExternalStore = (subscribe, getSnapShot) => {
//     let [state, setState] = useState(getSnapShot())
//     useLayoutEffect(() => {
//         subscribe((newState, previosState) => {
//             setState(newState)
//         })
//     }, [])
//     return state
// }
export const create = (createState) => {
    return createImpl(createState)
}


// 使用了 useStore 就相当于是 触发了 订阅
export const useStore = (api, selector) => {
    // Maximum update depth exceeded. This can happen when a component repeatedly calls setState inside componentWillUpdate or componentDidUpdate. React limits the number 
    // 无限 循环了 -> useSyncExternalStore 第二个参数 调用 拿到的 state 每次都是最新的，导致了无限循环更新
    // let value = useSyncExternalStore(api.subscribe, () => selector(api.getState()))


    // 缓存上一次整个状态的快照
    const lastSnapshotRef = useRef(null)
    // 缓存上一次选择的结果对象
    const lastSelectorRef = useRef(null)

    const getSelection = useCallback(() => {
        // debugger
        let lastSelection = lastSelectorRef.current

        // lastSelection === null -> 代表是 第一次渲染
        if(lastSelection === null){
            const nextSnapshot = api.getState()
            const nextSelection = selector(nextSnapshot)

            lastSnapshotRef.current = nextSnapshot
            lastSelectorRef.current = nextSelection

            return nextSelection
        } else {
            // 获取老的快照
            const lastSnapshot = lastSnapshotRef.current

            // 获取新的快照
            const nextSnapshot = api.getState()

            // 如果 快照一样 选择器也一样， 肯定结果也一样
            if(Object.is(lastSnapshot, nextSnapshot)){
                return lastSelection
            }
            
            // 计算新的 选择器 的 值
            const nextSelection = selector(nextSnapshot)
            lastSnapshotRef.current = nextSnapshot
            lastSelectorRef.current = nextSelection
            return nextSelection
        }
    }, [])

    let value = useSyncExternalStore(api.subscribe, getSelection)

    // debugger
    return value


    //  ** 上面的代码替代了下面的函数 功能 **
    // 这里 实际上是 -> 订阅
    return api.getState()
}
const createImpl = (createState) => {
    // 创建仓库
    const api = createStore(createState)

    // 返回一个自定义 hooks
    // selector 主要用于自定义的 slice 用
    return (selector) => useStore(api, selector)
}

