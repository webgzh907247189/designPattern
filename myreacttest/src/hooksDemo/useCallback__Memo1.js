const Child = React.memo(({ onSubmit }) => {
    console.log("child渲染了")
    return (
        <div>
            <button onClick={onSubmit}>submit</button>
        </div>
    )
})

// react.useCallback 优化
// 1. 子组件必须使用memo包裹
// 2. 使用ref 生成不可变的ref对象，通过ref对象的current属性来控制需要的值

const App = () => {
    const [text, setText] = React.useState("")

    // 方案一
    // const onSubmit1 = React.useCallback(() => {
    //     console.log(text, 'text')
    // }, []) //text是初始值，没有更新
     
    
    // 方案二
    // const onSubmit2 = React.useCallback(() => {
    //     console.log(text)
    // }) 
    //text是新的，text变化时，生成了新的onSubmit2,表示只要有属性更新就执行
    
    // 方案三，等同于方案二
    // const onSubmit3 = React.useCallback(() => {
    //     console.log(text)
    // }, [text]) 
    //text是新的，text变化时，生成了新的onSubmit2,表示text更新时执行 
    
    // 方案四，达到了目的
    // const ref = React.useRef()
    // React.useLayoutEffect(() => {
    //     ref.current = text
    // }, [text])
    // const onSubmit4 = React.useCallback(() => {
    //     console.log(ref.current)
    // }, [ref])
    //ref只在创建时更新，其属性current跟随text变化，不会生成新的onSubmit4
    
    
    // 方案五，不用每次渲染都创建新的 useLayoutEffect cb函数
    const ref = React.useRef()
    ref.current = text;
    const onSubmit5 = React.useCallback(() => {
        console.log(ref.current, 'text')
    }, [ref])//ref只在创建时更新，其属性current跟随text变化，不会生成新的onSubmit4 
    
    console.log("app渲染")
    return (
        <div>
            <input value={text} onChange={e => setText(e.target.value)} />
            {/* Child组件使用了React.memo */}
           
            <Child onSubmit={onSubmit5} />
        </div>
    )
}

// ReactDOM.render(<App />, document.querySelector("#app"))
