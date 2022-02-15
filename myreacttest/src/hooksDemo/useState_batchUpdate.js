/**
 * https://jsfiddle.net/user/fiddles/all/
 * 
 * React 渲染 demo
 * 
 * 没有使用合并更新， promise then 里面每次 setState 都触发了 render
 */

function TodoApp() {
    return (
        <div>
            {/* 没有使用合并更新， promise then 里面每次 setState 都触发了 render */}
            <Test1 />

            {/* 合并更新 */}
            <Test2 />
        </div>
    )
}

function Test1() {
    console.log('test1--render');
    let [state1, setState1] = React.useState(0)
    let [state2, setState2] = React.useState(0)
    React.useEffect(() => {
        new Promise((r) => {
            setTimeout(() => {
                r('')
            }, 3000)
        }).then(() => {
            setState1(state1 + 1)
        })

        new Promise((r) => {
            setTimeout(() => {
                r('')
            }, 3000)
        }).then(() => {
            setState2(state2 + 1)
        })
    }, [])
    return <div>{state1}test!!{state2}</div>
}



function Test2() {
    console.log('test2--render');
    let [, batchUpdate] = React.useState(0)
    let ref = React.useRef({ effect1: null, effect2: null })
    React.useEffect(() => {
        new Promise((r) => {
            setTimeout(() => {
                r('')
            }, 6000)
        }).then(() => {
            ref.current.effect1 = '1'
        })

        new Promise((r) => {
            setTimeout(() => {
                r('')
            }, 6000)
        }).then(() => {
            ref.current.effect2 = '2'
        }).then(() => {
            batchUpdate()
        })
    }, [])
    return <div>{ref.current.effect1}test!!{ref.current.effect2}</div>
}

// ReactDOM.render(<TodoApp />, document.querySelector("#app"))
