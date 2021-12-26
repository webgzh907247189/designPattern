/**
 * useBuiltIns: 'usage'  ->  (usage 会根据配置的浏览器兼容，以及你代码中用到的 API 来进行 polyfill，实现了按需添加)
 * 在每个文件引入一次这个 api 需要的polyfill(多个文件之间的重复的polyfill需要其他插件抽离 -> 辅助函数是直接内嵌) -> (重复的被抽离出去了，通过require 引入)
 * 需要 @babel/plugin-transform-runtime 解决
 * 
 * 编译结果是  require("@babel/runtime/helpers/xx)
 * @babel/runtime, @babel/plugin-transform-runtime 把 helpers 和 polyfill 功能拆分了。默认只提供 helpers。
 * @babel/runtime里面是 helper 函数 (但是没有抽离公共 helper 函数，需要使用 @babel/plugin-transform-runtime 抽离)
 * 
 *
 * 双端包问题(@babel/runtime)
 * vue 也是存在双端包
 * cjs的代码，目前webpack4 还没有办法做 tree shaking， 大家引入包的时候还是要稍微看一下源码
 * 
 * 
 * 插件比预设先执行
 * 插件执行顺序是插件数组从前向后执行
 * 预设执行顺序是预设数组从后向前执行
 * 位置配置错了，有时候会出问题 ，针对 class的 装饰器之类的
 * 
 * core-js 提供了两种补丁方式。(一般都是通过helper来解决，不然会污染全局)
 * 1. core-js/library，通过 helper 方法的方式提供
 * 2. core-js/module，通过覆盖全局变量的方式提供
 * 
 * 
 * 
 * useBuiltIns: false
 * 此时不对 polyfill 做操作。如果引入 @babel/polyfill，则无视配置的浏览器兼容，引入所有的 polyfill。
 * 
 * 
 * useBuiltIns: 'entry'  (含义是找到入口文件里引入的 @babel/polyfill，并替换为 targets 浏览器/环境需要的补丁列表)
 * 配置的浏览器兼容，引入浏览器不兼容的 polyfill。需要在入口文件手动添加 import '@babel/polyfill'，会自动根据 browserslist 替换成浏览器不兼容的所有 polyfill。
 * 
 * 
 * 
 * 需要指定 core-js 的版本, 如果 "corejs": 3, 则 import '@babel/polyfill' 需要改成
 * import 'core-js/stable';
 * import 'regenerator-runtime/runtime';
 */


// {
//     const babel = require('@babel/core');
//     const code = `[1, 2, 3, 4, [5, 6, [7, 8]]].flat(Infinity);`;
 
//     const ast1 = babel.transform(code, {
//       presets: [
//         [
//           '@babel/preset-env',
//           {
//             useBuiltIns: 'usage',
//             corejs: 2
//           }
//         ]
//       ]
//     });
  
//     // 用core-js@2 来看看转码后的结果
//     console.log(ast1.code);
  
//     // "use strict";
//     // [1, 2, 3, 4, [5, 6, [7, 8]]].flat(Infinity);
// }
 

// {
//     // 注意 使用 和 不使用 @babel/plugin-transform-runtime 结果差异很大
//     // 使用 helpers 是通过 require 引入的，这样就不会存在代码重复的问题了。 (重复的被抽离出去了，通过require 引入)
//     const babel = require('@babel/core');
//     const code = `[1, 2, 3, 4, [5, 6, [7, 8]]].flat(Infinity);`;
 
//     const ast1 = babel.transform(code, {
//       presets: [
//         [
//           '@babel/preset-env',
//           {
//             useBuiltIns: 'usage',
//             corejs: 2
//           }
//         ]
//       ],
//       plugins: [
//         // ["@babel/plugin-transform-runtime"]
//       ]
//     });
  
//     // 用core-js@2 来看看转码后的结果
//     console.log(ast1.code);
  
//     // "use strict";
//     // var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
//     // var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));
//     // [1, 2, 3, 4, [5, 6, [7, 8]]].flat(Infinity);
//     // var A = function A() {
//     //   (0, _classCallCheck2["default"])(this, A);
//     // };
// }



{

    const babel = require('@babel/core');
    const code = `new Promise()`;
 
    const ast1 = babel.transform(code, {
      presets: [
        [
          '@babel/preset-env',
          // {
          //   useBuiltIns: 'usage',
          //   corejs: 3
          // }
        ]
      ]
    });
  
    // 用core-js@3 来看看转码后的结果
    console.log(ast1.code);
  
    // "use strict";
    // require("core-js/modules/es.array.flat.js");
    // [1, 2, 3, 4, [5, 6, [7, 8]]].flat(Infinity);
}









// {
//     // 使用 useBuiltIns： false  全量加载
//     const babel = require('@babel/core');
//     const code = `require("@babel/polyfill");[1, 2, 3, 4, [5, 6, [7, 8]]].flat(Infinity);`;
//     const ast4 = babel.transform(code, {
//         presets: [
//           [
//             '@babel/preset-env',
//             {
//               useBuiltIns: false,
//             }
//           ]
//         ]
//     });
//     console.log(ast4.code)
//     // "use strict";
//     // require("@babel/polyfill");
//     // [1, 2, 3, 4, [5, 6, [7, 8]]].flat(Infinity);
// }







// {
//     const babel = require('@babel/core');
//     const code = `require("@babel/polyfill");[1, 2, 3, 4, [5, 6, [7, 8]]].flat(Infinity)`;
 
//     const ast1 = babel.transform(code, {
//       presets: [
//         [
//           '@babel/preset-env',
//           {
//             useBuiltIns: 'entry',
//             corejs: 2
//           }
//         ]
//       ]
//     });
  
//     // 用core-js@2 来看看转码后的结果
//     console.log(ast1.code);
  
//     // "use strict";
//     // 加载很多polyfill
//     // [1, 2, 3, 4, [5, 6, [7, 8]]].flat(Infinity);
// }

// {
//     const babel = require('@babel/core');
//     // 这样的 code 报 警告
//     // const code = `require("@babel/polyfill");[1, 2, 3, 4, [5, 6, [7, 8]]].flat(Infinity);`;
//     const code1 = `import "core-js/stable";import "regenerator-runtime/runtime";[1, 2, 3, 4, [5, 6, [7, 8]]].flat(Infinity);`;
//     const ast4 = babel.transform(code1, {
//         presets: [
//           [
//             '@babel/preset-env',
//             {
//                 useBuiltIns: 'entry',
//                 corejs: 3
//             }
//           ]
//         ]
//     });
//     console.log(ast4.code)
//     // "use strict";
//     // 加载很多 polyfill
//     // [1, 2, 3, 4, [5, 6, [7, 8]]].flat(Infinity);
// }
