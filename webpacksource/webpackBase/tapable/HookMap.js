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
        let newHook = this._factory(key)
        this._map.set(key, newHook)
        return newHook
    }

    tap(key, pluginName, cb){
        return this.for(key).tap(pluginName, cb)
    }

    tapAsync(key, pluginName, cb){
        return this.for(key).tapAsync(pluginName, cb)
    }

    tapPromise(key, pluginName, cb){
        return this.for(key).tapPromise(pluginName, cb)
    }
}

module.exports = HookMap