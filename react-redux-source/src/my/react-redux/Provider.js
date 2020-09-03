import React from 'react'
import ReactReduxContext from './context'
import Subscription from "./util/util";

/**
 * 1. 要从属性对象中取到store
 * 2. 痛过上下文传递给下级组件
 */

// 这个provider 与 react的ctx的Provider 无关
export default class Provider extends React.Component{
    render(){
        const store = this.props.store
        let subscription = new Subscription(store)

        return <ReactReduxContext.Provider value={{store: this.props.store, subscription}}>
            {
                this.props.children
            }
        </ReactReduxContext.Provider>
    }
}