import compose from './compose'
function applyMiddleware(...middlerares){
    return function(createStore){
        return function(...args){
            let store = createStore(...args)
            
            let dispatch
            let middlerareAPI = {
                dispatch: (...args) => dispatch(...args),
                getState: store.getState
            }
            let fns = middlerares.map((middlerare)=>{
                return middlerare(middlerareAPI)
            })

            dispatch = compose(...fns)(store.dispatch)
            return {
                ...store,
                dispatch
            }
        }
    }
}

export default applyMiddleware