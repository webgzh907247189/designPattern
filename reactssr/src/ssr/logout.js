import React from 'react'
import {connect} from 'react-redux'

class Logout extends React.Component{

    handleClick = () =>{
        this.props.logout(()=>{
            this.props.history.push('/')
        })
    }

    render(){
        return <div style={ {color: 'red'} }>
            <button type="button" onClick={this.handleClick}>退出登录</button>
        </div>
    }
}


let actions = {
    logout(cb){
        return (dispatch,getState,request)=>{
            return request.get(`/api/logout`).then((result)=>{
                dispatch({
                    type: 'logout',
                    payload: result.data.data
                })
                cb()
            })
        }
    }
}
export default connect((state)=>{
    return state.session
},actions)(Logout)