/**
 * 你可能不知道的 npm 实用技巧
 * https://juejin.cn/post/6844903879306379277
 * 
 * 
 * https://zhuanlan.zhihu.com/p/430580607
 */

// npm ci 根据 package-lock.json 安装依赖，这可以保证整个开发团队都使用版本完全一致的依赖，避免把时间浪费在排查因为依赖不一致而导致的各种奇怪问题上
// npm ci --prefer-offline  最大限度地利用 npm 的全局缓存加速安装过程。




// npm outdated。它会列出还没有升到当前最新版本的项目依赖。
// 红色表示符合指定的语义化版本范围，理论上可以无脑升级（npm update 会一次性升级所有红色依赖）。
// 黄色表示不符合指定的语义化版本范围，比如大版本升级，升级可能会遇到兼容性问题。




// npm audit 命令，列出项目依赖中有安全漏洞的版本
// 因为 npm install 引入新依赖时会自动运行 npm audit，再加上会定期运行 npm outdated，所以手动运行 npm audit 的机会不太多。



// npx 很智能，如果路径中找不到 rollup，会自动安装。



// 直接运行 npm run （不带任何参数）会列出所有在 scripts 中声明的命令。





// npm repo vue
// npm home vue
// npm repo 可以打开项目的源代码仓库（大部分情况下是 GitHub），它还有一个姊妹命令，
// npm home，可以打开项目的主页。不过，我个人觉得，比起这两个命令，通常而言， IDE 或者编辑器的智能提示（速览类型、速览文档、速览定义之类）更高效。





/**
 * package.json 的配置
 * https://juejin.cn/post/7023539063424548872
 * 发布npm包的配置
 * 
 */
// 在Web环境中，如果使用loader加载ESM（ES module），那么这三个配置的加载顺序是browser→module→main，如果使用require加载CommonJS模块，则加载的顺序为main→module→browser。​

// 所有node_modules/.bin/目录下的命令，都可以用npm run [命令]的格式运行。

// files配置是一个数组，用来描述当把npm包作为依赖包安装时需要说明的文件列表。当npm包发布时，files指定的文件会被推送到npm服务器中，如果指定的是文件夹，那么该文件夹下面所有的文件都会被提交。
// 如果有不想提交的文件，可以在项目根目录中新建一个.npmignore文件，并在其中说明不需要提交的文件，防止垃圾文件推送到npm上。这个文件的形式和.gitignore类似。写在这个文件中的文件即便被写在files属性里也会被排除在外。

// module字段可以定义 npm 包的 ESM 规范的入口文件，browser 环境和 node 环境均可使用。如果 npm 包导出的是 ESM 规范的包，使用 module 来定义入口文件。
// 如果 npm 包只在 web 端使用，并且严禁在 server 端使用，使用 browser 来定义入口文件。



// 调试相关
// https://juejin.cn/post/7006241938974179359