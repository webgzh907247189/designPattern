/**
 * 操作状态的时候，把新的状态存贮起来
 * 可以从存储空间读取数据
 */
export default function(persistConfig,reducer){
    let inited = false // 是否已经初始化完成
    let key = `persist: ${persistConfig.key}`
    return function(state,action){
        switch(action.type){
            case 'PERSIST_INIT':
                inited = true
                let value = persistConfig.storage.get(key)
                state = value ? JSON.parse(value) : undefined
                return reducer(state,action)
            default:
                if(inited){
                    state = reducer(state,action)
                    persistConfig.storage.set(key,JSON.stringify(state))
                    return state
                }
                return reducer(state,action)
        }
    }
}