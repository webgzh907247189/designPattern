import React from 'react'
import ReactDOM from 'react-dom';

let ctxContainer = React.createContext()
class Ctx extends React.Component{
    render(){
        return <ctxContainer.Provider value={ {name:'我是使用useContext取值的'} }>
            <Memo/>
        </ctxContainer.Provider>
    }
}




let myUseStateObj = {
    memoizedState: '',
    useState(initialState){
        this.memoizedState = this.memoizedState || initialState
        let setState = (state) => {
            // debugger
            this.memoizedState = state
            render()
        }
        return [this.memoizedState,setState]
    }
}
function MyUseState(){
    let [state,add] = myUseStateObj.useState(0)
    return <>
        <div>
            <span>自己实现的UseState -> {state}</span>
            <button onClick={() => {add(state + 1)}}>UseState +</button>
        </div>
    </>
}

function UseState(){
    let [state,add] = React.useState(0)
    console.log('UseState render')
    return <>
        <div>
            <span>UseState -> {state}</span>
            <button onClick={() => {add(state + 1)}}>UseState +</button>
        </div>
    </>
}






function UseStateMore(){
    let [name,setName] = React.useState('计算器')
    let [state,add] = React.useState(0)
    return <>
        <div>
            <span>UseStateMore -> {state}: {name}</span>
            <button onClick={() => {setName(`改名字${Date.now()}`)}}>改名字</button>
            <button onClick={() => {add(state + 1)}}>UseStateMore +</button>
        </div>
    </>
}


let myUseStateMoreObj = {
    index: 0,
    memoizedStates: [],
    useState(initialState){
        this.memoizedStates[this.index] = this.memoizedStates[this.index] || initialState

        // 需要使用 currentIndex 来保存下 index，否则会出问题,保留其下标
        let currentIndex = this.index
        let setState = (state) => {
            this.memoizedStates[currentIndex] = state

            render(()=>{
                this.index = 0 
            })
        }
        return [this.memoizedStates[this.index++],setState]
    }
}
function MyUseStateMore(){
    let [name,setName] = myUseStateMoreObj.useState('计算器')
    let [state,add] = myUseStateMoreObj.useState(0)
    return <>
        <div>
            <span>UseStateMore -> {state} ::: {name}</span>
            <button onClick={() => {setName(`改名字${Date.now()}`)}}>改名字</button>
            <button onClick={() => {add(state + 1)}}>UseStateMore +</button>
        </div>
    </>
}







let myUseReducerObj = {
    memoizedState: '',
    useReducer(reducer,initArg,init){
        let initialState = void 0
        if(typeof init != 'undefined'){
            initialState = init(initArg)
        }else{
            initialState = initArg
        }
        this.memoizedState = this.memoizedState || initialState

        let dispatch = (action) => {
            this.memoizedState = reducer(this.memoizedState,action)
            render()
        }
        return [this.memoizedState,dispatch]
    }
}
function MyUseReducer(){
    function init(state){
        return {number: state.number}
    }
    
    function reducer(state,action){
        switch (action.type){
            case 'add':
                return {number: state.number + 1}
            default: 
                return state
        }
    }

    let [state,dispatch] = myUseReducerObj.useReducer(reducer,{number: 0},init)
    return <>
        <div>
            <span>自己实现的UseReducer -> {state.number}</span>
            <button onClick={() => {dispatch({type: 'add'})}}>UseReducer +</button>
        </div>
    </>
}

function UseReducer(){
    function init(state){
        return {number: state.number}
    }
    
    function reducer(state,action){
        switch (action.type){
            case 'add':
                return {number: state.number + 1}
            default: 
                return state
        }
    }

    let [state,dispatch] = React.useReducer(reducer,{number: 0},init)
    return <>
        <div>
            <span>UseReducer -> {state.number}</span>
            <button onClick={() => {dispatch({type: 'add'})}}>UseReducer +</button>
        </div>
    </>
}









let myUseEffectObj = {
    lastDependencies: '',
    useEffect(cb,dependencies){
        if(!dependencies){
            return cb()
        }
        let changed = this.lastDependencies ? !dependencies.every((item,index) => item === this.lastDependencies[index]) : true
        if(changed){
            cb()
            this.lastDependencies = dependencies
        }
    }
}
function MyUseEffect(){
    let [state,add] = React.useState(0)
    let [name,setName] = React.useState('计算器')

    myUseEffectObj.useEffect(()=>{
        console.log('myUseEffectObj',state)
    },[name])
    return <>
            <div>
            <span>自定义的 MyUseEffect -> {state}: {name}</span>
            <button onClick={() => {setName(`改名字${Date.now()}`)}}>改名字</button>
            <button onClick={() => {add(state + 1)}}>UseReducer +</button>
        </div>
    </>
}


function UseEffect(){
    let [state,add] = React.useState(0)
    let [name,setName] = React.useState('计算器')

    React.useEffect(()=>{
        console.log('useEffect',state)
    },[name])

    return <>
        <div>
            <span>useEffect -> {state}: {name}</span>
            <button onClick={() => {setName(`改名字${Date.now()}`)}}>改名字</button>
            <button onClick={() => {add(state + 1)}}>UseReducer +</button>
        </div>
    </>
}

let myUseEffectObjMore = {
    index: 0,
    memoizedStates: [],
    useState(initialState){
        this.memoizedStates[this.index] = this.memoizedStates[this.index] || initialState

        // 需要使用 currentIndex 来保存下 index，否则会出问题,保留其下标
        let currentIndex = this.index
        let setState = (state) => {
            this.memoizedStates[currentIndex] = state

            render(()=>{
                this.index = 0 
            })
        }
        return [this.memoizedStates[this.index++],setState]
    },
    useEffect(cb,dependencies){
        if(!dependencies){
            this.index++
            return cb()
        }
        let lastDependencies = this.memoizedStates[this.index]

        let changed = lastDependencies ? !dependencies.every((item,index) => item === lastDependencies[index]) : true
        if(changed){
            cb()
            this.memoizedStates[this.index] = dependencies
        }
        this.index++
    }
}
function MyUseEffectMore(){
    let [state,add] = myUseEffectObjMore.useState(0)
    let [name,setName] = myUseEffectObjMore.useState('计算器')

    myUseEffectObjMore.useEffect(()=>{
        console.log('MyUseEffectMore1',state)
    },[name])
    myUseEffectObjMore.useEffect(()=>{
        console.log('MyUseEffectMore2',state)
    },[name])
    myUseEffectObjMore.useEffect(()=>{
        console.log('MyUseEffectMore3',state,'应该只打印一次')
    },[])

    return <>
            <div>
            <span>自定义的 MyUseEffectMore -> {state}: {name}</span>
            <button onClick={() => {setName(`改名字${Date.now()}`)}}>改名字</button>
            <button onClick={() => {add(state + 1)}}>UseReducer +</button>
        </div>
    </>
}







// 类似于 类组件的 shouldComponentUpdate 方法，优化函数组件用的
Memo = React.memo(Memo)
function Memo(){
    console.log('Memo组件 render',React.useContext(ctxContainer))
    let {name = ''} = React.useContext(ctxContainer)
    return <div>
            <span>Memo & useContext 取值： -> {name}</span>
    </div>
}







function Hooks(){
    return <>
        <div style={{border: '1px solid red'}}>
            <UseState/>
            <MyUseState/>
            <UseReducerToChangeUseState/>
        </div>

        <div style={{border: '1px solid pink',marginTop: '30px'}}>
            <UseStateMore/>
            <MyUseStateMore/>
        </div>

        <div style={{border: '1px solid blue',marginTop: '30px'}}>
            <MyUseReducer/>
            <UseReducer/>
        </div>


        <div style={{border: '1px solid red',marginTop: '30px'}}>
            <MyUseEffect/>
            <MyUseEffectMore/>
            <UseEffect/>
        </div>

        <Ctx/>
    </>
}


function render(cb){
    cb && cb()
    ReactDOM.render(<Hooks/>, document.getElementById('root'));
}

export default render
/**
 * 给函数组件添加状态的时候，使用hooks
 * 
 * useState 的 memoizedState(单词错误 -> memorizedState)
 * 
 * useReducer 是 useState 的内部实现， useState依赖 useReducer
 * 
 * hooks 在最外层调用，不要在循环，判断，子函数调用hooks (链表维护 数组维护的状态，可能下标出现问题，不能一一对应)
 * 
 * 
 * class 组件性能差，需要保持实列
 * hoc 组件 复用性 差
 * 
 * 在函数主体中，不能写有副作用的逻辑(订阅，设置定时器，修改dom) 
 * useEffect 添加副作用逻辑 (类似didMount，didupdate) 
 */


function UseReducerToChangeUseState(){
    let [state,add] = React.useReducer((oldValue,newValue) => ({number: newValue}),{number: 0})

    return <>
        <div>
            <span>我是依赖UseReducer 去实现的 UseState -> {state.number}</span>
            <button onClick={() => {add( state.number + 1 )}}>UseState +</button>
        </div>
    </>
}