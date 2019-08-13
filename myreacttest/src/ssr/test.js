import React from 'react'

class SsrTest extends React.Component{
    state = {
        count: 1
    }

    handle = () =>{
        this.setState({
            count: ++this.state.count
        })
    }

    render(){
        return <div style={ {color: 'red'} }>
            <button onClick={this.handle}>增加</button>
            <div>{this.state.count}</div>
        </div>
    }
}

export default SsrTest