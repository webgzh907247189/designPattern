import React from 'react'
import {createStore,combineReducers} from './my/redux'
import {connect,Provider} from './my/react-redux'

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
    }
}

let reducers = combineReducers({
    reducer
})

let store = createStore(reducers,{count: 10})


class ReactReduxDemo extends React.Component{
    add = () => {
        this.props.add(5)
    }

    minus = () => {
        this.props.minus(1)
    }

    combine = () => {
        this.props.add(10)
    }

    render(){
        return <div>
            {/* this.props.reducer.count  -> 不使用mapStateToprops的情况下，这样写*/}
            <div>使用react-redux作为数据驱动 -> {this.props.count}</div>
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
// ReactReduxDemo = connect(mapStateToprops,actions)(ReactReduxDemo)


let mapDispatchToProps = (dispatch,ownprops) => ({
    // 新增ownprops
    add(num){
        dispatch({type: ADD,num: ownprops.amount || num})
    },
    minus(num){
        dispatch({type: MINUS,num})
    }
})
ReactReduxDemo = connect(mapStateToprops,mapDispatchToProps)(ReactReduxDemo)


// 不这样设计的原因 -> 函数柯里化(不然需要做 参数判断)
// ReactReduxDemo = connect(mapStateToprops,actions,ReactReduxDemo)


function TestReactReduxDemo(){
    return <Provider store={store}>
        <ReactReduxDemo amount={2}/>
    </Provider> 
}

export default TestReactReduxDemo