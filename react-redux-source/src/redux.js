/**
 * vuex(基于 Object.defineProperty) redux 没有什么关系，相同点基于发布订阅(需要变化的组件是订阅，变更的组件是发布)
 * 
 * store 是数据容器，reducer 管理员(管理store)
 */


import {createStore} from 'redux'
// import {createStore} from './my/redux'

function reducer(initState = {count: 0},action){
    switch(action.type){
        case 'ADD':
            return {count: initState.count + action.count}
        case 'MINS':
            return {count: initState.count - action.count}
        default:
            return initState
    } 
}

let store = createStore(reducer,{count:2})

// 获取状态
let val = store.getState()
console.log(val,'val')


let redux_show = document.getElementById('redux_show')
function render(){
    redux_show.innerHTML = store.getState().count
}
let unSub = store.subscribe(render)

Promise.resolve().then(()=>{
    if(document.getElementById('redux_add')){
        document.getElementById('redux_add').addEventListener('click',()=>{
            store.dispatch({type: 'ADD',count: 5})
            // render()
    
        })
        document.getElementById('redux_mins').addEventListener('click',()=>{
            store.dispatch({type: 'MINS',count: 1})
            // render()
    
            // 兼容多次取消订阅
            unSub()
            unSub()
        })
    }
})