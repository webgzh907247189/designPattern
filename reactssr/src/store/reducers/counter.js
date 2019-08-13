let ininState = {number: 0}

let ADD = 'add'
let MINUS = 'minus'

export default function(state = ininState,action){
    switch(action.type){
        case ADD:
            // state = {number: state.number + 1}
            return {number: state.number + 1}
        case MINUS:
            // state = {number: state.number - 1}
            return {number: state.number - 1}
        default:
            return state
    }
}