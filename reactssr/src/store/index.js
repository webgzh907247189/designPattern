import {createStore,applyMiddleware} from 'redux'
import thunk from 'redux-thunk'
import logger from 'redux-logger'
import reducers from './reducers'
import clientAxios from '../client/axios'
import createServerAxios from '../../server/axios'


// let store = applyMiddleware(thunk,logger)(createStore)(reducers)

// 服务端里面 仓库不能共享，每个请求都创建一个仓库否则数据会冲突
function getServerStore(req){
    return createStore(reducers,applyMiddleware(thunk.withExtraArgument(createServerAxios(req)),logger))
}

function getClientStore(){
    console.log(window.context,'window.context')
    let initState = window.context.state
    return createStore(reducers,initState,applyMiddleware(thunk.withExtraArgument(clientAxios),logger))
}

export {getServerStore,getClientStore}