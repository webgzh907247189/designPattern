function bindActionCreator(action,dispatch){
    return (...args)=>{
        dispatch(action(...args))
    }
}

function bindActionCreators(action,dispatch){
    if(typeof action == 'function'){
        return bindActionCreator(action,dispatch)
    }

    let actionObj = Object.create(null)
    for(let key in action){
        actionObj[key] = bindActionCreator(action[key],dispatch)
    }
    return actionObj
}

export default bindActionCreators