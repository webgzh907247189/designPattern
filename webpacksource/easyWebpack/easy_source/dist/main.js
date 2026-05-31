(function(modules){
    function __webpack_require__(moduleId){
            var module = {
            i: moduleId,
            exports: {},
        }
        modules[moduleId].call(module.exports, module, module.exports, __webpack_require__)
        return module.exports;
    }

    return __webpack_require__("./src1/index.js")

})({
    
    "./src1/index.js": function(module, exports, __webpack_require__){
        const title = __webpack_require__("./src1/title.js");
console.log(title);
    },
    
    "./src1/title.js": function(module, exports, __webpack_require__){
        module.exports = 'title';
    },
    
})

// #src/asdsad.js.map
