class HookMap{
    constructor(factory){
        this._map = new Map
        this._factory = factory
    }

    get(key){
        return this._map.get(key)
    }

    for(key){
        const hook = this.get(key)
        if(hook) return hook
        let newHook = this._factory()
        this._map.set(key, newHook)
        return newHook
    }
}

module.exports = HookMap