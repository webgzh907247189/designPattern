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
        actions[key] = createAction(type)
        prefixReducers[type] = reducers[key]
    })

    const executeReducerBuilderCallback = (builderCallback) => {
        // debugger
        var actionsMap = {};
        var builder = {
            addCase: function (typeOrActionCreator, reducer) {
                var type = typeof typeOrActionCreator === "string" ? typeOrActionCreator : typeOrActionCreator.type;

                actionsMap[type] = reducer;
                return builder;
            }
        };
        builderCallback(builder);
        return [actionsMap];
    }

    const [getExtraReducers] = executeReducerBuilderCallback(extraReducers)

    let reducer = createReducer(initialState, prefixReducers, getExtraReducers)
    return {
        actions,
        reducer
    }
}