const Foo = React.memo((props) => {
    let count = props.count;
    console.log("函数重新渲染",count);
    return <div onClick={props.addCount}>count: {count} </div>
});
  
const App = React.memo(() => {
    console.log('app')
    const [count, setCount] = React.useState(0);
  
    let double = React.useMemo(() => {
        return count * 2
    }, [count==3]);
    
     //useCallback 可以看成useMemo返回函数时的简写，赋值给onClick 不会引发函数重新渲染
    let addCount=React.useCallback(() => {
        console.log(count);
        setCount((count) => {
            return count + 1
        })
    },[]); 
    // 括号可以看成依赖数组，当为空时，只有第一次挂载时才会渲染，当有数据时如[count]
    // 当count改变时才会改变，有多个数据时，所有数据改变时才会改变
  
    return (
        <div>
            <Foo addCount={addCount} count={double}></Foo>
            <button onClick={()=>{setCount((count) => count + 1)}}>{count}count+1</button>   
        </div>
    )
})
  
//   ReactDOM.render(<App />, document.querySelector("#app"))
  