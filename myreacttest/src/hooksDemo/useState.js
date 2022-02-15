/**
 * https://jsfiddle.net/user/fiddles/all/
 * 
 * React 渲染 demo
 * 
 * 没有使用合并更新，promise.then 没有合并更新，每个 setState 都是独立更新
 */
function TodoApp() {
    return (
        <div>

            <App1>
                <Children />
            </App1>

            <Test />
        </div>
    )
}

// setState 情况对比
function App1(props) {
    console.log('App--render');
    let [state, setState] = React.useState(0)

    // 没有合并更新，每个 setState 都是独立更新
    const btnClick = () => {

        new Promise((r) => {
            setTimeout(() => {
                r('')
            }, 2000)
        }).then(() => {
            setState(10)
            setState(11)
            setState(12)
        })
            .then(() => {
                setState(20)
            })
            .then(() => {
                setState(30)
            })
    }

    return <div onClick={btnClick}>
        我是App组件 {state}
        {props.children}
    </div>
}

function Test() {
    console.log('test--render');
    let [state1, setState1] = React.useState(0)
    let [state2, setState2] = React.useState(0)
    React.useEffect(() => {
        new Promise((r) => {
            setTimeout(() => {
                r('')
            }, 1000)
        }).then(() => {
            setState1(state1 + 1)
        })

        new Promise((r) => {
            setTimeout(() => {
                r('')
            }, 1000)
        }).then(() => {
            setState2(state2 + 1)
        })
    }, [])
    return <div>{state1}test!!{state2}</div>
}

function Children() {
    console.log('Children--render');
    return <div>我是Children组件</div>
}

// ReactDOM.render(<TodoApp />, document.querySelector("#app"))
