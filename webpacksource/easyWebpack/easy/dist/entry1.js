
        (function(modules){
            function require(moduleId){
                var module = {
                    i: moduleId,
                    exports: {},
                }
                modules[moduleId].call(module.exports, module, module.exports, require)
                return module.exports;
            }

            const test3 = require("./src/test.js");

console.log("test1" + test3); //log2//log1
            return require("./src/index.js")
        })({
            "./src/test.js": function(module, exports, require){ module.exports = 'test3'; //log2//log1 } 
        })
    