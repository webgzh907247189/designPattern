import React from 'react';
import ReactDom from 'react-dom';
import HostCom from './hostCom';

const RemoteNewList = React.lazy(() => import('remoteg/NewList'))
function App(){
    return <div>
        <div>我是 host</div>
        <HostCom/>
        <React.Suspense fallback="loading list....">
            <div>远程加载 -> <RemoteNewList/></div>
        </React.Suspense>
    </div>
}
ReactDom.render(<App/>, document.getElementById('root'))