import React from 'react'
let ctxContainer = createContext()

class MyCtx extends React.Component{
    state = {
        count: 1
    }
    handle = () =>{
        this.setState({
            count: ++this.state.count
        })

        setTimeout(()=>{
            console.log('state发生了变化',this.state.count)
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

export default MyCtx


// class Context extends React.PureComponent
// 这样写不会更新，必须写 React.Component 
class Context extends React.Component{
    state = {}

    // static getDerivedStateFromProps(newProps,state){
    //     console.log(newProps,state)
    //     return {}
    // }

    render(){
        return <>
            <ContextChildren1/>
            <ContextChildren2/>
            <ContextChildren3/>
        </>
    }
}

class ContextChildren1 extends React.Component{ 
    // 类组件无需使用 context.Consumer,使用 contextType 直接挂载
    // 只要把 context(上下文) 挂载 到静态属性 contextType 上面，react内部把其挂载到 this.context上面
    static contextType = ctxContainer

    render(){
        this.context = ContextChildren1.contextType.Provider.value
        let {name,handle} = this.context
        return <div onClick={ () => {handle()} }>
            使用context的 -> class组件自动挂载 this.context 取值：{name}
            <button>点击</button>
        </div>
    }
}

// 类似于 类组件的 shouldComponentUpdate 方法，优化函数组件用的
ContextChildren2 = React.memo(ContextChildren2)
function ContextChildren2(){
    console.log('ContextChildren2 render')
    let {desFn} = useContext(ctxContainer)
    return <div>使用hooks的 -> useContext 取值：{desFn}</div>
}


function ContextChildren3(){
    return <div>
        <ctxContainer.Consumer>
        {
                ({des,count})=>{
                    console.log(count,'count')
                    return <div>使用ctx的 -> Consumer 取值：{des}
                        <div style={ {color: 'green'} }>点击第一个组件，使用ctx传递事件 & 取值{count}</div>
                    </div>
                }
            }
        </ctxContainer.Consumer>
    </div>
}





function createContext(){
    class Consumer extends React.Component{
        render(){
            return this.props.children(Provider.value)
        }
    }

    // render porps
    class Provider extends React.Component{
        constructor(props){
            super(props)
            //  添加静态属性值,收到新属性，需要更新
            Provider.value = props.value
        }

        state = {
            stateTest: 'test'
        }

        // 两个参数 ->  一个是props，一个是自己的state (没加之前，props变化，没有重新赋值，目的 -> 通过props修改state)
        static getDerivedStateFromProps(newProps,ownState){
            Provider.value = newProps.value
            return {}
        }

        render(){
            // this.props.children -> 可能是字符串，对象，数组
            return this.props.children
        }
    }

    return {
        Consumer,
        Provider
    }
}

function useContext(ctx){
    return ctx.Provider.value
}

function memo(FnComponent){
    return class extends React.PureComponent{
        render(){
            return <FnComponent/>
        }
    }
}


// React.PureComponent 比较 -> 
// 1.对应的值(内存的地址)   2.属性的个数
class PureComponent extends React.Component{
    static isPureComponent = true
    //没有render，改写 shouldComponentUpdate
    shouldComponentUpdate(nextProps,nextState){
        return !(shallow(nextProps,this.props) && shallow(nextState,this.state))
    }
}

function shallow(prevObj,nextObj){
    if(prevObj === nextObj){
        return true
    }

    let prevLen = Object.keys(prevObj).length
    let nextObjLen = Object.keys(nextObj).length
    if(prevLen !== nextObjLen){
        return false
    }

    for(let key in prevLen){
        // 比较key
        if(!nextObj.hasOwnProperty(key)){
            return false
        }

        // 比较值
        if(prevObj[key] !== nextObj[key]){
            return false
        }
    }
    return true
}