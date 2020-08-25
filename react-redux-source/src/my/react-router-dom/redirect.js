import React from 'react'
import RouterCtx from './context'

export default class Redirect extends React.Component{
    static contextType = RouterCtx

    // Redirect to 重定向到哪里去， from 表示从哪里来的 & 没有匹配上 才重定向到 to
    componentDidMount(){
        let {to,from} = this.props
        let pathName = this.context.location.pathName

        // from 属性没有，直接跳 || from === pathName 直接跳
        if(!from || from === pathName){
            this.context.history.push(to)
        }
    }

    render(){
        return null
    }
}