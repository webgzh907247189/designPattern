import {Route,HashRouter as Router} from 'react-router-dom'

/**
 *  Router 路由容器
 *  Route  路由规则
 *  exact  精确匹配
 *  switch 精确匹配，后面的不判断  类似 switch case
 *  redirect 重定向 to from 从哪里来的重定向， 不加from 直接重定向
 */

let App = <Router>
    <Route path='/' component={component1} exact></Route>
    <Route path='/test' component={component2} ></Route>
</Router>

export default App