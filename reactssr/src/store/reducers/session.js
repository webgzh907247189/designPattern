let initState = {
    user: null,
    success: null,
    error: null
}

export default function(state=initState,action){
    switch(action.type){
        case 'login':
            return action.payload  // 整体覆盖
        case 'logout':
            return action.payload
        default: 
            return state
    }
}