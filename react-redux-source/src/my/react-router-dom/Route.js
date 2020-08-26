import React from 'react'
import RouterCtx from './context'
import pathToRegexp from 'path-to-regexp'

export default class Router extends React.Component{
    // 没有加 switch 的时候，第一个匹配上了，后续的 Route 继续匹配
    static contextType = RouterCtx

    render(){
        let {location} = this.context
        let {path='/',component: Component,exact=false,render ,children} = this.props
        let pathName = location.pathName
        let paramNames = []
        // paramNames 拿到的是 正则匹配的数据

        let regexpResult = pathToRegexp(path,paramNames,{end: exact})
        // 不使用test的原因，后续需要这个返回值
        let result = location.pathName.match(regexpResult)

        // 从上下文获取 history 传递给 被 Route 渲染出来的组件。这个时候被渲染的组件就具有 history 属性了
        let props = {
            location: this.context.location,
            history: this.context.history
        }

        if(result){
            let [url,...values] = result
            paramNames = paramNames.map(item => item.name) // paramNames -> ['id']  params -> ['asdasd']
            let params = values.reduce((result,item,index)=>{ 
                result[paramNames[index]] = item
                return result
            },Object.create(null))


            // Route 传递的 match 对象
            let match = {
                path, // Route 写的path
                exact: url === pathName,
                params,
                url: pathName // 真正的url
            }
            props.match = match

            // 支持Route 的render props
            if(render){
                return render(props)
            }else if(Component){
                return <Component {...props}/>

            // 渲染 children props
            }else if(children){
                return children(props)
            }
        }else if(children){
            return children(props)
        }else{
            return null
        }
    }
}