import React from 'react'

class SsrTest1 extends React.Component{

    render(){
        console.log(this.props.staticContext,'ssr data')
        return <div>
           home
        </div>
    }
}

export default SsrTest1