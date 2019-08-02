import React from 'react'
import RouterCtx from './context'

export default class Router extends React.Component{
    static contextType = RouterCtx

    render(){
        let {location} = this.context
        let {path,component: Component} = this.props
        if(location.pathName === path){
            return <Component/>
        }
        return null
    }
}