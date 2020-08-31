import { CALL_HISTORY_METHOD } from "./action";
// 派发此动作，需要调用histroy的方法，跳转
export default function push(...args){
    return {
        type: CALL_HISTORY_METHOD,
        payload: {
            method: 'PUSH',
            args
        }
    }
}