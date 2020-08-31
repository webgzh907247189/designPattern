import React from 'react';
import { connect } from "react-redux";
import { push } from "connected-react-router";
class Home extends React.Component{
    render(){
        console.log(this.props)
        return <>
            home -> {this.props.reducer.number}
            <button onClick={this.props.add}>add</button>
            <button onClick={() => this.props.goto('/profile')}>goto</button>
        </>
    }
}


export default connect((state)=> {
    return state
},(dispatch) => {
    return {
        add(){
            dispatch({type: 'add'})
        },
        goto(path){
            // debugger
            console.log(push(path))
            return dispatch(push(path))
        }
    }
})(Home)