import React from 'react'

class PersistGate extends React.Component{
    componentDidMount(){
        this.props.persitor.init()
    }
    render(){
        this.props.children
    }
}
export {PersistGate}