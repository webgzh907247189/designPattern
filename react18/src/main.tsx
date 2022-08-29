import React from "react";
import ReactDom from 'react-dom/client'
import SuspenseTest from './suspense'

// legacy 模式 渲染是同步的
// ReactDom.render(<App/>,  document.getElementById('app'))

// concurrent 模式
let container = ReactDom.createRoot(document.getElementById('app'))
container.render(<SuspenseTest />)