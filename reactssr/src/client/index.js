
import React from 'react'
import ReactDom from 'react-dom'
import SsrTest from '../ssr/test'
import SsrTest1 from '../ssr/test1'
import routers from '../../server/router'
import Header from '../ssr/header'
import {BrowserRouter} from 'react-router-dom'
import {Provider} from 'react-redux'
import {getClientStore} from '../store'

let store = getClientStore()
// hydrate 表示把服务端未完成的事情完成，比如绑定事件
ReactDom.hydrate(
<Provider store={store}>
    <BrowserRouter>
        <Header/>
        {
            routers
        }
    </BrowserRouter>
</Provider>
,document.getElementById('root'))
