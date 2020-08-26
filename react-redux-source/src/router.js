import React from 'react';
import {Route,HashRouter as Router, Link, Redirect} from 'react-router-dom'
import User from './router/user';
import Home from './router/home';
import Profile from './router/profile';
import Authorized from './router/authorized';

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
 * 没有加 switch 的时候，第一个匹配上了，后续的 Route 继续匹配，见 Route 源码
 * 
 * Redirect to 重定向到哪里去， from 表示从哪里来的 & 没有匹配上 才重定向到 to
 */


 // 此处没有加 switch ，所以匹配了第一个/ ，继续向下匹配，知道匹配到重定向
export default class RouterApp extends React.Component {
    render(){
        return <Router>
        <Link to="/user">user</Link>
        &nbsp;&nbsp;
        <Link to="/profile">profile</Link>
        &nbsp;&nbsp;
        <Link to="/">home</Link>
        &nbsp;&nbsp;
        <Link to="/login">login</Link>
        &nbsp;&nbsp;
        <Route path='/' component={Home} exact></Route>
        <Route path='/user' component={User} ></Route>
        <Route path='/login' component={Login} ></Route>
        <Authorized path='/profile' component={Profile} />
        <Redirect from="/" to="/user"/>
    </Router>
    }
}

function Login(props){
    const onLogin = () => {
        const path = props.location?.state?.from
        
        // 因为是针对 /profile ，然后重定向过来的， 所以在 Authorized 组件 里面注入了state对象
        // 从哪里来跳到哪里去 (针对 被 Authorized 包裹的组件)
        if(path){
            props.history.push(path)
        }else{
            props.history.push('/')
        }
        localStorage.setItem('logined', true)
    }

    return <>
        <button onClick={onLogin}>登陆</button>
    </>
}