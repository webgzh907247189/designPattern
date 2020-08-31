import { CALL_HISTORY_METHOD } from "./action";

export default function(history){
    return ({getState,dispatch}) => {
        return (next) => {
            return (action) => {
                // if(action.type === CALL_HISTORY_METHOD){
                //     // 跳转还是靠 history 进行
                //     history[action.payload.method](payload.path)
                // }else{
                //     next(action)
                // }

                // 源码的写法
                if(action.type !== CALL_HISTORY_METHOD){
                    return next(action)
                }

                let {payload: {args, method} = {}} = action
                history[method](...args)
            }
        }
    }
}