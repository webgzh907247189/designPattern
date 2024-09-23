
import { produce } from 'immer'
export default function createReducer(initState, reducers, extraReducers){
    return function reducer(state = initState, action){
        // debugger
        const reducerFn = reducers[action.type]
        if(reducerFn){
            // 使用 immer 替换掉 reducer
            return produce(state, (draft) => {
                // debugger
                reducerFn(draft, action)
            })
            // return reducerFn(state, action)
        }

        // 执行 extraReducers 逻辑
        const extraReducerFn = extraReducers[action.type]
        if(extraReducerFn){
            // 使用 immer 替换掉 reducer
            return produce(state, (draft) => {
                // debugger
                extraReducerFn(draft, action)
            })

            // return extraReducerFn(state, action)
        }

        return state
    }
}