import { applyMiddleware, combineReducers, createStore, compose } from 'redux'
import {thunk} from 'redux-thunk'

const isPlainObject = (val) => {
    if(typeof val !== 'object' || val === null){
        return false
    }

    return Object.getPrototypeOf(val) === Object.prototype
}
export default function configureStore(options = {}){
    let { reducer, middleware = [thunk], preloadedState } = options

    let rootReducer
    if(typeof reducer === 'function'){
        rootReducer = reducer
    }else if(isPlainObject(reducer)){
        rootReducer = combineReducers(reducer)
    }

    const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
    return createStore(rootReducer, preloadedState, composeEnhancers(applyMiddleware(...middleware)))
}