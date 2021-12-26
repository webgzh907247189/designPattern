import React from 'react'
import {Route,HashRouter as Router,Switch} from 'react-router-dom'

/**
 *  Router 路由容器
 *  Route  路由规则
 *  exact  精确匹配
 *  switch 精确匹配，后面的不判断  类似 switch case
 *  redirect 重定向 to from 从哪里来的重定向， 不加from 直接重定向
 */
function Component1(){
    return <h1>111</h1>
}

function Component2(){
    return <h1>222</h1>
}

// console.log(<Route path='/'  children={Component2} >123123123</Route>, '11')
const App = () => <Router>
    <Switch>
        <Route path='/test' component={Component1} exact></Route>
        <Route path='/'  children={Component2} >123123123</Route>
    </Switch>
</Router>

export default App