import React from 'react'
import SsrTest from '../src/ssr/test'
import SsrTest1 from '../src/ssr/test1'
import Login from '../src/ssr/login'
import Logout from '../src/ssr/logout'
import Profile from '../src/ssr/profile'
import NotFound from '../src/ssr/NotFound'
import {Route} from 'react-router-dom'
import App from '../src/app'


// let routers = <React.Fragment>
//     <Route path="/" exact component={SsrTest}></Route>
//     <Route path="/test1" component={SsrTest1}></Route>
// </React.Fragment>
// export default routers

// export default [
//     {
//         path: '/',
//         component: SsrTest,
//         exact: true,
//         key: '/'
//     },
//     {
//         path: '/test1',
//         component: SsrTest1,
//         key: '/test1',
//         loadData: SsrTest1.loadData //存在此配置项，则需要加载数据
//     }
// ]


export default [
    {
        path: '/',
        component: App,
        key: 'app',
        loadData: App.loadData,
        components: [
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
            },
            {
                path: '/login',
                component: Login,
                key: '/login'
            },
            {
                path: '/logout',
                component: Logout,
                key: '/logout'
            },
            {
                path: '/profile',
                component: Profile,
                key: '/profile'
            },
            {
                component: NotFound,
                key: '/NotFound'
            }
        ]
    }
]