import React from 'react'
import {createStore,combineReducers} from 'redux'
import {connect,Provider} from './my/react-redux'
import {applyMiddleware} from './my/redux'


let ADD = 'add'
let MINUS = 'minus'


function reducer(state = {count: 0}, action){
    switch(action.type){
        case ADD:
            return {count: state.count + action.num}
        case MINUS: 
            return {count: state.count - action.num}
        default: 
            return state
    }
}

let actions = {
    add(num){
        return {type: ADD,num}
    },
    minus(num){
        return {type: MINUS,num}
    },
    asyncAdd(num){
        return (dispatch) => {
            setTimeout(()=>{
                dispatch({type: ADD,num})
            },1000)
        }
    },
    promiseAdd(num){
        return {
            type: ADD,
            num: new Promise((resolve,j)=>{
                setTimeout(()=>{
                    resolve(num)
                },1000)
            })
        }
    }
}




function isPromise(fn){
    return typeof fn.then === 'function'
}
function promise({getState,dispatch}){
    return function(next){
        return function(action){
            isPromise(action.num) ? action.num.then(d=>{
                dispatch({...action,num: d})
            }) : next(action) 
        }
    }
}

function thunk({getState,dispatch}){
    return function(next){ // next就是原生的dispatch
        return function(action){ // 这个函数相当于 dispatch，但是增强了真正的dispatch的能力(next才是dispatch)
            // 传递actions给connect，传到组件里面的是 {...this.boundAction},类似下面的
            // {
            //     xxx: (...args)=>{
            //         dispatch(action(...args))
            //     }
            // }

            // action 是 actions中的函数运行的返回值
            if(typeof action === 'function'){
                action(dispatch)
            }else{
                next(action)
            }
        }
    } 
}

function logger({getState,dispatch}){
    return function(next){ // next就是原生的dispatch
        return function(action){ // 这个函数相当于 dispatch，但是增强了真正的dispatch的能力(next才是dispatch)
            console.log(`老状态${JSON.stringify(getState())}`)
            next(action)
            console.log(`新状态${JSON.stringify(getState())}`)
        }
    }
}
// function applyMiddleware(middlerare){
//     return function(createStore){
//         return function(reducer){
//             let store = createStore(reducer)
//             // middlerare = middlerare({getState: store.getState, dispatch: store.dispatch})
//             // let dispatch = middlerare(store.dispatch)
//             // return {
//             //     ...store,
//             //     dispatch
//             // }

            
//             let dispatch
//             // debugger
//             // 这样写存在问题，因为执行中间件的时候， dispatch 还是undefined
//             // middlerare = middlerare({getState: store.getState,  dispatch})

//             middlerare = middlerare({getState: store.getState,  dispatch: (...args) => dispatch(...args)})
//             dispatch = middlerare(store.dispatch)
//             return {
//                 ...store,
//                 dispatch
//             }
//         }
//     }
// }


let reducers = combineReducers({
    reducer
})

// let store = createStore(reducers,{count: 10})
// 中间件的顺序是有关系的
let store = applyMiddleware(thunk,logger,promise)(createStore)(reducers)




class ReactMiddlerareDemo extends React.Component{
    add = () => {
        this.props.add(5)
    }

    minus = () => {
        this.props.minus(1)
    }

    combine = () => {
        this.props.add(10)
    }

    asyncCombine = () => {
        this.props.asyncAdd(10)
    }

    promiseCombine = () => {
        this.props.promiseAdd(3)
    }

    render(){
        return <div>
            {/* this.props.reducer.count  -> 不使用mapStateToprops的情况下，这样写*/}
            <div>使用react-redux作为数据驱动(middlerare) -> {this.props.count}</div>
            <button onClick={this.add}>加</button>
            <button onClick={this.minus}>减</button>
            <button onClick={this.combine}>加10</button>
            <button onClick={this.asyncCombine}>异步加10</button>
            <button onClick={this.promiseCombine}>promise加3</button>
        </div>
    }
}

/**
 * 把状态映射为属性对象 
 * 1. 使用起来更简单
 * 2. 减少无用渲染(因为这个组件依赖的state大大减少，只进行必要渲染),结合pureComponent 更明显，因为存在数据比较(没有mapStateToprops，按照大的state进行对比)
 */
let mapStateToprops = state => state.reducer
ReactMiddlerareDemo = connect(mapStateToprops,actions)(ReactMiddlerareDemo)


let mapDispatchToProps = (dispatch,ownprops) => ({
    // 新增ownprops
    add(num){
        dispatch({type: ADD,num: ownprops.amount || num})
    },
    minus(num){
        dispatch({type: MINUS,num})
    }
})
// ReactMiddlerareDemo = connect(mapStateToprops,mapDispatchToProps)(ReactMiddlerareDemo)


// 不这样设计的原因 -> 函数柯里化(不然需要做 参数判断)
// ReactReduxDemo = connect(mapStateToprops,actions,ReactReduxDemo)


function TestReactReduxMiddlerareDemo(){
    return <Provider store={store}>
        <ReactMiddlerareDemo />
    </Provider> 
}

export default TestReactReduxMiddlerareDemo