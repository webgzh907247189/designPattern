import React from 'react'
import RouterCtx from './context'
import pathToRegexp from 'path-to-regexp'

export default class Switch extends React.Component{
    static contextType = RouterCtx

    // 使用 Switch 包装 Route 之后，第一个匹配上，后面不在匹配，直接 return
    // 使用了 Switch， Route组件的 exact 为 false, 第一个匹配上，后续不在匹配，会出现不对应情况
    // 所以，应该设置 exact 为 true，绝对匹配
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
                // 这个地方不应该return Component， 因为 此时 Component 是Route组件的 compoennt 属性，这个时候 Route 组件需要的props没有
                // 直接渲染 children 就可以
                return children
            }
        }

        return null
    }
}