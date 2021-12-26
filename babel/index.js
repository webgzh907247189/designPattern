// https://juejin.im/post/5d7efbbb6fb9a06b2650c74a
// https://blog.hhking.cn/2019/04/02/babel-v7-update/
// https://github.com/sorrycc/blog/issues/80
// https://mp.weixin.qq.com/s/B8XRsMg2uJrQTD5IFWOdlw



// 姜瑞涛的官方网站
// https://www.jiangruitao.com/babel/tool/



/**
 * 预设就是插件的集合 (多个插件组合出来的)
 * loose: false (默认)
 * 通过 object.defineProperty 赋值
 * 
 * loose: true 直接给属性赋值
 * 
 * 
 * 
 * 插件比预设先执行
 * 插件执行顺序是插件数组从前向后执行
 * 预设执行顺序是预设数组从后向前执行
 * 
 * 
 * 
 * https://juejin.cn/post/6992371845349507108
 * plugins 主要有三种类型：
 * babel-plugin-transform-xx：转换插件
 * babel-plugin-syntax-xx：语法插件
 * babel-plugin-proposal-xx：用来编译和转换在提案中的属性
 * 
 * 
 * preset-env 依赖 browserslist, compat-table, and electron-to-chromium 实现了特性的精细按需引入
 * @babel/compat-data 可以看下兼容性 (includes)
 * 
 * 
 * npx browserslist "> 0.25%, not dead"
 * 
 */

/**
 * 需要指定执行环境 Browserslist， Browserslist 的配置有几种方式，并按下面的优先级使用：
 * 1. @babel/preset-env 里的 targets
 * 2. package.json 里的 browserslist 字段
 * 3. .browserslistrc 配置文件
 * 
 * browserslist 是用来给不同的前端工具（Autoprefixer, babel-preset-env）共享 target browsers 和 Node.js versions 配置的.
 *  一般推荐将配置写在 package.json 里的 browserslist 字段。
 * 
 * babel 是优先读取.babelrc 文件中@babel/preset-env 的 targets 属性，未定义会读取 package.json 中的 browserslist。
 * 在终端中运行npx browserslist命令，查看您的查询选择了哪些浏览器
 * 
 * 
 * core-js 提供了两种补丁方式。
 * 1. core-js/library，通过 helper 方法的方式提供
 * 2. core-js/module，通过覆盖全局变量的方式提供
 */



/**
 * @babel/runtime, @babel/plugin-transform-runtime 把 helpers 和 polyfill 功能拆分了。默认只提供 helpers。
 *  @babel/runtime里面是 helper 函数 (但是没有抽离公共 helper 函数，需要使用 @babel/plugin-transform-runtime 抽离)
 * 
 * useBuiltIns: 'usage'  ->  (usage 会根据配置的浏览器兼容，以及你代码中用到的 API 来进行 polyfill，实现了按需添加)
 * 在每个文件引入一次这个 api 需要的polyfill(多个文件之间的重复的polyfill需要其他插件抽离 -> 辅助函数是直接内嵌) -> (重复的被抽离出去了，通过require 引入)
 * 需要 @babel/plugin-transform-runtime 解决
 * 
 * 
 * useBuiltIns: false
 * 此时不对 polyfill 做操作。如果引入 @babel/polyfill，则无视配置的浏览器兼容，引入所有的 polyfill。
 * 
 * 
 * useBuiltIns: 'entry'  (含义是找到入口文件里引入的 @babel/polyfill，并替换为 targets 浏览器/环境需要的补丁列表)
 * 配置的浏览器兼容，引入浏览器不兼容的 polyfill。需要在入口文件手动添加 import '@babel/polyfill'，会自动根据 browserslist 替换成浏览器不兼容的所有 polyfill。
 * 
 * 需要指定 core-js 的版本, 如果 "corejs": 3, 则 import '@babel/polyfill' 需要改成
 * import 'core-js/stable';
 * import 'regenerator-runtime/runtime';
 */

const babel = require('@babel/core');
const code = `[1, 2, 3, 4, [5, 6, [7, 8]]].flat(Infinity);`;


// 只编译语法，不编译 api
// 注意 使用 和 不使用 @babel/plugin-transform-runtime 结果差异很大
// 使用 helpers 是通过 require 引入的，这样就不会存在代码重复的问题了。 (重复的被抽离出去了，通过require 引入)
{
  const code = `() => {console.log('11')};class A{}`;
  const ast1 = babel.transform(code, {
    presets: [
      [
        '@babel/preset-env',
        {
          useBuiltIns: 'usage',
          corejs: 3
        }
      ]
    ],
    plugins: [
      ["@babel/plugin-transform-runtime"]
    ]
  });
  console.log(ast1.code)
  
  // "use strict";
  // (function () {
  //   console.log('11');
  // });
}



{
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

  // 用core-js@2 来看看转码后的结果
  console.log(ast1.code);

  // "use strict";
  // [1, 2, 3, 4, [5, 6, [7, 8]]].flat(Infinity);
}



/**
 * 当使用 corejs 3 || 2 & useBuiltIns: 'usage' 再次引入 'require("@babel/polyfill");' 会 warn
 * 
 * 当使用 corejs 3 & useBuiltIns: 'usage' 再次引入 "import 'core-js/stable';import 'regenerator-runtime/runtime';"  多引入 "require('core-js/stable');require('regenerator-runtime/runtime');" 
 * 当使用 corejs 2 & useBuiltIns: 'usage' 再次引入 "import 'core-js/stable';import 'regenerator-runtime/runtime';"  引入 "require('core-js/stable');require('regenerator-runtime/runtime');" 
 */
{
  const ast2 = babel.transform("import 'core-js/stable';import 'regenerator-runtime/runtime';" + code, {
    presets: [
      [
        '@babel/preset-env',
        {
          useBuiltIns: 'usage',
          corejs: 3
        }
      ]
    ]
  });
  // 用core-js@3 来看看转码后的结果
  console.log(ast2.code);

  // "use strict";
  // require("core-js/modules/es.array.flat");
  // require("core-js/modules/es.array.unscopables.flat");
  // [1, 2, 3, 4, [5, 6, [7, 8]]].flat(Infinity);
}



{
  const ast3 = babel.transform(code, {
    presets: [
      [
        '@babel/preset-env',
        {
          useBuiltIns: 'entry',
          corejs: 2
        }
      ]
    ]
  });
  console.log(ast3.code)
  // "use strict";
  // [1, 2, 3, 4, [5, 6, [7, 8]]].flat(Infinity);
}


/**
 * 当使用 corejs 2 & useBuiltIns: 'entry' 再次引入 'require("@babel/polyfill");' 会 加载很多 polyfill
 * 当使用 corejs 3 & useBuiltIns: 'entry' 再次引入 'require("@babel/polyfill");' 会 warn 
 */
{
  const ast3 = babel.transform('require("@babel/polyfill");' + code, {
    presets: [
      [
        '@babel/preset-env',
        {
          useBuiltIns: 'entry',
          corejs: 2
        }
      ]
    ]
  });
  console.log(ast3.code)
  // "use strict";
  //  加载很多 polyfill
  // [1, 2, 3, 4, [5, 6, [7, 8]]].flat(Infinity);
}





{
  const ast4 = babel.transform('require("@babel/polyfill");' + code, {
      presets: [
        [
          '@babel/preset-env',
          {
            targets: {
              ie: 9,
            },
            useBuiltIns: 'entry',
            corejs: 2
          }
        ]
      ]
  });
  console.log(ast4.code)
  // "use strict";
  // 加载很多 polyfill
  // [1, 2, 3, 4, [5, 6, [7, 8]]].flat(Infinity);
}


{
  const ast4 = babel.transform('import "core-js/stable";import "regenerator-runtime/runtime";' + code, {
      presets: [
        [
          '@babel/preset-env',
          {
            targets: {
              ie: 9,
            },
            useBuiltIns: 'entry',
            corejs: 3
          }
        ]
      ]
  });
  console.log(ast4.code)
  // "use strict";
  // 加载很多 polyfill
  // [1, 2, 3, 4, [5, 6, [7, 8]]].flat(Infinity);
}



{
  const arrays = [[10], 50, [100, [2000, 3000, [40000]]]];

  function getList(list){
      return list.reduce((result, item) => {
          const i = Array.isArray(item) ? getList(item) : item
          result = result.concat(i)
          return result
      }, [])
  }
  console.log(getList(arrays))
  // [ 10, 50, 100, 2000, 3000, 40000 ]
}


// https://juejin.cn/post/6917656850309578759
// https://juejin.cn/post/6900853307158298638
// https://juejin.cn/post/6901649054225465352
// https://zhuanlan.zhihu.com/p/147083132