const Module = require("webpack/lib/Module");
const { RawSource } = require('webpack-sources');

class DllModule extends Module{
    constructor(context, dependencies, name, type){
        super('javascript', context)
        this.dependencies =dependencies
        this.name = name
        this.type = type
    }

    identifier(){
        return 'dll DllModule'
    }

    readableIdentifier(){
        return 'dll DllModule'
    }

    size(){
        return 11
    }

    source(){
        return new RawSource('module.exports = __webpack_require__;')
    }
    // 每个模块都有自己的实现 自己编译自己
    build(options, compilation, resolver, fs, callback){
        // 描述编译信息
        this.build = true
        this.buildMeta = {}
        this.buildInfo = {}

        return callback()
    }
}

module.exports = DllModule