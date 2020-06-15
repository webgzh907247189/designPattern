react-redux
let ctx = React.createContext() 
1. react-redux 使用 provider 提供数据，ctx.Provider 提供数据

class Provider extends React.component {
    render(){
        // this.props.xx 为在项目中传入的 store
        // <Provider store = { {name: 'xxx'} }>asdasd</Provider> 

        // this.props.xx ===  {name: 'xxx'} === this.props.store
        // this.props.children === asdasd
        return <ctx.Provider value={ {store: this.props.xx} }>
            {
                this.props.children
            }
        </ctx.Provider>
    }
}


2. connect 链接组件
function Connect(mapStateToProps,mapDispatcher__Or__Action) {
    return function (WarppendCom) {
        return class extends React.component{
            static contextType = ctx;

            constructor(props,context){
                super(props)

                // 只要把 context(上下文) 挂载 到静态属性 contextType 上面，react内部把其挂载到 this.context上面
                this.state = mapStateToProps(context.store.getState()) // context.store. 
            }

            componentDidMount(){
                this.unSubscribe = this.context.store.
            }

            componentWillUnMount(){
                this.unSubscribe();
            }

            render(){
                // 在这里，每次render 都会重新计算
                // let boundAction = bindActionCreators(action,this.context.store.dispatch)
                return <WarppendCom {...this.state}></WarppendCom>
            }
        }   
    }
}



// 兄弟组件想互相交流，交换对方的数据，那么唯一的解决方案就是：提升 state   ->  redux 使用 provider 提供一个全局的store
redux
