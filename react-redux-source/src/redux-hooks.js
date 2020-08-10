import React, { useReducer } from 'react';
// import { createStore } from  'redux';
// import { Provider,connect } from 'react-redux';

// function reducer(state, action){
//     switch(action.type){
//         case 'add':
//             return {...state, number: state.number + 1}
//         case 'decerame':
//             return  {...state, number: state.number - 1}
//         default:
//             return state;
//     }
// }

// let store = createStore(reducer, {number: 0})

// function Count(props){
//     return <>
//         {props.number}
//         <button onClick={props.add}>redux-hooks</button>
//         <button onClick={props.decerame}>redux-hooks</button>
//     </>
// }
// Count = connect((state) => {
//     return state
// }, (dispatch) => {
//     return {
//         add(){
//             dispatch({type: 'add'})
//         },
//         decerame(){
//             dispatch({type: 'decerame'})
//         }
//     }
// })(Count)

// function App(){
//     return <Provider store={store}>
//         <Count/>
//     </Provider>
// }
// export default App;


function compose(...fns){
    return fns.reduce((a,b) => {
        return (...args) => a(b(...args))
    })
}
/**
 * middlerare
 */
let logger = ({getState,dispatch}) => next => action => {
    console.log('老装态', getState())
    next(action)
    console.log('新装态', getState())
}

let promise = ({getState,dispatch}) => next => action => {
    if(action.then && typeof action.then === 'function'){
       return action.then(dispatch)
    }
    next(action)
}

let thunk = ({getState,dispatch}) => next => action => {
    if(typeof action === 'function'){
        return action(dispatch, getState())
    }
    next(action)
}

function applyMiddleware(...middlerares){
    return (createStore) => {
        return (reducer, initState) => {

            let {store, Provider, connect} = createStore(reducer, initState)
            // 增强disptach 方法， 中间价本质 增强 dispatch 方法

            let dispatch
            let middlerareApi = {
                dispatch: (...args) => dispatch(...args),
                getState: () => store.getState()
            }

            middlerares = middlerares.map((middlerare) => {
                return middlerare(middlerareApi)
            })
            // debugger
            dispatch = compose(...middlerares)((...args1) => store._dispatch(...args1))
            // dispatch = compose(...middlerares)(store._dispatch);
            store.dispatch = dispatch;
            return {
                store,
                connect,
                Provider,
            }
        }
    }
}

/**
 * hooks-redux
 */
const ReduxContext = React.createContext();
let lastState
function createStore(reducer, initState){
    let store = {}

    const Provider = (props) => {
        const [state, dispatch] = useReducer(reducer, initState)
        store.getState = () => state;

        // 到这一步 store 对象 已经有了 getState 函数 和 dispatch 函数
        // 此时 若在这里 给 store.dispatch 重新赋值，会把 useReducer 生成的 dispatch 覆盖掉 上面 compose 生成的 dispatch
        console.log(store._dispatch, 'store._dispatch__store._dispatch', store);
        // if(!store.dispatch){  // ？？？
            // 每次都生成新的 dispatch 
            store._dispatch = dispatch;
        // }

        console.log(lastState === state, 'lastState === state')
        lastState = state;
        return (
            <ReduxContext.Provider value={state}>
                {/* {props.children} */}

                {/* 这个地方需要 clone一下，不然没法刷新 ->  变成新的元素 */}
                {/* 每次都返回新的 element */}
                {/* 不然每次 state 变了，但是下面包装的 props.children 不会刷新， 所以需要 clone一份，返回新的 */}
                {React.cloneElement(props.children)}
            </ReduxContext.Provider>
        )
    }

    function connect(mapStateToProps, mapDispatchToProps){

        return function(Com){ // 返回的也是一个组件，
            let state = initState;
            let actions = {};
            return (props) => {
                // debugger
                if(store.getState())
                    state = mapStateToProps(store.getState())
                
                actions = mapDispatchToProps(store.dispatch)
                return <Com {...state} {...actions} {...props}/>
            }
        }
    }

    return { store, Provider, connect }
}


function reducer(state, action){
    switch(action.type){
        case 'add':
            return {...state, number: state.number + 1}
        case 'decerame':
            return  {...state, number: state.number - 1}
        default:
            return state;
    }
}

// let {store, Provider, connect} = createStore(reducer, {number: 0})
let {store, Provider, connect} = applyMiddleware(thunk, promise, logger)(createStore)(reducer, {number: 0})

function Count(props){
    return <>
        {props.number}
        <button onClick={props.add}>redux-hooks</button>
        <button onClick={props.decerame}>redux-hooks</button>

        <button onClick={props.thunkAdd}>thunkAdd-hooks</button>
        <button onClick={props.promiseAdd}>promiseAdd-hooks</button>
    </>
}
Count = connect((state) => {
    return state
}, (dispatch) => {
    return {
        add(){
            dispatch({type: 'add'})
        },
        decerame(){
            dispatch({type: 'decerame'})
        },
        thunkAdd(){
            dispatch(function(){
                setTimeout(() => {
                    dispatch({type: 'add'})
                }, 2000);
            })
        },
        promiseAdd(){
            dispatch(new Promise((resolve,reject) => {
                setTimeout(() => {
                    resolve({type: 'add'})
                }, 2000);
            }))
        },
    }
})(Count)

function App(){
    return <Provider>
        <Count/>
    </Provider>
}
export default App;
