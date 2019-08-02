import {Route,HashRouter as Router} from 'react-router-dom'

/**
 *  Router 路由容器
 *  Route  路由规则
 *  exact  精确匹配
 */

let App = <Router>
    <Route path='/' component={component1} exact></Route>
    <Route path='/test' component={component2} ></Route>
</Router>

export default App