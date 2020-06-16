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
                this.state = mapStateToProps(context.store.getState()) // context.store

                if (typeof mapDispatcher__Or__Action === 'function') {
                    this.boundAction = action(context.store.dispatch,props)

                    // {                     
                    //     action1: (...args)=>{
                    //         dispatch(action(...args))
                    //     }
                    // }
                } else {
                    this.boundAction = bindActionCreators(action,context.store.dispatch)

                    // bindActionCreators(action,dispatch) -> {key1: () => (...args) => dispatch(action(...args))}

                    // {                     
                    //     action1: (...args)=>{
                    //         dispatch(action(...args))
                    //     }
                    // }
                }
            }

            componentDidMount(){
                this.unSubscribe = this.context.store.subscribe(() => {
                    this.setState(mapStateToProps(this.context.store.getState()))
                })
            }

            componentWillUnMount(){
                this.unSubscribe();
            }

            render(){
                // 在这里，每次render 都会重新计算
                // let boundAction = bindActionCreators(action,this.context.store.dispatch)
                return <WarppendCom {...this.state} {...this.boundAction}></WarppendCom>
            }
        }   
    }
}



// 兄弟组件想互相交流，交换对方的数据，那么唯一的解决方案就是：提升 state   ->  redux 使用 provider 提供一个全局的store
redux
1. 通过 createStore 方法创建的 store 是一个对象，它本身包含 4 个方法 :
    getState() : 获取 store 中当前的状态。
    subscribe(listener) : 注册一个监听者，它在 store 发生变化时被调用。
    dispatch(action) : 分发一个 action，并返回这个 action，这是唯一能改变 store 中数据的方式。
    replaceReducer(nextReducer) : 更新当前 store 里的 reducer，一般只会在开发模式中调用该方法。


2. redux 为什么返回一个新的 state
->  combineReducers  
const nextStateForKey = reducer(previousStateForKey, action)

// 新旧两个对象是否一致，进行的是浅比较法，所以，当我们 reducer 直接返回旧的 state 对象时，Redux 认为没有任何改变，从而导致页面没有更新。
hasChanged = hasChanged || nextStateForKey !== previousStateForKey
return hasChanged ? nextState : state ->  直接返回之前的state


3. react 类组件 this 存在的意义。React本身会随着时间的推移而改变，以便你可以在渲染方法以及生命周期方法中得到最新的实例。
每次 render this 都会变 -> 实列在重新生成


4. 所有的middlerare 解构之后有两个参数 ->  {getState,dispatch}

