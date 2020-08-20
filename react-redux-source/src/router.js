import {Route,HashRouter as Router} from 'react-router-dom'
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
function Component1(){
    return <>
        Component1
    </>
}

function Component2(){
    return <>
        Component2
    </>
}
const RouterApp = <Router>
    <Route path='/' component={Component1} exact></Route>
    <Route path='/test' component={Component2} ></Route>
</Router>

export default RouterApp