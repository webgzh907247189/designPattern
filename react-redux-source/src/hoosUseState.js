import React, { useState, useCallback, memo, useMemo, useReducer, useContext, useEffect, useRef, useImperativeHandle, useLayoutEffect } from 'react';
import TestTestUseDebounce from './hooksDebounce';
import ReduxHooks from './redux-hooks'
/**
 * useState 
 * useState 想同的值 不会触发 更新  内部使用 Object.is 来比较state，判断是否需要更新组件
 * useState 和 class 组件不一样，不会合并。而是直接覆盖 state
 * 使用 函数更新 可以完成 同步更新
 */
function HoosUseState(){
    const [state,setState] = useState(() => {
        console.log('惰性初始化')

        // 和calss组件不一样，不会合并data，直接覆盖
        // 内部使用 Object.is 来比较state，判断是否需要更新组件
        return { number: 0, name: 'test' }
    })


    const add = () => { setState({...state, number: state.number + 1}) }

    const addAlert = () => {
        setTimeout(() => {
            // alert 捕获我点击时的变量

            // 每次渲染都会创建一个新的函数
            alert(state.number)
        },3000)
    }



    const addLazy1 = () => {
        setTimeout(() => {
            setState({...state, number: state.number + 1})
        },3000)
    }
    const addLazy2 = () => {
        setTimeout(() => {
            // 使用函数更新state 正确
            // 和calss组件不一样，不会合并data，直接覆盖
            setState((state) => ({number: state.number + 1}))
        },3000)
    }

    const isEqual = () => {
        // 没有重新渲染
        setState(state)
    }

    console.log('redner了，渲染了')
    return <>
        number -> {state.number}
        test -> {state.name}
        <button onClick={add}>点击按钮加1</button>
        <button onClick={addAlert}>点击按钮加1,alert，现实值不对</button>

        <button onClick={addLazy1}>点击按钮加1,lazy，现实值不对</button>
        <button onClick={addLazy2}>点击按钮加1,lazy，现实值正确</button>

        <button onClick={isEqual}>Object.is判断值比较(没有重新渲染)</button>
    </>
}

/**
 * 依赖变了， 重新生成
 */
let lastChangeCount;
let lastChangeName;
function HooksUseCallBack(){
    const [count,setCount] = useState(0)
    const [name,setName] = useState('test')

    const changeCount = useCallback(() => {
        setCount(count + 1)
    }, [count])
    console.log(lastChangeCount === changeCount)
    lastChangeCount = changeCount

    const changeName = useCallback(() => {
        setName(Date.now())
    }, [name])
    console.log(lastChangeName === changeName)
    lastChangeName = changeName

    return <>
        {count} -> <button onClick={changeCount}>我是更改count</button>
        {name} -> <button onClick={changeName}>我是更改name</button>
    </>
}


/**
 * memo 使用 认知 调整 （针对 useCallBack 也适用）
 * 虽然 数据源 使用了 useMemo & useCallBack 进行了缓存，但是子组件还是需要memo 来帮助 子组件进行缓存
 * 否则 每次 父组件 重新渲染 子组件 也会重新渲染
 */

function ChildrenTest(props){
    console.log('Children---render')
    return <button onClick={() => props.changeValue()}>{props.data.number}</button>
}
ChildrenTest = memo(ChildrenTest)

let lastData;
let changeValueFn;
function HooksUseCallBack1(){
    const [name,setName] = useState('name')
    const [number, setNumber] = useState(0)

    // 不做处理，每次重新渲染都会重新生成 
    // const changeValue = useCallback(() => { setNumber(x => x + 1) }, []);
    const changeValue = useCallback(() => { setNumber(number + 1) }, [number]);
    // 上面两个 changeValue 含义是不一样的，但是实现的功能是一样的

    console.log(changeValueFn === changeValue, 'changeValueFn === changeValue')
    changeValueFn = changeValue;

    const data = useMemo(() => ({ number }), [number]);
    console.log(data === lastData, 'data === lastData')
    lastData = data;
    return <>
        <input value={name} type="text" onChange={(e) => { setName(e.target.value) }}/>

        {/* 需要memo支撑，不然无效 */}
        <ChildrenTest data={data} changeValue={changeValue}></ChildrenTest>

        <TestRendeer />
    </>
}
TestRendeer = memo(TestRendeer)
function TestRendeer(){
    console.log('TestRendeer')
    return <>111</>
}


/**
 * useReducer 使用
 */
function reducer(state,action){
    switch(action.type){
        case 'add':
            return {name: state.name + 1}
        case 'decrement':
            return {name: state.name - 1}
        default:
            return state
    }
}
let lastDispatch;
function HooksUseReducer(){
    // useReducer 后两个参数(initArgs,initFn) 就是为了得到 initialState
    // useReducer 生成的 dispatch 不需要使用 useCallback 包装
    const [state, dispatch] = useReducer(reducer, {name: 1}, (abc) => abc)
    console.log(dispatch === lastDispatch, 'dispatch === lastDispatch')
    lastDispatch = dispatch;

    const [myState,setMyState] = UseMyState({name: '自定义useState'})
    return <>
        {state.name}
        <button onClick={() => {dispatch({type: 'add'})}}>add</button>
        <button onClick={() => {dispatch({type: 'decrement'})}}>decrement</button>

        {myState.name}
        <button onClick={() => {setMyState({name: '自定义hooks更新成功'})}}>decrement</button>
    </>
}

/**
 * 使用 useReducer 实现 useState
 */
function UseMyState(initState){
    const reducer = useCallback((state,action) => {
        return action.payload
    }, [])

    const [state, dispatch] = useReducer(reducer, initState)

    function setState(payload){
        dispatch({ payload })
    }
    
    return [state, setState]
}


/**
 * useContext
 */
const ctx = React.createContext();
function MyUseContext(props){
    const [state,setState] = useState({number: 0})
    return <ctx.Provider value={ {state,setState} }>
        {props.children}
    </ctx.Provider>
}
function App(){
    return <MyUseContext>
        <GetCtx1/>
        <GetCtx2/>
    </MyUseContext>
}

function GetCtx1(){
    const {state,setState} = useContext(ctx)
    return <>
        {state.number}
        <button onClick={() => { setState({ number: state.number + 1 }) }}>+</button>
    </>
}
function GetCtx2(){
    return <ctx.Consumer>
        {
            (values) => {
                return <>
                    {values.state.number}
                    <button onClick={() => { values.setState({ number: values.state.number + 1 }) }}>+</button>
                </>
            }
        }
    </ctx.Consumer>
}






/**
 * useEffect
 * useEffect -> componentDidMount,componentDidUpdate,componentWillUnMount 相当于这三个生命周期
 * useEffect 会在组件挂载完成之后，或者组件更新之后执行
 * 
 * 如果没有给第二个参数，每次渲染都会执行(出现 setInterval 会出现定时器累加的情况)  ->  useEffect(() => {})
 */
class Counter extends React.Component{
    state = { number: 0 }
    componentDidMount(){
        // 初始化
        document.title = this.state.number
    }
    componentDidUpdate(){
        // 组件更新的时候
        document.title = this.state.number
    }
    render(){
        return <>
            {this.state.number}
            <button onClick={() => { this.setState({ number: this.state.number + 1 }) }}>+</button>
        </>
    }
}

function Counter1 () {
    const [state, setState] = useState({ number: 0 })
    
    // useEffect 会在组件挂载完成之后，或者组件更新之后执行
    // 如果没有给第二个参数，每次渲染都会执行(出现 setInterval 会出现定时器累加的情况)  ->  useEffect(() => {})
    useEffect(() => {
        console.log('执行useEffect', state.number)
        document.title = state.number
    }, [])
  
    return <>
        {state.number}
        <button onClick={() => { setState({ number: state.number + 1 }) }}>+</button>
    </>
}

function Counter2 () {
    const [state, setState] = useState({ number: 0 })
    
    // useEffect 会在组件挂载完成之后，或者组件更新之后执行
    // 如果没有给第二个参数，每次渲染都会执行(出现 setInterval 会出现定时器累加的情况)  ->  useEffect(() => {})
    useEffect(() => {
       let timer = setInterval(() => {
            // 下面两个写法 state 更新不一样
            setState(state => ({ number: state.number + 1 }))
            // setState({ number: state.number + 1 })

            document.title = state.number
       }, 1000)

       return () => {
            console.log('卸载组件了-> useEffect 卸载')
            clearInterval(timer)
       }
    }, [])
  
    return <>
        {state.number}
        <button onClick={() => { setState({ number: state.number + 1 }) }}>+</button>
    </>
}

function TestUseEffect(){
    const [falg, setFlag] = useState(true)
    return <>
        {falg}
        <button onClick={() => {setFlag(false)}}>测试UseEffect</button>
        { falg && <Counter2/> }
    </>
}



/**
 * 
 * @param {*} createRef 
 * @param {*} useRef 
 * 
 * 下面的案例看出来 createRef 和 useRef 的区别
 * createRef 每次渲染都会创建新的 ref 对象
 * 
 * useMemo，useCallback，useRef 都是为了缓存，避免再次创建
 */

 // 使用 useRef 创建ref， 只会创建一次
let crrrentRef;
function useRef1(){
    if(!crrrentRef){
        crrrentRef = {current: null}
    }
    return crrrentRef;
}

let lastRef;
function MyUseRefChildrenCreateRef(props,ref){
    let refObj = React.createRef();
    console.log('lastRef === refObj', lastRef === refObj)
    lastRef = refObj;

    const btnGetFocus = useCallback(() => {
        refObj.current.focus();
    })
    return <>
        <input ref={refObj}/>
        <button onClick={btnGetFocus}>获得焦点</button>
    </>
}


/**
 * 通过 useImperativeHandle 暴露我只想暴露的部分
 * 父组件的 refObj.current 拿到的是 useImperativeHandle 回调函数的返回值
 */
function MyUseRefChildrenUseRef(props,ref){
    let refObj1 = useRef()

    // 通过 useImperativeHandle 暴露我只想暴露的部分
    // 父组件的 refObj.current 拿到的是 useImperativeHandle 回调函数的返回值
    useImperativeHandle(ref, () => {
        return {
            focus(){
                refObj1.current.focus()
            }
        }
    })
    return <>
        {/* <input ref={ref}/> */}
        <input ref={refObj1}/> 
    </>
}
MyUseRefChildrenUseRef = React.forwardRef(MyUseRefChildrenUseRef);
function MyUseRef(){
    const [state, setState] = useState(0)
    let refObj = React.useRef();

    const btnClick = useCallback(() => {
        setState(x => x + 1);
    })

    const btnGetFocus = useCallback(() => {
        refObj.current.focus();
    })
    return <>
        {state}
        <MyUseRefChildrenCreateRef/>
        <button onClick={btnClick}>+1</button>
        '----隔离----'
        <MyUseRefChildrenUseRef ref={refObj}/>
        <button onClick={btnGetFocus}>获得焦点</button>
    </>
}



/**
 * useLayoutEffect 同步触发渲染 & 读取 dom 布局
 * 在所有的 dom 变更只会 同步调用 effect
 * 
 * useLayoutEffect 在 layout 阶段后面 & painting 阶段之前 执行
 * useEffect 在 painting 阶段之后 渲染 执行
 */

function TestUseLayoutEffect(){
    const [color, setColor] = useState('red')

    useEffect(() => {
        console.log(color)
    })

    useLayoutEffect(() => {
        alert(color)
    })

    return <>
        <div style={{ background: color }}>颜色</div>
        <button onClick={ () => { setColor('red') }} >变红</button>
        <button onClick={ () => { setColor('yellow')}} >变黄</button>
        <button onClick={ () => { setColor('blue')}} >变蓝</button>
    </>
}



/**
 * 自定义 hooks
 */

function UseNumber(){
    const [number, setNumber] = useState(0)
    useEffect(() => {
        let timer = setInterval(() => {
            setNumber( x => x+ 1)
        }, 1000);

        return () => {
            clearInterval(timer)
        }
    })
    return number
}

function TestUseNumber(){
    let number = UseNumber()
    return <>
        {number}
    </>
}

/**
 * redux-logger
 */
function UseLogger(reducer, initState){
    let [state, dispatch] = useReducer(reducer, initState)
    function loggerDispatch(action){
        console.log('old state', state)
        dispatch(action)
    }

    useEffect(() => {
        console.log('new state', state)
    })
    return [state, loggerDispatch]
}


function TestUseLogger(){
    // useReducer 后两个参数(initArgs,initFn) 就是为了得到 initialState
    const [state, dispatch] = UseLogger(reducer, {name: 1})

    return <>
        {state.name}
        <button onClick={() => {dispatch({type: 'add'})}}>add</button>
        <button onClick={() => {dispatch({type: 'decrement'})}}>decrement</button>
    </>
}


/**
 * redux-thunk
 */
function UseThunk(reducer, initState){
    let [state, dispatch] = useReducer(reducer, initState)

    function thunkDispatch(action){
        if(typeof action === 'function'){
            // 传入 thunkDispatch 可以反复进行 异步 dispatch 操作
            // 如果传入 dispatch 会出现 异步action套异步action 没法运行情况
            action(thunkDispatch, () => state)
        }else {
            dispatch(action)
        }
    }
    return [state, thunkDispatch]
}

function TestUseThunk(){
    // useReducer 后两个参数(initArgs,initFn) 就是为了得到 initialState
    const [state, dispatch] = UseThunk(reducer, {name: 1})

    return <>
        {state.name}
        <button onClick={ () => {  dispatch( (dispatch, getState) => {
            return dispatch((dispatch1, getState) => (dispatch1({type: 'add'})))
        } )  } }>add</button>
        <button onClick={() => {dispatch({type: 'decrement'})}}>decrement</button>
    </>
}

/**
 * redux-promise
 */
function UsePromise(reducer, initState){
    let [state, dispatch] = useReducer(reducer, initState)

    function promiseDispatch(action){
        if(typeof action.then === 'function'){
            // 传入 thunkDispatch 可以反复进行 异步 dispatch 操作
            // 如果传入 dispatch 会出现 异步action套异步action 没法运行情况
            action.then(promiseDispatch)
        }else {
            dispatch(action)
        }
    }
    return [state, promiseDispatch]
}

function TestUsePromise(){
    // useReducer 后两个参数(initArgs,initFn) 就是为了得到 initialState
    const [state, dispatch] = UsePromise(reducer, {name: 1})

    return <>
        {state.name}
        <button onClick={ () => { dispatch(
            new Promise((resolve) => {
                setTimeout(() => {
                    resolve({type: 'add'})
                }, 1000);
            })  
        ) } }>add</button>
        <button onClick={() => {dispatch({type: 'decrement'})}}>decrement</button>
    </>
}


let id = 0;
function UseAjax(url){
    const [offset, setOffset] = useState(0)
    const [data,setData] = useState([])

    function loadMore(){
        // fetch(url).then((res) => res.json()).then((res) => {
        //     setData(...data, ...res)
        //     setOffset(offset + res.length)
        // })
        
        const res = []
        for(let i = 0; i<5; i++){
            res.push({name: ++id});
        }

        // setTimeout(() => {
            Promise.resolve().then(() => {
                console.log('111---zzz');
                setData([...data, ...res])
                setOffset(offset + res.length)
            })
        // }, 1000);
    }

    useEffect(() => {
        loadMore()
    }, [])
    return [data, loadMore]
}

function TestUseAjax(){
    const [users, loadMore] = UseAjax('/test')
    console.log('222---zzz', users);
    // 点击按钮调用 loadMore

    useLayoutEffect(() => {
        console.log('render');
    })

    requestAnimationFrame(()=> {
        console.log('render11');
    })
    
    if(users.length){
        return <ul>
            {
                users.map((item, index) => {
                    return <li key={index}>{item.name}</li>
                })
            }
            <button onClick={ () => loadMore() }>loadMore</button>
        </ul>
    }else {
        return <>loading....</>
    }
}

// class 组件 setState 有类似批处理方式
// 同一个方法调用两次 setState 只render 一次
class ClassTestUseAjax extends React.Component{
    state = {name: '11',sex: '222'}

    changeName = () => {
        this.setState({name: '33333'})
        this.setState({sex: '444'})
    }

    changeSex = () => {
        this.setState({name: '5555'})
        this.setState({sex: '6666'})
    }

    render(){
        console.log('render---ClassTestUseAjax')
        return <>
            {this.state.name}--{this.state.sex}
            <button onClick={ this.changeName }>loadMore</button>
            <button onClick={ this.changeSex }>loadMore</button>
        </>  
    }
}

export default ReduxHooks;

/**
 * redux-hooks ？？？？
 */