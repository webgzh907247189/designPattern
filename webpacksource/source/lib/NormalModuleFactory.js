const NormalModule = require('./NormalModule')
class NormalModuleFactory{
    constructor(){

    }
    create(data){
        return new NormalModule(data)
    }
}

module.exports = NormalModuleFactory;