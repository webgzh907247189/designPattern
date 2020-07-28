import React, { useState, useCallback } from 'react';

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
function HoosUseCallBack(){
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
export default HoosUseCallBack;