const fs = require('fs');

class NodeEnvirenmentPlugin {
    constructor(options){
        this.options = options || {};
    }

    apply(compiler){
        compiler.inputFileSystem = fs;
        compiler.outFileSystem = fs;
    }
}

exports = module.exports = NodeEnvirenmentPlugin