// // import { createStore } from 'redux'
// import { configureStore, createAction, createReducer, createSlice } from '@reduxjs/toolkit'
import { configureStore, createAction, createReducer, createSlice } from './toolkit'


/** case1  configureStore **/
// const ADD = "ADD"
// const MINUS = "MINUS"

// function Add(){
//   return {
//     type: ADD
//   }
// }

// function Minus(){
//   return {
//     type: MINUS
//   }
// }

// function reducer(state = {num: 0}, action){
//   switch(action.type){
//     case ADD:
//       return {num: state.num + (action.payload ?? 1)}
//     case MINUS:
//       return {num: state.num - 1}
//     default:
//       return state
//   }
// }

// // **** 使用 configureStore 之后，内置了 thunk 中间件 ****
// // let store = createStore(reducer)

// let store = configureStore({
//   reducer,
//   // middleware: [],
//   preloadedState: { num: 10 }
// })
// // **** 使用 configureStore 之后，内置了 thunk 中间件 ****


// let valEle =  document.getElementById('value')
// const render = () => {
//   valEle.innerHTML = store.getState().num
// }
// render()

// // 订阅仓库状态， 状态发生变更，重新 render
// store.subscribe(render)


// document.getElementById('add').addEventListener('click', () => {
//   store.dispatch(Add())
// })

// document.getElementById('minus').addEventListener('click', () => {
//   store.dispatch(Minus())
// })


// // toolkit 自带的 (异步支持 使用了 redux-thunk)
// document.getElementById('asyncAdd').addEventListener('click', () => {
//   store.dispatch(() => {
//     setTimeout(() => {
//       const action = Add()
//       store.dispatch(action)
//     }, 1000)
//   })
// })
/** case1 configureStore **/






/** case2  configureStore createAction **/
// // const ADD = "ADD"
// // const MINUS = "MINUS"

// const Add = createAction('ADD', (amount = 1) => {
//   return {
//     payload: amount*3
//   }
// })
// const Minus = createAction('MINUS')
// // function Add(){
// //   return {
// //     type: ADD
// //   }
// // }

// // function Minus(){
// //   return {
// //     type: MINUS
// //   }
// // }

// function reducer(state = {num: 0}, action){
//   switch(action.type){
//     // case ADD:
//     case Add.type:
//       return {num: state.num + (action.payload ?? 1)}
//     // case MINUS:
//     case Minus.type:
//       return {num: state.num - 1}
//     default:
//       return state
//   }
// }

// // **** 使用 configureStore 之后，内置了 thunk 中间件 ****
// // let store = createStore(reducer)

// let store = configureStore({
//   reducer,
//   // middleware: [],
//   preloadedState: { num: 10 }
// })
// // **** 使用 configureStore 之后，内置了 thunk 中间件 ****


// let valEle =  document.getElementById('value')
// const render = () => {
//   valEle.innerHTML = store.getState().num
// }
// render()

// // 订阅仓库状态， 状态发生变更，重新 render
// store.subscribe(render)


// document.getElementById('add').addEventListener('click', () => {
//   store.dispatch(Add())
// })

// document.getElementById('minus').addEventListener('click', () => {
//   store.dispatch(Minus())
// })


// // toolkit 自带的 (异步支持 使用了 redux-thunk)
// document.getElementById('asyncAdd').addEventListener('click', () => {
//   store.dispatch(() => {
//     setTimeout(() => {
//       const action = Add()
//       store.dispatch(action)
//     }, 1000)
//   })
// })
/** case2 configureStore createAction **/







/** case3  configureStore createAction createReducer **/
// const ADD = "ADD"
// const MINUS = "MINUS"

const Add = createAction('ADD', (amount = 1) => {
  return {
    payload: amount*3
  }
})
const Minus = createAction('MINUS')
// function Add(){
//   return {
//     type: ADD
//   }
// }

// function Minus(){
//   return {
//     type: MINUS
//   }
// }




const reducer = createReducer({num: 0},(builder) => {
  builder
    .addCase(Add, (state, action) => {
      return {num: state.num + (action.payload ?? 1)}
    })
    .addCase(Minus, (state, action) => {
      return {num: state.num - 1} 
    })
})

// 使用 builder 替换 reducer
// const reducer = createReducer({num: 0}, {
//     // [Add.type]: (state, action) => ({num: state.num + (action.payload ?? 1)}),

//     // 使用 immer 之后，return 一个新对象反而没有更新？， 只能按照下面这种写法
//     [Add.type]: (state, action) => {
//       state.num += action.payload ?? 1
//     },

    
//     // [Minus.type]: (state, action) => ({num: state.num - 1} )
//     // 使用 immer 之后，return 一个新对象反而没有更新？， 只能按照下面这种写法
//     [Minus.type]: (state, action) => {
//       state.num -= 1
//     }
// })

// function reducer(state = {num: 0}, action){
//   switch(action.type){
//     // case ADD:
//     case Add.type:
//       return {num: state.num + (action.payload ?? 1)}
//     // case MINUS:
//     case Minus.type:
//       return {num: state.num - 1}
//     default:
//       return state
//   }
// }


// **** 使用 configureStore 之后，内置了 thunk 中间件 ****
// let store = createStore(reducer)

let store = configureStore({
  reducer,
  // middleware: [],
  preloadedState: { num: 10 }
})
// **** 使用 configureStore 之后，内置了 thunk 中间件 ****


let valEle =  document.getElementById('value')
const render = () => {
  console.log('1111', store.getState())
  valEle.innerHTML = store.getState().num
}
render()

// 订阅仓库状态， 状态发生变更，重新 render
store.subscribe(render)


document.getElementById('add').addEventListener('click', () => {
  store.dispatch(Add())
})

document.getElementById('minus').addEventListener('click', () => {
  store.dispatch(Minus())
})


// toolkit 自带的 (异步支持 使用了 redux-thunk)
document.getElementById('asyncAdd').addEventListener('click', () => {
  store.dispatch(() => {
    setTimeout(() => {
      const action = Add()
      store.dispatch(action)
    }, 1000)
  })
})
/** case3 configureStore createAction createReducer **/






/** case4  configureStore createAction createReducer createSlice **/
// // const ADD = "ADD"
// // const MINUS = "MINUS"

// /** 封装到 createSlice 里面 **/
// // const Add = createAction('ADD', (amount = 1) => {
// //   return {
// //     payload: amount*3
// //   }
// // })
// // const Minus = createAction('MINUS')
// /** 封装到 createSlice 里面 **/



// // function Add(){
// //   return {
// //     type: ADD
// //   }
// // }

// // function Minus(){
// //   return {
// //     type: MINUS
// //   }
// // }





// // // const reducer = createReducer({num: 0},(builder) => {
// // //   builder
// // //     .addCase(Add, (state, action) => {
// // //       return {num: state.num + (action.payload ?? 1)}
// // //     })
// // //     .addCase(Minus, (state, action) => {
// // //       return {num: state.num - 1} 
// // //     })
// // // })

// /** 封装到 createSlice 里面 **/
// // const reducer = createReducer({num: 0}, {
// //     [Add.type]: (state, action) => ({num: state.num + (action.payload ?? 1)}),
// //     [Minus.type]: (state, action) => ({num: state.num - 1} )
// // })
// /** 封装到 createSlice 里面 **/

// // function reducer(state = {num: 0}, action){
// //   switch(action.type){
// //     // case ADD:
// //     case Add.type:
// //       return {num: state.num + (action.payload ?? 1)}
// //     // case MINUS:
// //     case Minus.type:
// //       return {num: state.num - 1}
// //     default:
// //       return state
// //   }
// // }



// const counterSlice = createSlice({
//   name: 'test',
//   initialState: {num: 0},
//   reducers: {
//     add: (state, action) => {
//       // 使用了 immer 所以这里做了 替换
//       // return {num: state.num + (action.payload ?? 1)}
      
//       // 使用 immer 之后，return 一个新对象反而没有更新？， 只能按照下面这种写法
//       state.num += (action.payload ?? 1)
//     },
//     minus: (state, action) => {
//       // 使用了 immer 所以这里做了 替换
//       // return {num: state.num - 1} 

//       // 使用 immer 之后，return 一个新对象反而没有更新？， 只能按照下面这种写法
//       state.num -= 1
//     }
//   }
// })

// const { reducer, actions } = counterSlice


// // **** 使用 configureStore 之后，内置了 thunk 中间件 ****
// // let store = createStore(reducer)

// let store = configureStore({
//   reducer,
//   // middleware: [],
//   preloadedState: { num: 10 }
// })
// // **** 使用 configureStore 之后，内置了 thunk 中间件 ****


// let valEle =  document.getElementById('value')
// const render = () => {
//   valEle.innerHTML = store.getState().num
// }
// render()

// // 订阅仓库状态， 状态发生变更，重新 render
// store.subscribe(render)


// document.getElementById('add').addEventListener('click', () => {
//   // 使用了 createSlice 替代了 createAction
//   // store.dispatch(Add())

//   store.dispatch({type: actions.add.type})

//   // 这里的写法和上面一样，因为 createActions 内部挂载了 type 属性 gei actions 函数
//   // store.dispatch(actions.add())
// })

// document.getElementById('minus').addEventListener('click', () => {
//   // 使用了 createSlice 替代了 createAction
//   // store.dispatch(Minus())
//   store.dispatch(actions.minus())
// })


// // toolkit 自带的 (异步支持 使用了 redux-thunk)
// document.getElementById('asyncAdd').addEventListener('click', () => {
//   store.dispatch(() => {
//     setTimeout(() => {
//       // 使用了 createSlice 替代了 createAction
//       // const action = Add()
//       // store.dispatch(action)

//       store.dispatch(actions.add())
//     }, 1000)
//   })
// })
// /** case4 configureStore createAction createReducer createSlice **/