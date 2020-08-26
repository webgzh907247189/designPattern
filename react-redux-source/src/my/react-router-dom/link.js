import React from 'react'
import RouterCtx from './context'
export default class Link extends React.Component{
    static contextType = RouterCtx

    render(){
        let {to} = this.props

        // return <a href={`#${to}`}>{this.props.children}</a>

        return <a {...this.props} href={`#${to}`} onClick={() => this.context.history.push(to) }>{this.props.children}</a>
    }
}
/**
 * 一个 a 标签，既有href又有onClick 
 * 浏览器发现下一个目标link和当前链接是一样的，不会在跳转 (上面的情况只会跳转一次)
 */