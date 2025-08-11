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

    // middleware 支持 fn， 传入 一个 cb (默认支持 thunk)
    middleware = typeof middleware === 'function' ?  middleware(() => [thunk]) : middleware

    const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
    return createStore(rootReducer, preloadedState, composeEnhancers(applyMiddleware(...middleware)))
}