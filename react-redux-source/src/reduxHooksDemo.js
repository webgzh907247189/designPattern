import React from "react";
import { createStore, combineReducers } from "redux";
import s, { connect, Provider, useDispatch, useSelector } from "./my/react-redux";
// import { connect, Provider, useDispatch, useSelector } from "react-redux";
import { applyMiddleware } from "./my/redux";
import _ from "lodash";
import { Map, is } from "immutable";

let ADD = "add";
let MINUS = "minus";

function reducer(state = { count: Map({ num: 0 }) }, action) {
  switch (action.type) {
    case ADD:
      return { count: Map({ num: state.count.toJS().num + action.num }) };
    default:
      return state;
  }
}

function isPromise(fn) {
  return typeof fn.then === "function";
}
function promise({ getState, dispatch }) {
  return function (next) {
    return function (action) {
      // promise 中间件 有两种写法
      if (isPromise(action)) {
        action.then(dispatch);
      } else if (isPromise(action.num)) {
        action.num.then((d) => {
          dispatch({ ...action, num: d });
        });
      } else {
        next(action);
      }
    };
  };
}

function thunk({ getState, dispatch }) {
  return function (next) {
    // next就是原生的dispatch
    return function (action) {
      // 这个函数相当于 dispatch，但是增强了真正的dispatch的能力(next才是dispatch)
      // 传递actions给connect，传到组件里面的是 {...this.boundAction},类似下面的
      // {
      //     xxx: (...args)=>{
      //         dispatch(action(...args))
      //     }
      // }

      // action 是 actions中的函数运行的返回值
      if (typeof action === "function") {
        action(dispatch);
      } else {
        next(action);
      }
    };
  };
}

function logger({ getState, dispatch }) {
  return function (next) {
    // next就是原生的dispatch
    return function (action) {
      // 这个函数相当于 dispatch，但是增强了真正的dispatch的能力(next才是dispatch)
      console.log(`老状态${JSON.stringify(getState())}`);
      next(action);
      console.log(`新状态${JSON.stringify(getState())}`);
    };
  };
}

let reducers = combineReducers({
  reducer,
});

// let store = createStore(reducers,{count: 10})
// 中间件的顺序是有关系的
let store = applyMiddleware(thunk, logger, promise)(createStore)(reducers);


let actions = {
    add(num) {
      return { type: ADD, num };
    },
};

function ReduxHooksDemo() {
    const state = useSelector((state) => {
        return state.reducer
    });
    
    const dispatch = useDispatch();
    const inputRef = React.useRef();

    const inputChange = React.useCallback((e) => {
        inputRef.current = e.target.value;
    }, [inputRef])

    const add = React.useCallback(() => {
        debugger
        let value = inputRef.current;

        dispatch({
            type: ADD,
            num: Number(value)
        })
    }, [inputRef]);

    const asyncAdd = React.useCallback(() => {
        let value = inputRef.current;

        dispatch(new Promise((resolve) =>{
            setTimeout(() => {
                resolve({
                    type: ADD,
                    num: Number(value)
                })
            },2000)
        }))
    }, [inputRef]);

    return (
        <div>
        <div>immutable -> {state.count.get("num")}</div>
        <input onChange={inputChange}/>
        <button onClick={add}>加</button>
        <button onClick={asyncAdd}>异步加</button>
        </div>
    );
}

function ReduxHooksDemoContainer() {
  return (
    <Provider store={store}>
      <ReduxHooksDemo />
    </Provider>
  );
}

export default ReduxHooksDemoContainer;
