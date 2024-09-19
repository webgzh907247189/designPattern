export default function bindActionCreators(action,dispatch) {
    if(typeof action == 'function'){
        return bindActionCreator(action,dispatch)
    }

    const newActionObj = Object.create(null)

    for (const key in action) {
        newActionObj[key] = bindActionCreator(action[key],dispatch)
    }

    return newActionObj
}


function bindActionCreator(action,dispatch){
    return (...args)=>{
        dispatch(action(...args))
    }
}