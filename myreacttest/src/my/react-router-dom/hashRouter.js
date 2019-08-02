import React from 'react'
import RouterCtx from './context'

export default class HashRouter extends React.Component{
    state = {
        location: {pathName: window.location.hash.slice(1)}
    }

    componentDidMount(){
        window.location.hash = window.location.hash || '/'
        window.addEventListener('hashChange',()=>{
            this.setState({
                location: {
                    ...this.state.location,
                    pathName: window.location.hash.slice(1)
                }
            })
        })
    }

    render(){
        let value = {
            location: this.state.location,
            history: {
                push(to){
                    window.location.hash = to
                }
            }
        }
        return <RouterCtx.Provider value={value}>
            {
                this.props.children
            }
        </RouterCtx.Provider>
    }
}