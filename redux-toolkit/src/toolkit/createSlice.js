import createAction from './createAction'
import createReducer from './createReducer'
const getType = (name, type) => {
    return `${name}/${type}`
} 

export default function createSlice(options = {}){
    const { name, reducers, initialState, extraReducers = {} } = options

    let actions = {}
    
    let prefixReducers = {}
    Object.keys(reducers).forEach((key) => {
        // debugger
        let type = getType(name, key)

        // actions 被重新赋值
        actions[key] = createAction(type)
        prefixReducers[type] = reducers[key]
    })

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
        typeof extraReducers === 'function' && extraReducersCb(builder);
        return [actionsMap];
    }

    const [getExtraReducers] = executeReducerBuilderCallback(extraReducers)

    // debugger

    // prefixReducers 生成的 数据格式
    // prefixReducers -> 
    // {
    //     'test/add': (state, action) => {
    //         return {num: state.num + (action.payload ?? 1)}
    //     },
    //     'test/minus':  (state, action) => {
    //         return {num: state.num - 1} 
    //     }
    // }
    let reducer = createReducer(initialState, (builder) => {
        for (const key in prefixReducers) {
            const reducerKey = prefixReducers[key];
            builder.addCase(key, reducerKey)
        }
    }, getExtraReducers)

    return {
        actions,
        reducer
    }
}