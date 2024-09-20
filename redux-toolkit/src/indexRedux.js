import {
  createStore,
  combineReducers,
  bindActionCreators,
  applyMiddleware,
} from "./redux";
import React from "react";
import ReactDom from 'react-dom/client'
import { Provider, connect, useSelector, useDispatch } from "./react-redux";

/** case1 **/
// reducer 的 默认值 和 创建 store 的默认值，优先级覆盖，createStore 的 initstate 优先级更高
// const reducer = (state = { waibao: 0 }, action) => {
//   switch (action.type) {
//     case "add":
//       // 这里的写法注意点 -> 没有返回新对象，因为不是 react 里面，没必要返回新对象
//       state.waibao = state.waibao + 1;
//       return state;
//     default:
//       return state;
//   }
// };
// const store = createStore(reducer, { waibao: 1 });

// let waibaoCount = document.getElementById("value");

// document.getElementById("waibao").addEventListener("click", () => {
//   store.dispatch({ type: 'add' });
// });

// const render = () => {
//   console.log('123213', store.getState())
//   waibaoCount.innerHTML = '外包人数: ' + store.getState().waibao;
// };

// store.subscribe(render);
/** case1 **/

/** case2 **/
// reducer 的 默认值 和 创建 store 的默认值，优先级覆盖
// const reducer1 = (state = { waibao: 0 }, action) => {
//   switch (action.type) {
//     case "add":
//       // 这里的写法注意点 -> 没有返回新对象，因为不是 react 里面，没必要返回新对象
//       state.waibao = state.waibao + 1;
//       return state;
//     default:
//       return state;
//   }
// };
// const reducer2 = (state = { waibao: 0 }, action) => {
//   switch (action.type) {
//     case "add2":
//       // 这里的写法注意点 -> 没有返回新对象，因为不是 react 里面，没必要返回新对象
//       state.waibao = state.waibao + 1;
//       return state;
//     default:
//       return state;
//   }
// };

// const reducer = combineReducers({
//   reducer1,
//   reducer2
// })
// // 这里看出来 初始化的 initstate 优先级的关闭，各自 子reducer 优先级更低
// const store = createStore(reducer, { reducer1: {waibao: 1}, reducer2: { waibao: 0 } });

// let waibaoCount1 = document.getElementById("value1");
// let waibaoCount2 = document.getElementById("value2");

// // 每次变更，所有的 reducer 都会参与运行后， dispatch 很 昂贵
// // dipatch 一次，就会触发 所有的 被 subscribe 的函数运行，所以 是 循环 listeners ，然后执行每一个 被 subscribe 的函数
// document.getElementById("waibao1").addEventListener("click", () => {
//   store.dispatch({ type: 'add' });
// });
// document.getElementById("waibao2").addEventListener("click", () => {
//   store.dispatch({ type: 'add2' });
// });

// const render = () => {
//   console.log('123213', store.getState())
//   waibaoCount1.innerHTML = '外包人数: ' + store.getState().reducer1.waibao;
//   waibaoCount2.innerHTML = '外包人数: ' + store.getState().reducer2.waibao;
// };

// store.subscribe(render);
/** case2 **/

/** case3 **/
// reducer 的 默认值 和 创建 store 的默认值，优先级覆盖
// const reducer1 = (state = { waibao: 0 }, action) => {
//   switch (action.type) {
//     case "add":
//       // 这里的写法注意点 -> 没有返回新对象，因为不是 react 里面，没必要返回新对象
//       state.waibao = state.waibao + 1;
//       return state;
//     default:
//       return state;
//   }
// };
// const reducer2 = (state = { waibao: 0 }, action) => {
//   switch (action.type) {
//     case "add2":
//       // 这里的写法注意点 -> 没有返回新对象，因为不是 react 里面，没必要返回新对象
//       state.waibao = state.waibao + 1;
//       return state;
//     default:
//       return state;
//   }
// };

// const reducer = combineReducers({
//   reducer1,
//   reducer2
// })
// // 这里看出来 初始化的 initstate 优先级的关闭，各自 子reducer 优先级更低
// const store = createStore(reducer, { reducer1: {waibao: 1}, reducer2: { waibao: 0 } });

// let waibaoCount1 = document.getElementById("value1");
// let waibaoCount2 = document.getElementById("value2");

// const action = bindActionCreators({
//   add: (arg1) => ({ type: 'add', payload: arg1}),
//   add2: () => ({ type: 'add2' })
// }, store.dispatch)

// const action1 = bindActionCreators(()=>{
//   return { type: 'add2' }
// }, store.dispatch)

// // 每次变更，所有的 reducer 都会参与运行后， dispatch 很 昂贵
// // dipatch 一次，就会触发 所有的 被 subscribe 的函数运行，所以 是 循环 listeners ，然后执行每一个 被 subscribe 的函数
// document.getElementById("waibao1").addEventListener("click", () => {
//   // store.dispatch({ type: 'add' });

//   // 切换到 bindActionCreators
//   action.add('aaa')
// });
// document.getElementById("waibao2").addEventListener("click", () => {
//   // store.dispatch({ type: 'add2' });

//   // 切换到 bindActionCreators
//   action1()
// });

// const render = () => {
//   console.log('123213', store.getState())
//   waibaoCount1.innerHTML = '外包人数: ' + store.getState().reducer1.waibao;
//   waibaoCount2.innerHTML = '外包人数: ' + store.getState().reducer2.waibao;
// };

// store.subscribe(render);
// /** case3 **/

/** case4 **/
// next就是原生的dispatch
// const thunk = ({ dispatch, getState }) => {
//   return (next) => (action) => {
//     if (typeof action === "function") {
//       action(dispatch, getState)
//     } else {
//       next(action);
//     }
//   };
// }

// const reducer1 = (state = { waibao: 0 }, action) => {
//   switch (action.type) {
//     case "add":
//       // 这里的写法注意点 -> 没有返回新对象，因为不是 react 里面，没必要返回新对象
//       state.waibao = state.waibao + 1;
//       return state;
//     default:
//       return state;
//   }
// };
// const reducer2 = (state = { waibao: 0 }, action) => {
//   switch (action.type) {
//     case "add2":
//       // 这里的写法注意点 -> 没有返回新对象，因为不是 react 里面，没必要返回新对象
//       state.waibao = state.waibao + 1;
//       return state;
//     default:
//       return state;
//   }
// };

// const reducer = combineReducers({
//   reducer1,
//   reducer2,
// });
// // 这里看出来 初始化的 initstate 优先级的关闭，各自 子reducer 优先级更低
// // const store = applyMiddleware(thunk)(createStore)(reducer, {
// //   reducer1: { waibao: 1 },
// //   reducer2: { waibao: 0 },
// // });
// const store = createStore(reducer, {
//   reducer1: { waibao: 1 },
//   reducer2: { waibao: 0 },
// }, applyMiddleware(thunk));

// let waibaoCount1 = document.getElementById("value1");
// let waibaoCount2 = document.getElementById("value2");

// const action = bindActionCreators(
//   {
//     add: (arg1) => (dispatch, getState) => {
//       setTimeout(() => {
//         dispatch({ type: "add", payload: arg1 })
//       }, 1000);
//     },
//     add2: () => ({ type: "add2" }),
//   },
//   store.dispatch
// );

// const action1 = bindActionCreators(() => {
//   return { type: "add2" };
// }, store.dispatch);

// // 每次变更，所有的 reducer 都会参与运行后， dispatch 很 昂贵
// // dipatch 一次，就会触发 所有的 被 subscribe 的函数运行，所以 是 循环 listeners ，然后执行每一个 被 subscribe 的函数
// document.getElementById("waibao1").addEventListener("click", () => {
//   // store.dispatch({ type: 'add' });

//   // 切换到 bindActionCreators
//   action.add("aaa");
// });
// document.getElementById("waibao2").addEventListener("click", () => {
//   // store.dispatch({ type: 'add2' });

//   // 切换到 bindActionCreators
//   action1();
// });

// const render = () => {
//   console.log("123213", store.getState());
//   waibaoCount1.innerHTML = "外包人数: " + store.getState().reducer1.waibao;
//   waibaoCount2.innerHTML = "外包人数: " + store.getState().reducer2.waibao;
// };

// store.subscribe(render);
/** case4 **/




/** case5 **/
// next就是原生的dispatch
// const thunk = ({ dispatch, getState }) => {
//   return (next) => (action) => {
//     if (typeof action === "function") {
//       action(dispatch, getState)
//     } else {
//       next(action);
//     }
//   };
// }

// const reducer1 = (state = { waibao: 0 }, action) => {
//   switch (action.type) {
//     case "add":
//       // 这里的写法注意点 -> 没有返回新对象，因为不是 react 里面，没必要返回新对象
//       // state.waibao = state.waibao + 1;
//       // return state;


//       // hooks case -> 返回原对象不更新，必须要返回新对象
//       return { waibao: state.waibao + 1 }
//     default:
//       return state;
//   }
// };
// const reducer2 = (state = { waibao: 0 }, action) => {
//   switch (action.type) {
//     case "add2":
//       // 这里的写法注意点 -> 没有返回新对象，因为不是 react 里面，没必要返回新对象
//       // state.waibao = state.waibao + 1;
//       // return state;


//       // hooks case -> 返回原对象不更新，必须要返回新对象
//       return { waibao: state.waibao + 1 }
//     default:
//       return state;
//   }
// };

// const reducer = combineReducers({
//   reducer1,
//   reducer2,
// });
// // 这里看出来 初始化的 initstate 优先级的关闭，各自 子reducer 优先级更低
// // const store = applyMiddleware(thunk)(createStore)(reducer, {
// //   reducer1: { waibao: 1 },
// //   reducer2: { waibao: 0 },
// // });
// const store = createStore(reducer, {
//   reducer1: { waibao: 1 },
//   reducer2: { waibao: 0 },
// }, applyMiddleware(thunk));

// const action = bindActionCreators(
//   {
//     add: (arg1) => (dispatch, getState) => {
//       setTimeout(() => {
//         dispatch({ type: "add", payload: arg1 })
//       }, 1000);
//     },
//     add2: () => ({ type: "add2" }),
//   },
//   store.dispatch
// );

// const action1 = bindActionCreators(() => {
//   return { type: "add2" };
// }, store.dispatch);


// class Test extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       waibao: store.getState().reducer1.waibao,
//       waibao2: store.getState().reducer2.waibao
//     }
//   }

//   componentDidMount() {
//     this.unsubscribe = store.subscribe(() => {
//       this.setState({
//         waibao: store.getState().reducer1.waibao,
//         waibao2: store.getState().reducer2.waibao
//       })
//     })
//   }

//   componentWillUnmount() {
//     this.unsubscribe();
//   }

//   render() {
//     return (
//       <div>
//         <div>1: 外包人数: {this.state.waibao}</div>
//         <button onClick={() => action.add("aaa")}>2: 我不是外包</button>

//         <div>2: 外包人数: {this.state.waibao2}</div>
//         <button onClick={() => action1()}>2: 我不是外包</button>
//       </div>
//     )
//   }
// }

// ReactDom.createRoot(document.getElementById("root")).render(<Test />);




// class Test extends React.Component {
//   constructor(props) {
//     super(props);
//     // this.state = {
//     //   waibao: store.getState().reducer1.waibao,
//     //   waibao2: store.getState().reducer2.waibao
//     // }
//   }

//   // componentDidMount() {
//   //   this.unsubscribe = store.subscribe(() => {
//   //     this.setState({
//   //       waibao: store.getState().reducer1.waibao,
//   //       waibao2: store.getState().reducer2.waibao
//   //     })
//   //   })
//   // }

//   // componentWillUnmount() {
//   //   this.unsubscribe();
//   // }

//   render() {
//     return (
//       <div>
//         <div>1: 外包人数: {this.props.reducer1.waibao}</div>
//         <button onClick={() => this.props.add("aaa")}>2: 我不是外包</button>

//         <div>2: 外包人数: {this.props.reducer2.waibao}</div>
//         <button onClick={() => this.props.add2()}>2: 我不是外包</button>
//       </div>
//     )
//   }
// }
// const Test1 = connect(
//   (state) => { return state }, 
//   (dispatch) => ({
//     add2: () => dispatch({ type: "add2" }),
//     add: (arg1) => dispatch((dispatch, getState) => {
//       setTimeout(() => {
//         dispatch({ type: "add", payload: arg1 })
//       }, 1000);
//     }),
//   })

//   // {
//   //   add: (arg1) => (dispatch, getState) => {
//   //     setTimeout(() => {
//   //       dispatch({ type: "add", payload: arg1 })
//   //     }, 1000);
//   //   },
//   //   add2: () => ({ type: "add2" }),
//   // }
//   // {
//   //     xxx: (...args)=>{
//   //         dispatch(action[xxx](args))
//   //     }
//   // }
// )(Test)
// ReactDom.createRoot(document.getElementById("root")).render(<Provider store={store}><Test1 /></Provider>);
/** case5 **/




// /** case6 **/
// // next就是原生的dispatch
// const thunk = ({ dispatch, getState }) => {
//   return (next) => (action) => {
//     if (typeof action === "function") {
//       action(dispatch, getState)
//     } else {
//       next(action);
//     }
//   };
// }

// const reducer1 = (state = { waibao: 0 }, action) => {
//   switch (action.type) {
//     case "add":
//       // 这里的写法注意点 -> 没有返回新对象，因为不是 react 里面，没必要返回新对象
//       // state.waibao = state.waibao + 1;
//       // return state;


//       // hooks case -> 返回原对象不更新，必须要返回新对象
//       return { waibao: state.waibao + 1 }
//     default:
//       return state;
//   }
// };

// const reducer2 = (state = { waibao: 0 }, action) => {
//   switch (action.type) {
//     case "add2":
//       // 这里的写法注意点 -> 没有返回新对象，因为不是 react 里面，没必要返回新对象
//       // state.waibao = state.waibao + 1;
//       // return state;


//       // hooks case -> 返回原对象不更新，必须要返回新对象
//       return { waibao: state.waibao + 1 }
//     default:
//       return state;
//   }
// };

// const reducer = combineReducers({
//   reducer1,
//   reducer2,
// });
// // 这里看出来 初始化的 initstate 优先级的关闭，各自 子reducer 优先级更低
// // const store = applyMiddleware(thunk)(createStore)(reducer, {
// //   reducer1: { waibao: 1 },
// //   reducer2: { waibao: 0 },
// // });
// const store = createStore(reducer, {
//   reducer1: { waibao: 1 },
//   reducer2: { waibao: 0 },
// }, applyMiddleware(thunk));
  
// const action = bindActionCreators(
//   {
//     add: (arg1) => (dispatch, getState) => {
//       setTimeout(() => {
//         dispatch({ type: "add", payload: arg1 })
//       }, 1000);
//     },
//     add2: () => ({ type: "add2" }),
//   },
//   store.dispatch
// );
  
// const action1 = bindActionCreators(() => {
//   return { type: "add2" };
// }, store.dispatch);
  
// function Test2(){
//   const dispatch = useDispatch();
//   const state = useSelector((state) => state)

//   const actions = bindActionCreators({
//     add: (arg1) => (dispatch, getState) => {
//       setTimeout(() => {
//         dispatch({ type: "add", payload: arg1 })
//       }, 1000);
//     },
//     add2: () => ({ type: "add2" }),
//   }, dispatch)

//   return <div>
//   <div>1: 外包人数: {state.reducer1.waibao}</div>
//   <button onClick={() => actions.add("aaa")}>2: 我不是外包</button>

//   <div>2: 外包人数: {state.reducer2.waibao}</div>
//   <button onClick={() => actions.add2()}>2: 我不是外包</button>
// </div>
// }

// ReactDom.createRoot(document.getElementById("root")).render(<Provider store={store}><Test2 /></Provider>);
// /** case6 **/



/** case7 **/
// next就是原生的dispatch
const thunk = ({ dispatch, getState }) => {
  return (next) => (action) => {
    if (typeof action === "function") {
      action(dispatch, getState)
    } else {
      next(action);
    }
  };
}

const reducer1 = (state = { waibao: 0 }, action) => {
  switch (action.type) {
    case "add":
      // 这里的写法注意点 -> 没有返回新对象，因为不是 react 里面，没必要返回新对象
      // state.waibao = state.waibao + 1;
      // return state;


      // hooks case -> 返回原对象不更新，必须要返回新对象
      return { waibao: state.waibao + 1 }
    default:
      return state;
  }
};

const reducer2 = (state = { waibao: 0 }, action) => {
  switch (action.type) {
    case "add2":
      // 这里的写法注意点 -> 没有返回新对象，因为不是 react 里面，没必要返回新对象
      // state.waibao = state.waibao + 1;
      // return state;


      // hooks case -> 返回原对象不更新，必须要返回新对象
      return { waibao: state.waibao + 1 }
    default:
      return state;
  }
};

const reducer = combineReducers({
  reducer1,
  reducer2,
});
// 这里看出来 初始化的 initstate 优先级的关闭，各自 子reducer 优先级更低
// const store = applyMiddleware(thunk)(createStore)(reducer, {
//   reducer1: { waibao: 1 },
//   reducer2: { waibao: 0 },
// });
const store = createStore(reducer, {
  reducer1: { waibao: 1 },
  reducer2: { waibao: 0 },
}, applyMiddleware(thunk));
  
const action = bindActionCreators(
  {
    add: (arg1) => (dispatch, getState) => {
      setTimeout(() => {
        dispatch({ type: "add", payload: arg1 })
      }, 1000);
    },
    add2: () => ({ type: "add2" }),
  },
  store.dispatch
);
  
const action1 = bindActionCreators(() => {
  return { type: "add2" };
}, store.dispatch);
  

function Test31(){
  console.log('render--Test31')
  const dispatch = useDispatch();

  const actions = bindActionCreators({
    add: (arg1) => (dispatch, getState) => {
      setTimeout(() => {
        dispatch({ type: "add", payload: arg1 })
      }, 1000);
    }
  }, dispatch)

  
  const state = useSelector((state) => state.reducer1)
  return <div>
    <div>1: 外包人数: {state.waibao}</div>
    <button onClick={() => actions.add("aaa")}>2: 我不是外包</button>
  </div>
}

function Test32(){
  console.log('render--Test32')
  const dispatch = useDispatch();
  const actions = bindActionCreators({
    add2: () => ({ type: "add2" }),
  }, dispatch)

  const state = useSelector((state) => state.reducer2)

  return <div>
    <div>2: 外包人数: {state.waibao}</div>
    <button onClick={() => actions.add2()}>2: 我不是外包</button>
  </div>
}

function Test3(){
  return <>
    <Test31 />
    <Test32 />
  </>
}

ReactDom.createRoot(document.getElementById("root")).render(<Provider store={store}><Test3 /></Provider>);
/** case7 **/