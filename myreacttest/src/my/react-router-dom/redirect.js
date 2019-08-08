import React from 'react'
import RouterCtx from './context'

export default class Redirect extends React.Component{
    static contextType = RouterCtx

    componentDidMount(){
        let {to,from} = this.props
        let pathName = this.context.location.pathName

        if(!from || from === pathName){
            this.context.history.push(to)
        }
    }

    render(){
        return null
    }
}