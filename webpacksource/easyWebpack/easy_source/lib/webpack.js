const Compiler = require('./Compiler');
const NodeEnvironmentPlugin = require('./node/NodeEnvironmentPlugin');
const WebpackOptionsApply = require('./WebpackOptionsApply');

// hooks 执行顺序是
// entryOption -> beforeRun -> run -> beforeCompile -> compile -> make -> afterCompile -> done
function webpack(options, cb){
    let compiler = new Compiler(options.context)
    compiler.options = options

    new NodeEnvironmentPlugin().apply(compiler)

    if(options.plugins && Array.isArray(options.plugins)){
        for (const plugin of options.plugins) {
            plugin.apply(compiler)
        }
    }
    new WebpackOptionsApply().process(options, compiler)
    return compiler
}

module.exports = webpack