const babel = require('@babel/core');
let s = require('@babel/polyfill')

{
    const code = `var s = {};console.log(s?.a ?? '1');[[[1]]].flat(2)`;
    const ast1 = babel.transform(code, {
        presets: [
            [
                '@babel/preset-env',
                {
                    useBuiltIns: 'usage',
                    corejs: 2
                }
            ]
        ]
    });
    console.log(ast1.code)

    //corejs 的版本影响 生成的代码

    // corejs 3
    // "use strict";
    // require("core-js/modules/es.array.flat.js");
    // require("core-js/modules/es.array.unscopables.flat.js");
    // var _s$a;
    // var s = {};
    // console.log((_s$a = s === null || s === void 0 ? void 0 : s.a) !== null && _s$a !== void 0 ? _s$a : '1');
    // [[[1]]].flat(2);


    // corejs 2
    // "use strict";
    // var _s$a;
    // var s = {};
    // console.log((_s$a = s === null || s === void 0 ? void 0 : s.a) !== null && _s$a !== void 0 ? _s$a : '1');
    // [[[1]]].flat(2);
}