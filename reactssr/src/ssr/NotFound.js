import React from 'react'
export default class NotFound extends React.Component{
    componentWillMount(){
        if(this.props.staticContext){
            this.props.staticContext.notFound = true
        }
    }
    render(){
        return <div>
            不存在的路径
        </div>
    }
}