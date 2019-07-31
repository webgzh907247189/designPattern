function compose(...fns){
    if(fns.length == 0){
        return args => args
    }

    if(fns.length == 1){
        return (args) => fns[0](args)
    }

    return fns.reduce((a,b)=>{
        return (...args) => a(b(...args))
    })
}

export default compose