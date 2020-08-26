import React from 'react'
import RouterCtx from './context'

export default class Prompt extends React.Component{
    static contextType = RouterCtx

    componentWillUnMount(){
        this.context.history.block(null)
    }
    
    render(){
        let history = this.context.history
        let {when, message} = this.props
        if(when){
            history.block(message)
        }else{
            history.block(null)
        }
        return null
    }
}