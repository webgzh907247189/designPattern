
import { produce } from 'immer'
export default function createReducer(initState, reducers, extraReducers = {}){
    return function reducer(state = initState, action){

        const executeReducerBuilderCallback = (extraReducersCb) => {
            // debugger
            var actionsMap = {};
            var builder = {
                addCase: function (typeOrActionCreator, reducer) {
                    var type = typeof typeOrActionCreator === "string" ? typeOrActionCreator : typeOrActionCreator.type;
    
                    actionsMap[type] = reducer;
                    return builder;
                }
            };
            extraReducersCb(builder);
            return [actionsMap];
        }

        // 这里使用 executeReducerBuilderCallback 拿到 newReducers
        const [newReducers] = executeReducerBuilderCallback(reducers)
        // debugger
        const reducerFn = newReducers[action.type]

        // debugger
        // const reducerFn = reducers[action.type]
        if(reducerFn){
            // 使用 immer 替换掉 reducer
            return produce(state, (draft) => {
                return reducerFn(draft, action)
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