import React from 'react'
import {connect} from 'react-redux'

class SsrTest extends React.Component{

    handle = () =>{
        this.props.add()
    }

    render(){
        return <div style={ {color: 'red'} }>
            <button onClick={this.handle}>增加</button>
            <div>{this.props.number}</div>
        </div>
    }
}

// export default connect((state)=>{
//     console.log(state)
//     return state.counter
// },{
//     add(number = 1){
//         return {
//             type: 'add',
//             number
//         }
//     }
// })(SsrTest)

export default connect((state)=>{
    return state.counter
},(dispatch)=>{
    return {
        add(number = 1){
            dispatch({type: 'add',number})
        }
    }
})(SsrTest)