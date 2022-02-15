
/**
 * https://jsfiddle.net/user/fiddles/all/
 * 
 * React 渲染 demo
 * 
 * 避免了 re-render 现象
 */

function TodoApp() {
    return (
        <div>
            {/* 触发了 re-render  */}
            <App />

            {/* 避免了 re-render 现象 */}
            <App1>
                <Children />
            </App1>
        </div>
    )
}

function App() {
    console.log('App--render');
    let [state, setState] = React.useState(0)

    const btnClick = () => {
        setState(state + 1)
    }
    return <div onClick={btnClick}>
        我是App组件 {state}
        <Children />
    </div>
}

function App1(props) {
    console.log('App--render');
    let [state, setState] = React.useState(0)

    // 没有合并更新，每个 setState 都是独立更新
    const btnClick = () => {
        setState(state + 1)
    }

    return <div onClick={btnClick}>
        我是App组件 {state}
        {props.children}
    </div>
}


function Children() {
    console.log('Children--render');
    return <div>我是Children组件</div>
}

// ReactDOM.render(<TodoApp />, document.querySelector("#app"))
