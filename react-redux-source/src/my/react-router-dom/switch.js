import React from 'react'
import RouterCtx from './context'
import pathToRegexp from 'path-to-regexp'

export default class Switch extends React.Component{
    static contextType = RouterCtx

    render(){
        let childrens = Array.isArray(this.props.children) ? this.props.children : [this.props.children]
        let pathName = this.context.location.pathName

        for(let i=0; i<childrens.length; i++){
            let children = childrens[i]
            let {path='/',component: Component,exact=false} = children.props
            let regexpResult = pathToRegexp(path,[],{end: exact})
            let result = pathName.match(regexpResult)

            // 返回 Route
            if(result){
                return children
            }
        }

        return null
    }
}