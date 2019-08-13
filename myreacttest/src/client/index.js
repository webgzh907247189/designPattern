
import React from 'react'
import ReactDom from 'react-dom'
import SsrTest from '../ssr/test'

// hydrate 表示把服务端未完成的事情完成，比如绑定事件
ReactDom.hydrate(<SsrTest/>,document.getElementById('root'))