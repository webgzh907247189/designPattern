import React from 'react'
import ReactDOM from 'react-dom';
import UseStateDetail from './useStateDetail'

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


/** hooks  useState(单链表结构) 
 *  每一个节点都是一个对象，当前对象有两个key，一个key是保存当前的值，另一个key是 next，next 指向下一个对象，由此组成单链表 
 */
console.log(new Date().getTime() === Date.now()) //true

let dataStructureFirst = {next: null,memoizedState: null}
let dataStructureUseState = {
    firstWorkInProgressHook: dataStructureFirst,
    workInProgressHook: dataStructureFirst,
    useState(initialState){
        console.log('1111',this.workInProgressHook)

        let currentHook = this.workInProgressHook.next ? this.workInProgressHook.next : {memoizedState: initialState,next: null}
        let setState = (newState) => {
            currentHook.memoizedState = newState

            render(()=>{
                // 链表回源 (回到最开始的地方)
                this.workInProgressHook = this.firstWorkInProgressHook
            })
        }

        if(this.workInProgressHook.next){
            // 找到当前的 state
            this.workInProgressHook = this.workInProgressHook.next
        }else{
            // 链表 挂载完成，形成链式
            this.workInProgressHook.next = currentHook
            // workInProgressHook 向后移一步
            this.workInProgressHook = currentHook
        }
        // 返回当前state
        return [currentHook.memoizedState,setState]
    }
}

function DataStructureUseState(){
    let [name,setName] = dataStructureUseState.useState('计算器')
    let [state,add] = dataStructureUseState.useState(0)
    return <>
        <div>
            12312
            <span>使用单链表的UseStateMore -> {state}: {name}</span>
            <button onClick={() => {setName(`改名字${Date.now()}`)}}>改名字</button>
            <button onClick={() => {add(state + 1)}}>UseStateMore +</button>
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
    // useReducer 后两个参数 就是为了得到 initialState
    useReducer(reducer,initArg,init){
        // 得到 initialState
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

    // 
    React.useEffect(()=>{
        const timeer = setInterval(()=>{
            add(state + 1)
        },1000)
        // 副作用的函数可以返回一个函数，用来清除副作用 
        // 防止内存泄露，清除函数会在组件卸载之前调用。如果多次渲染，则在下一个effect之前，清除上个effect
        return ()=>{
            clearInterval(timeer)
        }
    })

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
            <DataStructureUseState/>
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

        <div style={{border: '1px solid blue',marginTop: '30px'}}>
            <UseStateDetail/>
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
 * 只能在函数组件内部调用hooks
 * 
 * class 组件性能差，需要保持实列
 * hoc 组件 复用性 差
 * 
 * 在函数主体中，不能写有副作用的逻辑(订阅，设置定时器，修改dom) 
 * useEffect 添加副作用逻辑 (类似didMount，didupdate) 每次重新render之后，在指向effect的回调函数
 * 每次渲染重新产生新的 useEffect
 * 
 * 
 * hooks 特点 可以用在函数组件，并且可以在函数组件的多次渲染保持不变
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