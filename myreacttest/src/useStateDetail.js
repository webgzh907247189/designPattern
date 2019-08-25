import React from 'react'

// 每次渲染都是独立的闭包(拥有自己的props，state)
function UseState(props){
    let [state,add] = React.useState(function(){
        return props.number
    })
    console.log('UseState render')

    function show(){
        setTimeout(()=>{
            alert(state)
        },3000)
    }
    return <>
        <div>
            <span>UseState（每次渲染都是独立的闭包） -> {state}</span>
            <button onClick={() => {add(state + 1)}}>UseState +</button>
            <button onClick={show}>show state</button>
        </div>
    </>
}


// 函数式更新
function UseStateLazy(){
    let [state,add] = React.useState(0)

    // 保存之前点击的值，然后重新更新
    function lazy(){
        setTimeout(()=>{
            add(state + 1)
        },3000)
    }

    // 采用最新的值进行更新
    function lazy2(){
        setTimeout(()=>{
            add(state => state + 1)
        },3000)
    }

    return <>
        <div>
            <span>UseState函数式更新 -> {state}</span>
            <button onClick={() => {add(state + 1)}}>UseState +</button>
            <button onClick={lazy}>lazy 更新采用上次点击值</button>
            <button onClick={lazy2}>lazy 更新同步</button>
        </div>
    </>
}




// 渲染优化
function MemoUseCallbackUseMemo(props){
    console.log('MemoUseCallbackUseMemo render')

    let [name,setName] = React.useState(()=>{
        return props.name || '计数器'
    })
    let [number,setNumber] = React.useState(0)

    // 数组是依赖项(如果传入是空数组，依赖的变量没有变化，所以运行第一次之后，后面一直使用第一次的运算结果)
    // 直到后面的数组的依赖项发生变化(number发生变化)，才会重新运算
    let data = React.useMemo(() => ({number}),[number])
    const addClick = React.useCallback(() => {
        setNumber(number+1)
    },[number])

    // 因为每次渲染都是独立的，所以每次都会重新render(data 和onClick 会发生变化，所以与上面没有关联的SubCounter 也会重新render) 
    return <>
        <div> 优化组件使用memo，useMemo，useCallback</div>
        <input type="text" value={name} onChange={(e) => setName(e.target.value)}/>
        <SubCounter data={data} onClick={addClick}></SubCounter>
    </>
}

// 当name发生变化当时候，number并没有变化。所以使用React.memo 优化组件
SubCounter = React.memo(SubCounter)
function SubCounter({data,onClick}){
    console.log('SubCounter render')
    return <>
        <button onClick={onClick}>{data.number}</button>
    </>
}




function UseRef(){
    let ref = React.useRef()
    function getFocus(){
        // 可以直接在父组件操作子组件的value(不安全)
        ref.current.value = '父组件操作的value'
        ref.current.focus()
    }

    return <>
        <UseRefChildren ref={ref}/>
        <button onClick={getFocus}>获得焦点</button>
    </>
}

UseRefChildren = React.forwardRef(UseRefChildren)
function UseRefChildren(props,ref){
    return <>
        <input ref={ref}/>
    </>
}



function UseRefSafe(){
    let parentRef = React.useRef()
    function getFocus(){
        // 可以直接在父组件操作子组件的value，只能调用 通过useImperativeHandle() 暴漏的api 
        parentRef.current.focus()

        // 值无法赋值成功
        parentRef.current.value = '父组件操作的value????'

        parentRef.current.changeText('通过暴露的api完成赋值')
    }

    return <div>
        <UseRefSafeChildren ref={parentRef}/>
        <button onClick={getFocus}>获得焦点</button>
    </div>
}

UseRefSafeChildren = React.forwardRef(UseRefSafeChildren)
function UseRefSafeChildren(props,ref){
    let childrenRef = React.useRef()
    let childrenInputRef = React.useRef()
    React.useImperativeHandle(ref,()=>{
        return {
            focus(){
                childrenRef.current.focus()
            },
            changeText(text){
                childrenInputRef.current.value = text
            }
        }
    })

    return <>
        <input ref={childrenRef}/>
        <input ref={childrenInputRef}/>
    </>
}




function UselayoutEffect(){
    let [color,setColor] = React.useState('red')
    
    // 同步的 (更快的 修改dom)
    // 可以用来读取dom布局，并且同步触发渲染 
    React.useLayoutEffect(()=>{
        console.log('UselayoutEffect -> ' + color)

        // 此处修改 background 页面不会闪烁
        // document.getElementById('color').style.background = 'pink'
    })
    // 异步
    React.useEffect(()=>{
        console.log('useEffect',color)

        // 此处修改 background 页面会闪烁
        // document.getElementById('color').style.background = 'pink'
    })
    return <>
        <div id="color" style={{background: color}}>颜色</div>
        <button onClick={()=> {setColor('red')}}>红色</button>
        <button onClick={()=> {setColor('yellow')}}>黄色</button>
        <button onClick={()=> {setColor('blue')}}>蓝色</button>
    </>
}

function Render(){
    return <>
        <div style={{border: '1px solid pink',marginTop: '30px'}}>
            <UseState number={-2}/>
            <UseStateLazy/>
        </div>
     
        <div style={{border: '1px solid red',marginTop: '30px'}}>
            <MemoUseCallbackUseMemo/>
        </div>

        <div style={{border: '1px solid block',marginTop: '30px'}}>
            <UseRef/>
            <UseRefSafe/>
        </div>

        <div style={{border: '1px solid red',marginTop: '30px'}}>
            <UselayoutEffect/>
        </div>
    </>
}
export default Render