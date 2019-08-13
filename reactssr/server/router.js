import React from 'react'
import SsrTest from '../src/ssr/test'
import SsrTest1 from '../src/ssr/test1'
import {Route} from 'react-router-dom'


// let routers = <React.Fragment>
//     <Route path="/" exact component={SsrTest}></Route>
//     <Route path="/test1" component={SsrTest1}></Route>
// </React.Fragment>
// export default routers

export default [
    {
        path: '/',
        component: SsrTest,
        exact: true,
        key: '/'
    },
    {
        path: '/test1',
        component: SsrTest1,
        key: '/test1',
        loadData: SsrTest1.loadData //存在此配置项，则需要加载数据
    }
]