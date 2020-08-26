import React from 'react';
import { Link } from 'react-router-dom'
import UserAdd from './userAdd';
import UserList from './userList';
import UserDetail from './userDetail';

export default class User extends React.Component{
    render(){
        return <>
            <ul>
                <li><Link to="/user/add">添加用户</Link></li>
                <li><Link to="/user/list">添加列表</Link></li>
            </ul>
            {/* 二级路由 exact??? */}
            <div>
                <Route path="/user/add" component={UserAdd} />
                <Route path="/user/list" component={UserList} />
                <Route path="/user/:id" component={UserDetail} />
            </div>
        </>
    }
}