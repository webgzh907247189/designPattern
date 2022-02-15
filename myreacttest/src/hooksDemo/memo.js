const data1 = { name: 'name1', age: '2' }

/**
 * https://jsfiddle.net/user/fiddles/all/
 * 
 * React 渲染 demo
 * 
 * 函数组件内部的常量提取到外面
 */

function TodoApp() {
    console.log('app==render')
    let [state, setState] = React.useState(0)
    let btnCLick = () => {
        setState(state + 1)
    }
    return (
        <div>
            <button onClick={btnCLick}>{state}</button>
            <Echatsmemo data={data1} />
            <Echatsmemo data={{ name: 'name2', age: '4' }} />
        </div>
    )
}

function Echats(props) {
    console.log('Echats==render', props.data.name)
    return <div>{props.data.name}--{props.data.age}</div>
}
const Echatsmemo = React.memo(Echats)
/* const Echatsmemo = Echats */
// ReactDOM.render(<TodoApp />, document.querySelector("#app"))
