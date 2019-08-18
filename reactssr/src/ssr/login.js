import React from 'react'
import {connect} from 'react-redux'

class Login extends React.Component{
    state = {
        username: ''
    }

    handleChange = (event) =>{
        this.setState({
            username: event.target.value
        })
    }

    handleSubmit = (event) =>{
        event.preventDefault()
        this.props.login({username: this.state.username})
    }

    render(){
        return <div style={ {color: 'red'} }>
            <form onSubmit={this.handleSubmit}>
                <label htmlFor="username"></label>
                <input id="username" type="text" value={this.state.username} onChange={this.handleChange}/>
                <button type="submit">登陆</button>
            </form>
        </div>
    }
}


let actions = {
    login(user){
        return (dispatch,getState,request)=>{
            return request.post(`/api/login`,user).then((result)=>{
                dispatch({
                    type: 'login',
                    payload: result.data.data
                })
            })
        }
    }
}
export default connect((state)=>{
    return state.session
},actions)(Login)