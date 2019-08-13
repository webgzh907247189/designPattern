let ininState = {list: []}

let SET_HOME_LIST = 'set_home_list'

export default function(state = ininState,action){
    switch(action.type){
        case SET_HOME_LIST:
            return {list: action.payload}
        default:
            return state
    }
}