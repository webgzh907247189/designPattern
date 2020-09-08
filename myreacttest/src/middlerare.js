import React from 'react'
import {createStore,combineReducers} from 'redux'
import {connect,Provider} from './my/react-redux'
import {applyMiddleware} from './my/redux'
// import {persistStore,persistReducer} from 'redux-persist'
// import storage from 'redux-persist/lib/storage'
// import {PersistGate} from 'redux-persist/integration/react'
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
// 分别判断 action 和 action.payload 因为可能存在 失败的promise
function promise({getState,dispatch}){
    return function(next){ // next就是真正的 store.dispatch
        console.log('1111')
        return function(action){
            console.log('dispatch 333 start')
            // promise 中间件 有两种写法
            if(isPromise(action) ){
                action.then(dispatch)
            }else if(isPromise(action.num)){
                action.num.then(d=>{
                    dispatch({...action,num: d})
                })
            }else {
                next(action) 
            }
            console.log('dispatch 333 end')
        }
    }
}

function thunk({getState,dispatch}){
    return function(next){ // next就是logger返回的增强的dispatch
        console.log('333')
        return function(action){ // 这个函数相当于 dispatch，但是增强了真正的dispatch的能力(next才是dispatch)
            console.log('dispatch 111 start')
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
            console.log('dispatch 111 end')
        }
    } 
}

function logger({getState,dispatch}){
    return function(next){ // next就是原生的promise 返回的增强dispatch
        console.log('222')
        return function(action){ // 这个函数相当于 dispatch，但是增强了真正的dispatch的能力(next才是dispatch)
            console.log('dispatch 222 start')
            console.log(`老状态${JSON.stringify(getState())}`)
            next(action)
            console.log('dispatch 222 end')
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

// 中间件的顺序是有关系的  （promise先运行，logger，thunk最后运行）
let store = applyMiddleware(thunk,logger,promise)(createStore)(reducers)
// 运行顺序  dispatch 被反复增强，每个中间件都在增强 dispatch 的能力，最初传入(最后一个中间件接收的next)才是 真正的  store.dispatch 
// s = (...args) => thunk(logger(...args)) -> args 是 58行到64行
// (...args) => s(promise(...args)) -> args 就是 store.dispatch

// applyMiddleware 中的 dispatch 就是 71-86 行，最后改写真正的 store.dispatch 为 此函数


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