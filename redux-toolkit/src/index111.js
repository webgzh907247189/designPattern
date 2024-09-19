// import { createStore } from 'redux'
// import { configureStore, createAction, createReducer, createSlice } from '@reduxjs/toolkit'
import { configureStore, createAction,createReducer,createSlice } from './toolkit'

// const ADD = "ADD"
// const MINUS = "MINUS"

const Add = createAction('ADD', (amount) => {
  return {
    payload: amount*3
  }
})
// function Add(){
//   return {
//     type: ADD
//   }
// }

const Minus = createAction('MINUS')
// function Minus(){
//   return {
//     type: MINUS
//   }
// }

// function reducer(state = {num: 0}, action){
//   switch(action.type){
//     case Add.type:
//       return {num: state.num + (action.payload ?? 1)}
//     case MINUS:
//       return {num: state.num - 1}
//     default:
//       return state
//   }
// }

// const reducer = createReducer({num: 0},(builder) => {
//   builder
//     .addCase(Add, (state, action) => {
//       return {num: state.num + (action.payload ?? 1)}
//     })
//     .addCase(Minus, (state, action) => {
//       return {num: state.num - 1} 
//     })
// })
// const reducer = createReducer({num: 0}, {
//     [Add.type]: (state, action) => ({num: state.num + (action.payload ?? 1)}),
//     [Minus.type]: (state, action) => ({num: state.num - 1} )
// })

const counterSlice = createSlice({
  name: 'test',
  initialState: {num: 0},
  reducers: {
    add: (state, action) => {
      // 使用了 immer 所以这里做了 替换
      // return {num: state.num + (action.payload ?? 1)}
      
      state.num += (action.payload ?? 1)
    },
    minus: (state, action) => {
      // 使用了 immer 所以这里做了 替换
      // return {num: state.num - 1} 
      state.num -= 1
    }
  }
})

const { reducer, actions } = counterSlice
// console.log(actions, 'actions')


// let store = createStore(reducer)
let store = configureStore({
  reducer,
  // middleware: [],
  preloadedState: { num: 10 }
})

let valEle =  document.getElementById('value')
const render = () => {
  valEle.innerHTML = store.getState().num
}

render()

// 订阅仓库状态， 状态发生变更，重新 render
store.subscribe(render)


// document.getElementById('add').addEventListener('click', () => {
//   store.dispatch(Add(1))
// })
document.getElementById('add').addEventListener('click', () => {
  store.dispatch(actions.add())
})


// document.getElementById('minus').addEventListener('click', () => {
//   store.dispatch(Minus())
// })
document.getElementById('minus').addEventListener('click', () => {
  store.dispatch(actions.minus())
})


// toolkit 自带的 (异步支持 使用了 redux-thunk)
document.getElementById('asyncAdd').addEventListener('click', () => {
  store.dispatch(() => {
    setTimeout(() => {
      // const action = Add(2)
      // store.dispatch(action)


      const action = actions.add(2)
      store.dispatch(action)
    }, 1000)
  })
})


// import React from 'react';
// import ReactDOM from 'react-dom/client';

// const root = ReactDOM.createRoot(document.getElementById('root'));
// root.render(
//   <React.StrictMode>
//   </React.StrictMode>
// );
