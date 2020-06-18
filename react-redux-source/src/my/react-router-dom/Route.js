import React from 'react'
import RouterCtx from './context'
import pathToRegexp from 'path-to-regexp'

export default class Router extends React.Component{
    static contextType = RouterCtx

    render(){
        let {location} = this.context
        let {path='/',component: Component,exact=false,render} = this.props
        let pathName = location.pathName
        let paramNames = []
        let regexpResult = pathToRegexp(path,paramNames,{end: exact})
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