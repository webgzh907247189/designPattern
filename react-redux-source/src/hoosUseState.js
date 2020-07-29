import React, { useState, useCallback, memo, useMemo, useReducer, useContext, useEffect } from 'react';

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
 * memo 使用 认知 调整
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
function HooksUseReducer(){
    // useReducer 后两个参数(initArgs,initFn) 就是为了得到 initialState
    const [state, dispatch] = useReducer(reducer, {name: 1}, (abc) => abc)

    const [myState,setMyState] = UseMyState({name: '自定义useState'})
    return <>
        {state.name}
        <button onClick={() => {dispatch({type: 'add'})}}>add</button>
        <button onClick={() => {dispatch({type: 'decrement'})}}>decrement</button>

        {myState.name}
        <button onClick={() => {setMyState({name: '自定义hooks更新成功'})}}>decrement</button>
    </>
}

// 使用 useReducer 实现 useState
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


// useContext
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






// 重要的hook
// useEffect -> componentDidMount,componentDidUpdate,componentWillUnMount 相当于这三个生命周期

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
export default HooksUseCallBack1;