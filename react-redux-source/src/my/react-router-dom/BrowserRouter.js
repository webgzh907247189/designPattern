import React from 'react'
import RouterCtx from './context'

(function(history){
    let oldpushState = history.pushState

    history.pushState = function(state, title, path){
        console.log('触发了pushState--自定义函数 onpushpstate')
        oldpushState.call(history, state, title, path)

        // 自定义的 onpushpstate 类似与功能 onpopstate 实现 pushState 也可以完成页面内容显示
        window.onpushstate && window.onpushstate(state, title, path)
    }
})(window.history)

export default class HashRouter extends React.Component{
    // 初始化定义一个 state ，下面的 Link 组件会用到
    state = {
        location: {pathName: '',state: null}
    }

    componentDidMount(){
        // onpopstate 原生事件
        // onpushstate 扩展事件
        window.onpopstate = window.onpushstate = (state, pathname) => {
            this.setState({
                location: {
                    ...this.state.location,
                    pathName,
                    state
                }
            })
        }
    }

    render(){
        let that = this
        let value = {
            location: this.state.location,
            history: {
                push(to){
                    if(that.block){
                        let allow = window.confirm(that.block(that.state.location))
                        if(!allow){
                            return
                        }
                    }

                    // to 可能是一个对象， 因为Link 的 to 可以是一个对象
                    if(typeof to == 'object'){
                        let {pathname, state } = to
                        that.locationState = state

                        window.location.pushState(state, null, pathname)
                    }else{
                        window.location.pushState('', null, to)
                    }
                },
                block(msg){
                    that.block = msg;
                }
            }
        }
        return <RouterCtx.Provider value={value}>
            {
                this.props.children
            }
        </RouterCtx.Provider>
    }
}