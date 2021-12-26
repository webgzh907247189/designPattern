/**
 * 我们目前写的都是被编译之后的，反编译了几个大厂的小程序也是编译之后，滴滴，美团，饿了么，京东 
 * 
 * 首先思考几个小 问题:
 * 
 * 1. 为什么需要  polyfill ？ 我们现在都有 babel编译了，怎么还要 polyfill？ (分析加载之后的 js的使用率)
 * 因为我们用户多样化，用户那边什么浏览器都有，我们要保证我们写的代码在他们那边可以正常运行。
 * babel 只编译语法，不编译 api。 (只管给你介绍女朋友，不管你们是不是结婚了) 看 polyfill demo1
 * 
 * 
 * 2. 以前的 polyfill 有什么问题 ？
 * 太大了，体积有60kb，太冗余了，所有的polyfill 全量下发给用户，用户不需要这么多。看 polyfill demo2
 * 
 * 3. babel polyfill 如何配置 ？ 看 polyfill demo3
 * 使用 flat 这个 api 进行 测试  es10
 * https://github.com/zloirock/core-js/blob/master/packages/core-js/modules/es.array.flat.js
 * 
 * 
 * 4. 如何更精准投放 polyfill ？
 * 使用 polyfill.io ，精准投放，针对ua进行投放， 可以使用 async 加载，按需加载 ，看 polyfill demo5
 * 缺点，要使用第三方 cdn 服务，或者自己部署服务,小程序这些项目没有办法使用
 * 
 * 
 * 
 * 5. 项目中使用最新的语法， 以前需要添加 babel plugins 来添加支持，现在都已经集成到 @babel/preset-env 里面去了 polyfill demo6
 * 但是 使用最新的语法之前，一定要确认一下 你们的 @babel/preset-env  有没有集成最新的 plugin 进去 (锁版本的重要性)
 * 
 * @babel/plugin-proposal-optional-chaining
 * https://www.npmjs.com/package/@babel/preset-env/v/7.6.3  没有
 * 
 * https://www.npmjs.com/package/@babel/preset-env 有
 * 
 * 
 * 涉及 npm ci 和 npm i (有时安装之后发现我的lock有 change)
 * 
 * npm i
 * npm i 将安装所有 package.json 中的依赖。
 * 如果使用 ^ 或 ~ 标识依赖的版本，npm i 将精准安装所标识的版本。
 * npm i 会更新 package-lock.json 文件。
 * 
 * npm ci
 * npm ci 将删除 node_modules 文件夹以确保干净的环境。
 * npm ci 会依照 package-lock.json 里的依赖版本精准安装。
 * npm ci 强依赖于 package-lock.json，如果 package-lock.json 不存在，npm ci 将不会工作。
 * 
 * 在 CI/CD 场景中使用 npm ci 更为合适，一方面，由于 npm ci 依赖于 package-lock.json，依赖版本确保一致，
 * 不会出现线上版本和开发版本不一致而引发的问题；另一方面，首次安装时，使用 npm ci 将比 npm i 更加迅速，
 * 原因是由于 package-lock.json 的存在，不需要做依赖的版本检查以及梳理各依赖之间的关系。
 * 
 * 有的时候大家需要指定 部分包的 npm 源头， 可以在根目录建一个 .npmrc文件, 可以指定包拉取 指定的源，这种一般公司私有源很有用
 * registry=https://npm.shmiao.net/
 * @inno:registry=https://npm.shmiao.net/
 * 
 * 
 * 版本号：
 * ^  ^1.1.2 ，表示>=1.1.2 <2.0.0，可以是1.1.2，1.1.3，…，1.1.n，1.2.n，…，1.n.n
 * ~  ～2.3.1，只更新最小版本，相当于2.3.X，即>=2.3.1 <2.4.0
 */




{
    // polyfill demo1
    const babel = require('@babel/core');
    const code = `const fn = () => {}; const map = new Map()`
    const ast1 = babel.transform(code, {
            presets: [
                [
                    '@babel/preset-env'
                ]
            ],
        });
    console.log(ast1.code)

    // "use strict";
    // var fn = function fn() {};
    // var map = new Map();
}
 
 
 

{
    // polyfill demo6
    const babel = require('@babel/core');
    const code = `const obj = {}; const s = obj?.name ?? '11'`
    const ast1 = babel.transform(code, {
            presets: [
                [
                    '@babel/preset-env'
                ]
            ],
        });
    console.log(ast1.code)

    "use strict";

    // var _obj$name;
    // var obj = {};
    // var s = (_obj$name = obj === null || obj === void 0 ? void 0 : obj.name) !== null && _obj$name !== void 0 ? _obj$name : '11';
}
 
 