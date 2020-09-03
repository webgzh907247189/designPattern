/**
 * 一开始以 要求自己的方式要求别人，后来发现是个错误的想法
 * 技术这条路需要持续学习，持续深入，眼界也很重要
 * 深耕技术，从技术的角度解决问题
 * 
 * 阅读源码 for..in Object.keys() Object.getOwnPropertyNames() Reflect.ownKeys() 
 * Object.getPrototypeOf() Object.setPrototypeOf()   isPrototypeOf ???? querystring ??redux-saga??
 * React-redux,Vuex,Vue-router,koa,express(快速匹配),koa-router,koa-static,bodyParser
 * 简历的知识点温习
 */

// 判断传入的对象是否是纯对象，因为 redux 要求 action 和 state 是一个纯对象，所以这个函数诞生了。
// 正常情况下 proto === Object.prototype(因为Object.getPrototypeOf(Object.prototype) === null)，倒数第二个层级 null -> Object.prototype
{
    var  a = {}
    var b = {name: 1}
    var s = Object.setPrototypeOf(a,b)
    a.name// 1
    s === a
}
function isPlainObject(obj) {
    if (typeof obj !== 'object' || obj === null) return false
  
    let proto = obj
    // 获取最顶级的原型，如果就是自身，那么说明是纯对象。
    while (Object.getPrototypeOf(proto) !== null) {
      proto = Object.getPrototypeOf(proto)
    }
  
    return Object.getPrototypeOf(obj) === proto
}

redux
    -- index.js 导出所有的函数
    -- createStore.js 创造store，提供getStore(),subStore()[componentDidMount调用],unSubStore()[componentWillUnmount调用]
    -- compose.js  组合函数 处理中间件 
    -- applyMiddleware.js 运行中间件，调用createStore()，增强dispatch方法
    -- bindActionCreate    合并actions 可以不调用，直接 store.dispatch(action)
       (产生的原因是 简化store.dispatch，直接 let o = bindActionCreate() o.xx())
    -- combineReducers 合并reducers，返回一个函数，创造一个大的reducers[健值对] 合并reducers

    {
        // function combineReducers(reducerObj){
        //     return (state,action)=>{
        //         let obj = Object.create(null)
        //         for(let item in reducerObj){
        //             obj[item] = reducerObj[item](state[item],action)
        //         }
        //         return obj
        //     }
        // }
        function combineReducers(reducerObj){
            return (state,action)=>{
                let hasChanged = false 
                let obj = Object.create(null)
                let reduceKeys = Object.keys(reducerObj)
                for(let i=0;i< reduceKeys.length; i++){
                    let key = reduceKeys[i]
                    let oldState = state[key]
                    let prevState = reducerObj[key](oldState,action)
                    obj[key] = prevState

                    // 在循环里面，有一次 hasChanged 为true，后面的判断就不走了。减少执行。所以加了 hasChanged || prevReducerState !== nextReducerState
                    // hasChanged = prevReducerState !== nextReducerState
                    hasChanged = hasChanged || prevState !== oldState
                }
                return hasChanged ? obj : state
            }
        }

        function compose(...args){
            if(args.length === 0){
                return ()=>arguments
            }

            if(args.length === 1){
                return () => args[0](arguments)
            }

            if(args.length === 2){
                return args.reduce((a,b)=>{
                    return () => a(b(arguments))
                })
            }
        }

        function createStore(initStore,reduce){
            let store = initStore
            let list = []

             // 默认状态 -> 初始化调用
            function dispatch(action){
                state = reduce(state,action)

                for(item of list){
                    item()
                }

                return action
            }
            dispatch({type: '@@REDUX/INIT'})

            return {
                getState(){
                    return this.store
                },
                //每次 dispatch 被调用之后，都会遍历一遍 currentListeners
                dispatch,
                subStore(fn){
                    list.push(fn)
                    let isDelete = false
                    // 取消订阅 闭包
                    return ()=>{
                        if(!isDelete){
                            let idx = list.indexOf(fn)
                            list.splice(idx,1)
                            isDelete = true
                        }
                    }
                }
            }
        }

        // Object.prototype.toString.call(Promise)

        // ssr 使用 传递参数
        thunk.withExtraArgument = createThunkMiddleware;
        function createThunkMiddleware(extraArgument){
            return function({getState,dispatch}){
                // getState可以在logger中间件可以使用
                return (next)=>{
                    return (action)=>{
                        if(typeof action == 'function'){
                            action(dispatch,getState,extraArgument)
                        }else{
                            next(action)
                        }
                    }
                }
            }
        }
        let thunk = createThunkMiddleware()

        function promise({getState,dispatch}){
            // getState可以在logger中间件可以使用
            return (next)=>{
                return (action)=>{
                    if(typeof action.then == 'function'){
                        action.then(dispatch)
                    }else{
                        next(action)
                    }

                    // typeof fn.then === 'function'

                    // promise 中间件 有两种写法
                    if(isPromise(action) ){
                        action.then(dispatch)
                    }else if(isPromise(action.num)){
                        action.num.then(d=>{
                            dispatch({...action,num: d})
                        })
                    }else {
                        next(action) 
                    }
                }
            }
        }

        function logger({getState,dispatch}){
            // getState可以在logger中间件可以使用
            return (next)=>{
                return (action)=>{
                    console.log(`老状态${JSON.stringify(getState())}`)
                    next(action)
                    console.log(`新状态${JSON.stringify(getState())}`)
                }
            }
        }

        // [a,b,c] compose之后 a(b(c())) 最后面的先运行，形成栈结构(先进后出，与koa2一样)
        // compose(...middlerare)(store.dispatch) 的 store.dispatch 给了c函数(c函数的next就是store.dispatch)
        // 最终的 dispatch => a(b(c(store.dispatch())))，所以dispatch被增强
        // 中间件的顺序是有关联的
        // a的next 就是 b的返回结果， b的 next就是c，c的next就是store.dispatch
        // 最终先走a，遇到判断进入b，遇到判断进入c，形成洋葱模型
        function applyMiddleware(...middlerare){
            return function(createStore){
                return function(...args){
                    let store = createStore(args)

                    let dispatch
                    let middlerareObj = {
                        dispatch: () => dispatch(),
                        getState: store.getState()
                    }
                    middlerare.map((item)=>{
                        return item(middlerareObj)
                    })

                    dispatch = compose(...middlerare)(store.dispatch)
                    return {
                        dispatch,
                        ...store
                    }
                }
            }
        }

        function bindActionCreates(actions,dispatch){
            let actionObj = Object.create(null)

            // 可以传入对象，也可以是函数，简化页面的调用,否则页面调用是 store.dispatch({action: 'xx'})
            if(typeof actions === 'function'){
                return bindActionCreate(action,dispatch)
            }

            for(let item in actions){
                actionObj[item] = bindActionCreate(actions[item],dispatch)
            }
            return actionObj
        }
        function bindActionCreate(action,dispatch){
            return (...args)=>{
                return dispatch(action(...args))
            }
        }



        let actions = {
            add(num){
                return {type: '11',num}
            }
        }
       
        function reducer(state,action){
            switch(action.type){
                case 11:
                    state = {a: 11}
                    break
                default:
                    break
            }
        }
        let reducers = combineReducers({
            reducer
        })
        let actionObj = bindActionCreates(actions,store.dispatch)
        let storeObj = createStore({reducer: {name: '1'}},reducers)

        class Test extends React.component{
            constructor(){
                this.state = storeObj.getState().reduce.name
            }

            componentDidMount(){
                this.unSubStore = storeObj.SubStore(()=>{
                    this.setState({name: storeObj.getState().reduce.name})
                })
            }

            componentWillUnmount(){
                this.unSubStore()
            }

            click = () => {
                actionObj.add('11')
            }

            render(){
                return <>
                    <button onClick={this.click}></button>
                    {this.state.reduce.name}
                </>
            }
        }






        let ctx = React.createContext()
        class Provider extends React.component{
            render(){
                return <ctx.Provider value={{store: this.props.store}}>
                    {
                        this.props.children()
                    }
                </ctx.Provider>
                
            }
        }

        function connect(mapStateToProps,mapDispatchToProps){
            return (WarperComponent)=>{
                return class extends React.component{
                    static contextType = ctx
                    constructor(props,context){
                        this.state = mapStateToProps(context.store.getState())
                        // {
                        //     xx: (...args)=>{
                        //         dispatch(action(...args))
                        //     }
                        // }

                        if(typeof mapDispatchToProps === 'function'){
                            this.boundAction = mapDispatchToProps(context.store.dispatch,props)
                        }else{
                            this.boundAction = bindActionCreates(mapDispatchToProps,context.store.dispatch)
                        }
                    }

                    componentDidMount(){
                        this.unSubStore = this.context.store.SubStore(()=>{
                            this.setState(
                                mapStateToProps(this.context.store.getState())
                            )  
                        })
                    }

                    componentWillUnmount(){
                        this.unSubStore()
                    }

                    render(){
                        return <WarperComponent {...this.state} {...this.boundAction}/>
                    }
                }
            }
        }
    }