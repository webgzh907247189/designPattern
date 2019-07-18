import React from 'react'
let ctxContainer = React.createContext()

class Ctx extends React.Component{
    state = {
        count: 1
    }
    handle = () =>{
        this.setState({
            count: ++this.state.count
        })
    }
    render(){
        return <div style={ {color: 'red'} }>
            <ctxContainer.Provider value={ {name: 'ctx',des: 'ctx测试',desFn: 'hooks ctx测试',handle: this.handle,count: this.state.count} }>
                <Context>
                </Context>
            </ctxContainer.Provider>
        </div>
    }
}

export default Ctx


class Context extends React.PureComponent{
    render(){
        return <>
            <ContextChildren1/>
            <ContextChildren2/>
            <ContextChildren3/>
        </>
    }
}

class ContextChildren1 extends React.PureComponent{ 
    // 类组件无需使用 context.Consumer,使用 contextType 直接挂载
    // 只要把 context(上下文) 挂载 到静态属性 contextType 上面，react内部把其挂载到 this.context上面
    static contextType = ctxContainer

    render(){
        let {name,handle} = this.context
        return <div onClick={ () => {handle()} }>
            使用context的 -> class组件自动挂载 this.context 取值：{name}
            <button>点击</button>
        </div>
    }
}

function ContextChildren2(){
    let {desFn} = React.useContext(ctxContainer)
    return <div>使用hooks的 -> useContext 取值：{desFn}</div>
}

function ContextChildren3(){
    return <div>
        <ctxContainer.Consumer>
            {
                ({des,count})=>{
                    return <div>使用ctx的 -> Consumer 取值：{des}
                        <div style={ {color: 'green'} }>点击第一个组件，使用ctx传递事件 & 取值{count}</div>
                    </div>
                }
            }
        </ctxContainer.Consumer>
    </div>
}