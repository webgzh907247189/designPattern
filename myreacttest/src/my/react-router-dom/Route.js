import React from 'react'
import RouterCtx from './context'
import pathToRegexp from 'path-to-regexp'

export default class Router extends React.Component{
    static contextType = RouterCtx

    render(){
        let {location} = this.context
        let {path='/',component: Component,exact=false} = this.props
        let regexpResult = pathToRegexp(path,[],{end: exact})
        let result = location.pathName.match(regexpResult)

        if(result){
            return <Component/>
        }
        return null
    }
}