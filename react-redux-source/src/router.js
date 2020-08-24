import React from 'react';
import {Route,HashRouter as Router, Link} from 'react-router-dom'
import User from './router/user';
import Home from './router/home';
import Profile from './router/profile';

// HashRouter 路由容器
// exact 精确匹配

/**
 *  Router 路由容器
 *  Route  路由规则
 *  exact  精确匹配
 *  switch 精确匹配，后面的不判断  类似 switch case
 *  redirect 重定向 to from 从哪里来的重定向， 不加from 直接重定向
 * 
 * 
 * history
 * history.pushState()     推入路由栈
 * history.replaceState()  替换路由栈
 * 
 */
export default class RouterApp extends React.Component {
    render(){
        return <Router>
        <Link to="/user">user</Link>
        <Link to="/profile">profile</Link>
        <Link to="/">home</Link>
        <Route path='/' component={Home} exact></Route>
        <Route path='/user' component={User} ></Route>
        <Route path='/profile' component={Profile} ></Route>
    </Router>
    }
}