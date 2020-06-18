function handleActions(actions,initState){
    return function(state=initState,action){
        let types = Object.keys(actions)

        // for(let i=0; i<types.length; i++){
        //     let type = types[i]
        //     if(action.type === type){
        //         return actions[type](state,action)
        //     }
        // }
        // return state

        let reducer = actions[action.type]
        console.log(action.type,'action.type',reducer,action)
        if(reducer){
            return reducer(state,action)
        }
        return state
    }
}

export default handleActions