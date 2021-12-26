/**
 * 想做 api 的 polyfill，那就要引入 core-js
 * 
 * 如果 useBuiltIns 设置为 false，babel 不会自动引入 corejs，需要手动在入口模块引入
 * 
 * 如果 useBuiltIns 设置为 entry，会把入口模块的 corejs 展开为根据 targets 确定的需要 polyfill 的具体 api，与具体使用到哪些没有关系，只与 targets 有关。
 * 
 * 如果 useBuiltIns 设置为 usage，会在每个模块根据用到的 api ，和设置为 entry 的区别是，这个除了与 targets 的配置有关，还与是否用到了有关。
 */
{
    const babel = require('@babel/core');
    const code = `() => {console.log('11')};
        const list = ['1', '2', '3']
        const result = list.includes('1')
        
        
        Promise.resolve('111').then((data) => {
            console.log('data');
        })
    `;
    var entryConfig = "import 'core-js/stable';import 'regenerator-runtime/runtime';"
    const ast1 = babel.transform(entryConfig + code, {
      presets: [
        [
          '@babel/preset-env',
          {
            useBuiltIns: 'entry',
            corejs: 3,
            // targets:  {
            //     "chrome": "70",
            //     // "ie": "11"
            // }
          }
        ]
      ],
      plugins: [
        ["@babel/plugin-transform-runtime"]
      ]
    });
    console.log(ast1.code)

  }
  