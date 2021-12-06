import React from 'react';
import ReactDom from 'react-dom';
import List from './list';

const RemoteHostCom = React.lazy(() => import('hostgzh/HostCom'))
function App(){
    return <div>
        我是本地加载 -> <List/>
        <React.Suspense fallback="loading host....">
            <div>远程加载 -> <RemoteHostCom/></div>
        </React.Suspense>
    </div>
}
ReactDom.render(<App/>, document.getElementById('root'))