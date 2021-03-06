import React from 'react'
import RouterCtx from './context'

export default class HashRouter extends React.Component{
    // 初始化定义一个 state ，下面的 Link 组件会用到
    state = {
        location: {pathName: window.location.hash.slice(1),state: null}
    }

    componentDidMount(){

        // hashChange 改变状态，router(HashRouter)组件重新渲染，致使子组件重新渲染
        window.addEventListener('hashChange',()=>{
            this.setState({
                location: {
                    ...this.state.location,
                    pathName: window.location.hash.slice(1),
                    state: this.locationState
                }
            })
        })

        window.location.hash = window.location.hash || '/'
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

                        // 此处改变 hash ，触发 hashCHange， 重新setState
                        window.location.hash = pathname
                    }else{
                        window.location.hash = to
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