import React from 'react'
import RouterCtx from './context'
import pathToRegexp from 'path-to-regexp'

export default class Router extends React.Component{
    // 没有加 switch 的时候，第一个匹配上了，后续的 Route 继续匹配
    static contextType = RouterCtx

    render(){
        let {location} = this.context
        let {path='/',component: Component,exact=false,render} = this.props
        let pathName = location.pathName
        let paramNames = []
        // paramNames 拿到的是 正则匹配的数据

        let regexpResult = pathToRegexp(path,paramNames,{end: exact})
        // 不使用test的原因，后续需要这个返回值
        let result = location.pathName.match(regexpResult)

        let props = {
            location: this.context.location,
            history: this.context.history
        }
        if(result){
            let [url,...values] = result
            paramNames = paramNames.map(item => item.name)
            let params = values.reduce((result,item,index)=>{
                result[paramNames[index]] = item
                return result
            },Object.create(null))

            let match = {
                path,
                exact: url === pathName,
                params,
                url: pathName
            }
            props.match = match

            // 支持Route 的render props
            if(render){
                return render(props)
            }else if(Component){
                return <Component {...props}/>
            }
        }
        return null
    }
}