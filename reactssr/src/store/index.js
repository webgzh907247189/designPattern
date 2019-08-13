import {createStore,applyMiddleware} from 'redux'
import thunk from 'redux-thunk'
import logger from 'redux-logger'
import reducers from './reducers'


// let store = applyMiddleware(thunk,logger)(createStore)(reducers)

// 服务端里面 仓库不能共享，每个请求都创建一个仓库否则数据会冲突
function getServerStore(){
    return createStore(reducers,applyMiddleware(thunk,logger))
}

function getClientStore(){
    return createStore(reducers,applyMiddleware(thunk,logger))
}

export {getServerStore,getClientStore}