import React from 'react';
import { Route, Redirect } from 'react-router-dom'

// 受保护路由
// 渲染 Route 组件，看是不是满足条件
export default class Authorized extends React.Component{
    render(){
        const {component, path} = this.props

        return <>
            <Route path={path} render={(props) => {
                return localStorage.getItem('logined') ? 
                <Route path={path} component={component} /> :
                // 从哪里来，重定向到哪里去
                // 注意下面到 不能使用 this.props.location.pathname ，因为 Authorized 没有 location 属性
                // 使用 props.location.pathname -> 因为被 Route 组件渲染出来，所以存在

                // props.location.pathname 是真实路径，不能使用 path，因为 path 可能是 /xxx/:id (带参数到路径)
                <Redirect to={{ pathname: '/login', state: {from: props.location.pathname}}}/>
            }}/>
        </>
    }
}