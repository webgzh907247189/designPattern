import {SET_USER_INFO} from './types'

let initState= {
    currentUser: null
}
export function reducer (state = initState, action) {
    switch (action.type) {
        case SET_USER_INFO:
            return {
                ...state,
                currentUser: action.payload
            }
        default:
            return state
    }
}