// const dayjs = require('dayjs');
// const customParseFormat = require('dayjs/plugin/customParseFormat');

// dayjs.extend(customParseFormat)


// const str = '2021/01/01T16:00:00+0000'

// console.log(dayjs(str.split('+')[0]).format('YYYY-MM-DD hh:mm:ss'))
// console.log(dayjs('2021-01-01T16:00:00+0000').format('YYYY-MM-DD hh:mm:ss'))
// console.log(dayjs('2021/01/01T16:00:00+0000', 'YYYY-MM-DDTHH:mm:ss.000ZZ').format('YYYY-MM-DD hh:mm:ss'))


// https://zhuanlan.zhihu.com/p/139359864
// babel corejs@3 是如何按需polyfill原型对象方法的

{
    const babel = require('@babel/core');
    const code = `class C {#brand;};`; // class Person{}; // class C {#brand;}
    // transformXxx 的 api，已经被标记为过时了，后续会删掉，不建议用，直接用 transformXxxSync 和 transformXxxAsync。
    const ast1 = babel.transformSync(code, {
      presets: [
        [
          '@babel/env', // '@babel/preset-env',
          {
            useBuiltIns: 'usage',
            corejs: 3,
            // 切换是否开启对处于提案中的且浏览器已经实现的内置对象/特性的支持。若是你的目标环境已经有了对某提案特性的原生支持，
            // 将开启与其相匹配的解析器语法插件，而不是执行任何的转换。
            // 注意，这不会开启与@babel/preset-stage-3相同的转换，因为这些提案在正式落地到浏览器之前还会继续改变。
            shippedProposals: true, // https://babeljs.io/docs/en/babel-preset-env#shippedproposals
          }
        ]
      ],
      plugins: [
        // helpers(默认true) 移除不共用的helps 函数，采用公用的 helps 函数
        // regenerator(默认true) 开启 gen 函数 转换为 regenertor runtime 函数避免污染全局作用域
        // ["@babel/plugin-transform-runtime", { corejs: 3, helpers: true, proposals: true }],
        ["@babel/plugin-transform-runtime"],
      ]
    });
  
    // 用core-js@2 来看看转码后的结果
    console.log(ast1.code);
  
    // "use strict";
    // [1, 2, 3, 4, [5, 6, [7, 8]]].flat(Infinity);
}


// no
// "use strict";
// function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
// var Person = function Person() {
//   _classCallCheck(this, Person);
// };


// 2
// "use strict";
// var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
// var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));
// var Person = function Person() {
//   (0, _classCallCheck2["default"])(this, Person);
// };

// 3
// "use strict";
// var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
// var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));
// var Person = function Person() {
//   (0, _classCallCheck2["default"])(this, Person);
// };


// all
// "use strict";
// var _interopRequireDefault = require("@babel/runtime-corejs3/helpers/interopRequireDefault");
// var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime-corejs3/helpers/classCallCheck"));
// var Person = function Person() {
//   (0, _classCallCheck2["default"])(this, Person);
// };










// 使用  useBuiltIns: 'usage', corejs: 3, 但是不使用 @babel/plugin-transform-runtime
// "use strict";
// require("core-js/modules/es.array.includes.js");
// [1, 2, 3].includes(3);

// 使用  useBuiltIns: 'usage', corejs: 3, 同时也使用 @babel/plugin-transform-runtime
// "use strict";
// require("core-js/modules/es.array.includes.js");
// [1, 2, 3].includes(3);




// 使用  useBuiltIns: 'usage', corejs: 3, 同时也使用 ["@babel/plugin-transform-runtime", { corejs: 3, helpers: true, proposals: true }],
// "use strict";
// var _interopRequireDefault = require("@babel/runtime-corejs3/helpers/interopRequireDefault");
// var _includes = _interopRequireDefault(require("@babel/runtime-corejs3/core-js-stable/instance/includes"));
// var _context;
// (0, _includes["default"])(_context = [1, 2, 3]).call(_context, 3);