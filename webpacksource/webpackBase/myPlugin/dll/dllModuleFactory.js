const { Tapable } = require('tapable')
const DllModule = require('./dllModule')

class DllModuleFactory extends Tapable{
    constructor(){
        super()
        this.hook = {}
    }

    create(data, callback){
        const dependency = data.dependencies[0]

        callback(null, new DllModule(
            data.context, // 根目录
            dependency.dependencies, // 它的依赖数据 [isarray, is-promise]
            dependency.name, // utils
            dependency.type // 'dll entry'
        ))
    }
}

module.exports = DllModuleFactory