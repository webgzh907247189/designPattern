
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

console.log("test2" + test3); //log2//log1
            return require("./src/index.js")
        })({
            // key 是 模块的 ID，此模块相对根目录的路径
            // val 是一个函数 
            "./src/test.js": function(module, exports, require){ module.exports = 'test3';  } 
        })
    