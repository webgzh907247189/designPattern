import React from 'react'
import {connect} from 'react-redux'
import style from '../app.css'

class SsrTest extends React.Component{

    handle = () =>{
        this.props.add()
    }

    handleMinus = () => {
        this.props.minus()
    }

    render(){
        return <div style={ {color: 'red'} }>
            <button onClick={this.handle}>增加</button>
            <button onClick={this.handleMinus}>异步减少</button>
            <div className={style.font}>{this.props.number}</div>
        </div>
    }
}

// export default connect((state)=>{
//     return state.counter
// },{
//     add(number = 1){
//         return {
//             type: 'add',
//             number
//         }
//     },
//     minus(number = 1){
//         return (dispatch)=>{
//             setTimeout(()=>{
//                 dispatch({
//                     type: 'minus',
//                     number
//                 })
//             },2000)
//         }
//     }
// })(SsrTest)

export default connect((state)=>{
    return state.counter
},(dispatch)=>{
    return {
        add(number = 1){
            dispatch({type: 'add',number})
        },
        minus(number = 1){
            setTimeout(()=>{
                dispatch({
                    type: 'minus',
                    number
                })
            },2000)
        }
    }
})(SsrTest)