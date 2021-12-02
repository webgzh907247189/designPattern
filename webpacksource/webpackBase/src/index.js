console.log('111');

require('./index.css');
require('./test');
require('./test.png')

const fn = () => {
    console.log('111')
};
fn();

async function aa(){
    console.log('111--gzh');
}
aa();

// loader 默认从右向左执行， 从下向上执行
// loader 类型： 
// 1. pre 前置loader
// 2. normal loader
// 3. 内联 loader
// 4. 后置 loader

// expose-loader 暴露全局的 loader
// 模块请求参数最前面添加感叹号 !来禁用配置文件中的 normal-loader
// 模块请求参数最前面添加双感叹号 !!来禁用配置文件中所有的loaders(只保留 inline-loader 处理)
// 模块请求参数最前面添加 -!来禁用配置文件中preLoaders和loaders，除了postLoaders







// loader 默认两部分组成 (pitch, normal)
/** use: ['loader3', 'loader2', 'loader1']*/
// 最后一个 loader 一定要返回一个 js 脚本 (webpack 中 eval 执行 这个脚本)
// 每个 loader 只做一件事情
// 每个 loader 应该是无状态
// 每个 loader 是一个模块

// pitch loader 无返回值
// 前面执行顺序是 pitch， 后面执行顺序是 normal
// 'loader3 * pitch' ->  'loader2 * pitch' ->  'loader1 * pitch' ->  <SOURCE>  -> 'loader1 * normal' ->  'loader2 * normal' -> 'loader3 * normal'


// pitch loader 有返回值 (pitch loader2 有返回值)
// 前面执行顺序是 pitch， 后面执行顺序是 normal
// 'loader3 * pitch' ->  'loader2 * pitch' -> 'loader3 * normal'





// --mode 拿到的值
console.log(process.env.NODE_ENV, 'fe');
// 1. expose-loader 暴露给window
// 2. provider-plugin 给每个模块提供
// 3. external 打包不引入

import $ from 'jquery';
// import $ from 'expose-loader?exposes[]=$!jquery';


// 使用expose-loader 暴露的，直接访问，并且 window 上也存在这个属性
console.log($, '111', window.$);
console.error('2222');


// import ss from 'expose-loader?exposes[]=TTT!babel-loader!./testExpose';
import ss from './testExpose';


import Vue from 'vue';
// 在每个模块进行注入，使用 webpack.ProvidePlugin， window上面没有这个属性
console.log(window.$1, '333',$1, Vue);


class A {
    aa = 1
}
document.write('test')


import VueRouter from 'vue-router';
console.error(VueRouter, 'VueRouter');

if(module.hot){
    module.hot.accept('./test',() => {
        console.log('更新完成')
    })
}