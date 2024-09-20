
import { produce } from 'immer'
export default function createReducer(initState, reducers){
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
        return state
    }
}