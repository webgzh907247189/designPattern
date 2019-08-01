import React from 'react'
import {createStore,combineReducers} from 'redux'
import {connect,Provider} from './my/react-redux'
import {applyMiddleware} from './my/redux'
import _ from 'lodash'
import {Map, is} from 'immutable'

let ADD = 'add'
let MINUS = 'minus'


function reducer(state = {count: Map({num: 0})}, action){
    switch(action.type){
        case ADD:
            return {count: Map({num: state.count.toJS().num + action.num})}
        default: 
            return state
    }
}

let actions = {
    add(num){
        return {type: ADD,num}
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

let reducers = combineReducers({
    reducer
})

// let store = createStore(reducers,{count: 10})
// 中间件的顺序是有关系的
let store = applyMiddleware(thunk,logger,promise)(createStore)(reducers)




class ReactImmutableDemo extends React.Component{
    add = () => {
        let value = this.num.value
        this.props.add(Number(value))
    }

    // 这样的判断存在问题，因为重复render
    // shouldComponentUpdate(nextProps,nextState){
    //     console.log(this.props,'nextState',nextProps)
    //     let keys = Object.keys(nextProps)
    //     for(let i=0; i< keys.length; i++){
    //         let key = keys[i]
    //         if(this.props[key] !== nextProps[key]){
    //             return true
    //         }
    //     }
    //     return false
    // }

    // 浪费了cpu的计算能力，靠值相等去匹配(性能低下)
    // shouldComponentUpdate(nextProps,nextState){
    //     console.log(this.props,'nextState',nextProps)
    //     let keys = Object.keys(nextProps)
    //     for(let i=0; i< keys.length; i++){
    //         let key = keys[i]
    //         if(!_.isEqual(this.props[key],nextProps[key])){
    //             return true
    //         }
    //     }
    //     return false
    // }

    // 还可以每次产生一个新对象，然后在 shouldComponentUpdate 对比即可

    // 使用 immutable
    shouldComponentUpdate(nextProps,nextState){
        console.log(this.props,'nextState',nextProps)
        let keys = Object.keys(nextProps)
        for(let i=0; i< keys.length; i++){
            let key = keys[i]
            if(!is(this.props[key],nextProps[key])){
                return true
            }
        }
        return false
    }

    render(){
        console.log('render')
        return <div>
            {/* this.props.reducer.count  -> 不使用mapStateToprops的情况下，这样写*/}
            <div>immutable -> {this.props.count.toJS().num}</div>
            <input ref={ num => this.num = num} />
            <button onClick={this.add}>加</button>
        </div>
    }
}

/**
 * 把状态映射为属性对象 
 * 1. 使用起来更简单
 * 2. 减少无用渲染(因为这个组件依赖的state大大减少，只进行必要渲染),结合pureComponent 更明显，因为存在数据比较(没有mapStateToprops，按照大的state进行对比)
 */
let mapStateToprops = state => state.reducer
ReactImmutableDemo = connect(mapStateToprops,actions)(ReactImmutableDemo)


let mapDispatchToProps = (dispatch,ownprops) => ({
    // 新增ownprops
    add(num){
        dispatch({type: ADD,num: ownprops.amount || num})
    },
    minus(num){
        dispatch({type: MINUS,num})
    }
})
// ReactImmutableDemo = connect(mapStateToprops,mapDispatchToProps)(ReactImmutableDemo)


// 不这样设计的原因 -> 函数柯里化(不然需要做 参数判断)
// ReactReduxDemo = connect(mapStateToprops,actions,ReactReduxDemo)


function TestReactReduxImmutableDemo(){
    return <Provider store={store}>
        <ReactImmutableDemo />
    </Provider> 
}

export default TestReactReduxImmutableDemo