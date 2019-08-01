import React from 'react'
import {createStore,combineReducers} from 'redux'
import {connect,Provider} from './my/react-redux'
import {applyMiddleware} from './my/redux'
import {createActions,handleActions} from './my/redux-actions'


let ADD = 'add'
let MINUS = 'minus'


// function reducer(state = {count: 0}, action){
//     switch(action.type){
//         case ADD:
//             return {count: state.count + action.num}
//         case MINUS: 
//             return {count: state.count - action.num}
//         default: 
//             return state
//     }
// }
let reducer = handleActions({
    ADD: (state,action) => ({count: state.count + action.num}),
    MINUS: (state,action) => ({count: state.count - action.num})
},{count: 0})


let actions = createActions({
    ADD: (num = 1)=>{
        return num
    },
    MINUS: (num = 1)=>{
        return num
    }
})


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


let reducers = combineReducers({
    reducer
})

// let store = createStore(reducers,{count: 10})
// 中间件的顺序是有关系的
let store = applyMiddleware(thunk,logger,promise)(createStore)(reducers)




class ReduxActionsDemo extends React.Component{
    add = () => {
        this.props.ADD(5)
    }

    minus = () => {
        this.props.MINUS(1)
    }

    combine = () => {
        this.props.ADD(10)
    }

    render(){
        console.log(this.props,'z')
        return <div>
            {/* this.props.reducer.count  -> 不使用mapStateToprops的情况下，这样写*/}
            <div>使用redux-actions -> {this.props.count}</div>
            <button onClick={this.add}>加</button>
            <button onClick={this.minus}>减</button>
            <button onClick={this.combine}>加10</button>
        </div>
    }
}

/**
 * 把状态映射为属性对象 
 * 1. 使用起来更简单
 * 2. 减少无用渲染(因为这个组件依赖的state大大减少，只进行必要渲染),结合pureComponent 更明显，因为存在数据比较(没有mapStateToprops，按照大的state进行对比)
 */
let mapStateToprops = state => state.reducer
ReduxActionsDemo = connect(mapStateToprops,actions)(ReduxActionsDemo)


let mapDispatchToProps = (dispatch,ownprops) => ({
    // 新增ownprops
    add(num){
        dispatch({type: ADD,num: ownprops.amount || num})
    },
    minus(num){
        dispatch({type: MINUS,num})
    }
})
// ReduxActionsDemo = connect(mapStateToprops,mapDispatchToProps)(ReduxActionsDemo)


// 不这样设计的原因 -> 函数柯里化(不然需要做 参数判断)
// ReactReduxDemo = connect(mapStateToprops,actions,ReactReduxDemo)


function TestReduxActionsDemo(){
    return <Provider store={store}>
        <ReduxActionsDemo />
    </Provider> 
}

export default TestReduxActionsDemo