import { testFn } from './util';
import { useStore } from './testModules';
import {parse}  from 'qs';

// import parse from 'qs';
import testQs from './testQs';

// console.log(parse, 'qs')
function a(){
    testQs()
    // console.log(formats)
    console.log(parse('foo[bar]=baz')); // qs.stringify({name: '11',sex: '22'})
    // const list = [[[[1]]]]
    useStore();
    // const reslut = list.flat(100);
    return testFn();
}

function b(){
    let s = 1
    return s + 100
}

const root = document.getElementById('root');
root.innerHTML = a();


/**
 * package.json 的 type
 * 它决定当前 package.json 层级目录内文件遵循哪种规范，包含两种值，默认为 commonjs。
 * commonjs: js 和 cjs 文件遵循 CommonJS 规范，mjs 文件遵循 ESM 规范
 * module: js 和 mjs 文件遵循 ESM 规范，cjs 文件遵循 CommonJS 规范
 * 
 * exports 一旦被指定，只能引用 exports 中显示导出的文件
 */



/**
 * 在 webpack5 的情况下， 使用 单个 export 明显减少体积, tree shaking 效果明显
 * 
 * https://zhuanlan.zhihu.com/p/265030136
 * webpack5 现在支持 package.json 中的 exports 和 imports 字段。现在起原生支持 Yarn PnP
 * 
 * webpack5 情况下
 * 
 * export default {formats,parse,stringify} 
 * 且 只使用一个方法 parse 方法 打包之后  ->   340行代码
 * 
 * 
 * export const formats = formats1;export const parse = parse1;export const stringify = stringify1;
 * 且 只使用一个方法 parse 方法 打包之后  ->   206行代码
 * 
 * 
 * webpack4 情况下 (不支持package.json 中的 exports 和 imports 字段)
 * export const formats = formats1;export const parse = parse1;export const stringify = stringify1;
 * 且 只使用一个方法 parse 方法 打包之后  ->   429行代码 (qs模块所有代码都打包进去了)
 * 
 * 强行将 qs 模块的 main 改掉esm入口，打包行数 266 行
 */



 /**
  * lerna
  * https://segmentfault.com/a/1190000038801642
  * 
  * version字段，这个字段有两个类型的值，一个是像0.0.0这样一个具体版本号，还可以是independent这个关键字。
  * 如果是0.0.0这种具体版本号，那lerna管理的所有子项目都会有相同的版本号----0.0.0
  * 如果你设置为independent，那各个子项目可以有自己的版本号，比如子项目1的版本号是0.0.0，子项目2的版本号可以是0.1.0
  * 
  * 
  * 
  * 提取公共的 npm 包
  * lerna提供了另一个强大的功能：将子项目的依赖包都提取到最顶层，我们只需要先删除子项目的node_modules再跑下面这行命令
  * lerna bootstrap --hoist
  * 
  * 
  * (lerna bootstrap --hoist会把所有子项目用的最多的版本移动到顶层, 需要 useWorkspaces & yarn 支持)
  * lerna bootstrap --hoist虽然可以将子项目的依赖提升到顶层，但是他的方式比较粗暴：先在每个子项目运行npm install，等所有依赖都安装好后，将他们移动到顶层的node_modules
  * 
  * 
  * 在项目最顶层启动各个子项目
  * "webpack4prod": "lerna --scope webpack4 run prod"
  * "webpack5prod": "lerna --scope webpack5 run prod"
  * 
  * 
  */
