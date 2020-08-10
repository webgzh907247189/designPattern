// https://juejin.im/post/6854573217349107725

import React, { useState, useCallback, useEffect, useRef } from 'react';

function debounce(fn, ms) {
    let timer;
    return function(...args) {
        console.log('debounce 开始执行了', timer)
        if (timer) {
            clearTimeout(timer)
        }
        timer = setTimeout(() => {
            fn(...args)
            timer = null;
        }, ms);
    }
}



  
function useDebounce1(fn, time) {
    console.log('useDebounce')
    return debounce(fn, time);
}

let lastTestUseDebounce1SetCounter
let lastTestUseDebounce1HandleClick
function TestUseDebounce1() {
    const [counter, setCounter] = useState(0);
    console.log(lastTestUseDebounce1SetCounter === setCounter, 'lastTestUseDebounce1SetCounter === setCounter')
    lastTestUseDebounce1SetCounter = setCounter
  
    const handleClick = useDebounce1(function() {
      setCounter(counter + 1)
    }, 1000)
    console.log(lastTestUseDebounce1HandleClick === handleClick, 'lastTestUseDebounce1HandleClick === handleClick')
    lastTestUseDebounce1HandleClick = handleClick
    
    console.log('zzz--render')
    return <div style={{ padding: 30, border: '1px solid red' }}>
        <button onClick={handleClick}>
            debounce 生效，虽然每次render 都会生成新的 debounceFn，但是点击的时候没有执行 setCounter(没有重新render)，所以还是当前的 debounceFn， 所以生效，但是存在 重新render之后，重新生成 debounceFn 的情况</button>
        <div>{counter}</div>
    </div>
}





let lastTestUseDebounce2Click
function TestUseDebounce2() {
    const [counter1, setCounter1] = useState(0);
    const [counter2, setCounter2] = useState(0);
  
    const handleClick = useDebounce1(function() {
        setCounter1(counter1 + 1)
    }, 500)
    console.log(lastTestUseDebounce2Click === handleClick, 'lastTestUseDebounce2Click === handleClick')
    lastTestUseDebounce2Click = handleClick

    useEffect(function() {
        const t = setInterval(() => {
            setCounter2(x => x + 1)
        }, 500);
        return () => clearInterval(t)
    }, [])
  
  
    return <div style={{ padding: 30, border: '1px solid blue' }}>
        <div>debounce 失效效，因为每次 setCounter2 执行，都重新render，造成 每次 handleClick 都是新生成的，失效</div>
        <button onClick={function() {
            handleClick()
        }}
        >click</button>
        <div>{counter1}</div>
        <div>{counter2}</div>
    </div>
}
  




function useDebounce3(fn, delay) {
    return useCallback(debounce(fn, delay), [])
}

let lastTestUseDebounce3Click
function TestUseDebounce3() {
    const [counter, setCounter] = useState(0);
  
    const handleClick = useDebounce3(function() {
        setCounter(counter + 1)
        // setCounter(counter => counter + 1) // 同步更新 有效
    }, 1000)
    console.log(lastTestUseDebounce3Click === handleClick, 'lastTestUseDebounce3Click === handleClick')
    lastTestUseDebounce3Click = handleClick
  
    return <div style={{ padding: 30,border: '1px solid #000' }}>
        <button onClick={handleClick}>click</button>
        <div>{counter}</div>
    </div>
}
  





function TestUseDebounce4() {
    const [counter, setCounter] = useState(0);
  
    const handleClick = useDebounce4(function() {
        setCounter(counter + 1)
        // setCounter(counter => counter + 1)
    }, 1000)
  
    return <div style={{ padding: 30, border: '1px solid yellow' }}>
        <button onClick={handleClick}>click</button>
        <div>{counter}</div>
    </div>
}

let lastUseDebounce4Fn
function useDebounce4(fn, delay, dep = []) {
    console.log(lastUseDebounce4Fn === fn, 'lastUseDebounce4Fn === fn')
    lastUseDebounce4Fn = fn;

    const { current } = useRef({ fn, timer: null });
    console.log(current, 'current')
    useEffect(function () {
        console.log('useEffect 执行了')
        current.fn = fn;
    }, [fn]);
  
    return useCallback(function f(...args) {
        console.log('useCallback 执行了')
        if (current.timer) {
            clearTimeout(current.timer);
        }
        current.timer = setTimeout(() => {
            current.fn.call(this, ...args);
        }, delay);
    }, dep)
}



function TestTestUseDebounce(){
    return <>
        <TestUseDebounce1/>
        {/* <TestUseDebounce2/> */}
        <TestUseDebounce3/>
        <TestUseDebounce4/>
    </>
}
export default TestTestUseDebounce;