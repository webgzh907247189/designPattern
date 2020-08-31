import { LOCATION_CHANGE } from "./action";

// 是一个reducer
export default function(history){
    let initState = {action: history.action, location: history.location}
    return (state = initState,action) => {
        if(action.type === LOCATION_CHANGE){
            return action.payload
        }

        return state
    }
}