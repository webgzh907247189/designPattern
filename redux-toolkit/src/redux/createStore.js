export default function createStore(reducer, preloadedState, enhancer) {
  // 用法一(createStore 内部实际是调用用法二)
  // const store = createStore(reducer, initial_state, applyMiddleware(thunk, promise, logger))

  // 用法二
  // const store = applyMiddleware(thunk, promise, logger)(createStore)(reducer, initialState)

  if (typeof enhancer !== 'undefined') {
    if (typeof enhancer !== 'function') {
      throw new Error('error')
    }

    return enhancer(createStore)(
      reducer,
      preloadedState
    )
  }

  let state = preloadedState;

  let listenerIdCounter = 0;

  // 性能考虑
  // https://github.com/reduxjs/redux/pull/4476
  // 带来的问题. 1. babel polyfill  执行报错，白屏
  const listeners = new Map();

  const dispatch = (action) => {
    state = reducer(state, action);
    listeners.forEach((listener) => listener());

    return action;
  };

  // 初始化执行一次，为了初始化 reducer 的数据， 每个 reducer 都有初始化数据 (initState)
  dispatch({ type: "@@REDUX/INIT" });

  const subscribe = (listener) => {
    const listenerId = listenerIdCounter++;
    listeners.set(listenerId, listener);

    // 防止多次取消订阅
    let isSubscribed = true;
    return () => {
      if (!isSubscribed) {
        return;
      }
      isSubscribed = false;

      listeners.delete(listenerId);
    };

  }

  const getState = () => {
    return state;
  };

  return {
    getState,
    dispatch,
    subscribe,
  };
}
