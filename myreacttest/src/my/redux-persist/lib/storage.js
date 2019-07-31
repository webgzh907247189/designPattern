let storage = {
    set(key,value){
        localStorage.setItem(key,value)
    },
    get(key){
        return localStorage.getItem(key)
    }
}

export default storage