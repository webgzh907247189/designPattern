import React from 'react'
import PropType from 'prop-types'
/**
 * 1. 要从属性对象中取到store
 * 2. 痛过上下文传递给下级组件
 */

// 这个provider 与 react的ctx的Provider 无关
export default class Provider extends React.Component{
    static childContextTypes = {
        store: PropType.shape({
            getState: PropType.func.isRequired,
            dispatch: PropType.func.isRequired,
            subscribe: PropType.func.isRequired
        })
    }

    getChildContext(){
        //返回一个对象，这个对象成为子上下文对象
        return {
            store: this.props.store
        }
    }

    render(){
        return this.props.children
    }
}