import React from 'react';

export default class UserList extends React.Component{

    // Route 组件提供了 match 对象
    render(){
        console.log(this.props, 'Route 渲染的 match 对象')

        let userName = {}
        let id = null;
        // Link 传递过来的state
        if(this.props.location.state){
            console.log('???')
            userName = this.props.location.state.userName
            id = this.props.location.state.id;
        }else{
            id = this.props.match.params.id
            userName = JSON.parse(localStorage.getItem('userList')).find(_ => _.id == id)?.userName;
        }
        return <>
            <span>用户ID{id}</span>
            <span>用户名{userName}</span>
        </>
    }
}