import React from 'react'
import RouterCtx from './context'

export default class HashRouter extends React.Component{
    state = {
        location: {pathName: window.location.hash.slice(1),state: null}
    }

    componentDidMount(){
        window.location.hash = window.location.hash || '/'
        window.addEventListener('hashChange',()=>{
            this.setState({
                location: {
                    ...this.state.location,
                    pathName: window.location.hash.slice(1),
                    locationState: this.locationState
                }
            })
        })
    }

    render(){
        let that = this
        let value = {
            location: this.state.location,
            history: {
                push(to){
                    if(typeof to == 'object'){
                        let {pathName} = to
                        that.locationState = state
                        window.location.hash = pathName
                    }
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