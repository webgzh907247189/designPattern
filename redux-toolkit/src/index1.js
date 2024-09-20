// import {
//   configureStore,
//   createAction,
//   createReducer,
//   createSlice,
//   createSelector
// } from "./toolkit";

// const counterSlice = createSlice({
//   name: "test",
//   initialState: { num: 0 },
//   reducers: {
//     add: (state, action) => {
//       // 使用了 immer 所以这里做了 替换
//       // return {num: state.num + (action.payload ?? 1)}

//       state.num += action.payload ?? 1;
//     },
//     minus: (state, action) => {
//       // 使用了 immer 所以这里做了 替换
//       // return {num: state.num - 1}
//       state.num -= 1;
//     },
//   },
// });
// const { reducer, actions } = counterSlice;


// const counterSlice1 = createSlice({
//   name: "test1",
//   initialState: { num: 0 },
//   reducers: {
//     add: (state, action) => {
//       // 使用了 immer 所以这里做了 替换
//       // return {num: state.num + (action.payload ?? 1)}

//       state.num += action.payload ?? 1;
//     },
//     minus: (state, action) => {
//       // 使用了 immer 所以这里做了 替换
//       // return {num: state.num - 1}
//       state.num -= 1;
//     },
//   },
// });
// const { reducer: reducer1, actions: actions1 } = counterSlice1;



// let store = configureStore({
//   reducer: { reducer: reducer, reducer1: reducer1 },
//   // middleware: [],
//   preloadedState: { num: 10 },
// });

// let valEle = document.getElementById("value");
// let val1Ele = document.getElementById("value1");
// let sumEle = document.getElementById("sum");


// const select1 = state => state.reducer;
// const select2 = state => state.reducer1;

// const totalSelect = createSelector([select1, select2], (state1, state2) => {
//   return state1.num + state2.num;
// })
// const render = () => {
//   valEle.innerHTML = store.getState().reducer.num;
//   val1Ele.innerHTML = store.getState().reducer1.num;

//   sumEle.innerHTML = totalSelect(store.getState())
// };

// render();




// // 订阅仓库状态， 状态发生变更，重新 render
// store.subscribe(render);

// document.getElementById("add").addEventListener("click", () => {
//   store.dispatch(actions.add());
// });

// document.getElementById("minus").addEventListener("click", () => {
//   store.dispatch(actions.minus());
// });


// document.getElementById("add1").addEventListener("click", () => {
//   store.dispatch(actions1.add());
// });

// document.getElementById("minus1").addEventListener("click", () => {
//   store.dispatch(actions1.minus());
// });





