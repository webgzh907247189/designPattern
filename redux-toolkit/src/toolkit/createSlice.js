import createAction from './createAction'
import createReducer from './createReducer'
const getType = (name, type) => {
    return `${name}/${type}`
} 

export default function createSlice(options = {}){
    const {name, reducers, initialState} = options

    let actions = {}
    
    let prefixReducers = {}
    Object.keys(reducers).forEach((key) => {
        // debugger
        let type = getType(name, key)
        actions[key] = createAction(type)
        prefixReducers[type] = reducers[key]
    })

    let reducer = createReducer(initialState, prefixReducers)
    return {
        actions,
        reducer
    }
}