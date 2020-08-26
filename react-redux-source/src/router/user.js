import React from 'react';
import { Link, Route } from 'react-router-dom'
import UserAdd from './userAdd';
import UserList from './userList';
import UserDetail from './userDetail';

export default class User extends React.Component{
    render(){
        return <>
            <ul>
                <li><Link to="/user/add">添加用户</Link></li>
                <li><Link to="/user/list">列表展示数据</Link></li>
            </ul>
            {/* 二级路由 exact??? */}
            <div>
                <Route exact path="/user/add" component={UserAdd} />
                <Route exact path="/user/list" component={UserList} />
                <Route exact path="/user/detail/:id" component={UserDetail} />
            </div>
        </>
    }
}