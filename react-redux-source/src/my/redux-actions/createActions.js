function createActions(actions){
    let newACtions = Object.create(null)
    let types = Object.keys(actions)

    for(let i=0; i<types.length; i++){
        let type = types[i]
        newACtions[type] = (...args) => {
            return {type, num: actions[type](...args)}
        }
    }
    return newACtions
}

export default createActions