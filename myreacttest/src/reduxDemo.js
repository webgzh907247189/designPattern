import React from 'react'
import {createStore,bindActionCreators,combineReducers} from './my/redux'

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

// 使用 combineReducers 之后，必须使用下面的传递默认state，因为state存在key (warning)
let store = createStore(reducers,{count: 10})
// let store = createStore(reducers,{reducer: {count: 10}})


// 直接修改 store.getState的返回值 并不会对state产生影响，因为它是 createStore内部返回state的引用
// 如果想要保护 store.getState的返回值，使用 JSON.parse(JSON.Stringify())
console.log(store.getState(),'zz')
let state1 = store.getState()
state1 = null

// redux 没有对数据做保护，直接这样修改，可以修改数据， 使用 JSON.parse(JSON.Stringify()) 保护数据
// state1.reducer.count = 10;

console.log(state1,'zz1')

function bindActionCreator(action,dispatch){
    return (...args)=>{
        dispatch(action(...args))
    }
}
function myBindActionCreators(action,dispatch){
    if(typeof action == 'function'){
        return bindActionCreator(action,dispatch)
    }

    let actionObj = Object.create(null)
    for(let key in action){
        actionObj[key] = bindActionCreator(action[key],dispatch)
    }
    return actionObj
}

let minus = bindActionCreators(actions.minus,store.dispatch)
let actionObj = bindActionCreators(actions,store.dispatch)



class ReduxDemo extends React.Component{
    state = {
        count: store.getState().reducer.count
    }

    componentDidMount(){
        // 更新状态 (没有react-redux的时候，将其挂到状态上)
        // 只要执行了 dispatch，就会执行这个cb
        this.unSub = store.subscribe(()=>{
            this.setState({
                count: store.getState().reducer.count
            })
        })
    }

    // 组件销毁了，再去执行 dispatch，还会执行上面的cb，所以取消订阅
    componentWillUnmount(){
        this.unSub()
    }

    add = () => {
        // store.dispatch({type: ADD, num: 5})
        store.dispatch(actions.add(5))
    }

    minus = () => {
        // store.dispatch({type: MINUS, num: 1})
        minus(1)
    }

    combine = () => {
        actionObj.add(10)
    }

    render(){
        return <div>
            <div>{this.state.count}</div>
            <button onClick={this.add}>加</button>
            <button onClick={this.minus}>减</button>
            <button onClick={this.combine}>加10</button>
        </div>
    }
}

export default ReduxDemo