const Dependency = require('webpack/lib/Dependency')

class DllEntryDependency extends Dependency{
    constructor(dependencies, name){
        super()
        this.dependencies = dependencies
        this.name = name
    }

    get type(){
        return 'dll entry'
    }
}

module.exports = DllEntryDependency