// 类内部声明的方法，是不可枚举的，而通过原型链声明的方法是可以枚举的
// https://zhuanlan.zhihu.com/p/32831172
// https://juejin.cn/post/6844903640533041159


// babel其实是有一个loose模式的，直译的话叫做宽松模式。它是做什么用的呢？它会不严格遵循ES6的语义，而采取更符合我们平常编写代码时的习惯去编译代码
// 通过/*@__PURE__*/这样的注释声明此函数无副作用。


// https://github.com/rollup/rollup/wiki/pkg.module
// 是rollup的一个提案，在package.json中增加一个key：module，如下所示：
// {
//   "name": "my-package",
//   "main": "dist/my-package.umd.js",
//   "module": "dist/my-package.esm.js"
// }

// https://zhuanlan.zhihu.com/p/139359864
// babel corejs@3 是如何按需polyfill原型对象方法的

{
    const babel = require('@babel/core');
    const code = `class A{ name(){} }; [].includes('1')`;
    const ast1 = babel.transform(code, {
      presets: [
        [
          '@babel/preset-env',
          {
            useBuiltIns: 'usage',
            corejs: 3,
            // loose: true,
          }
        ]
      ],
      plugins: [
        // ["@babel/plugin-transform-runtime", { corejs: 3, helpers: true, proposals: true }],
        ["@babel/plugin-transform-runtime"],
      ]
    });
  
    // 用core-js@2 来看看转码后的结果
    console.log(ast1.code);

  
    // loose 为 false 的 情况 (默认是false)
    // "use strict";
    // var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
    // var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));
    // var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));
    // var A = /*#__PURE__*/function () {
    //     function A() {
    //         (0, _classCallCheck2["default"])(this, A);
    //     }
    //     (0, _createClass2["default"])(A, [{
    //         key: "name",
    //         value: function name() {}
    //     }]);
    //     return A;
    // }();


    // loose 为 true 的 情况
    // "use strict";
    // require("core-js/modules/es.function.name.js");
    // var A = /*#__PURE__*/function () {
    //     function A() {}
    //     var _proto = A.prototype;
    //     _proto.name = function name() {};
    //     return A;
    // }();
}