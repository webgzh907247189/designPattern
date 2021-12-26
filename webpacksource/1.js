安装遇到的问题
略



解决 sourcemap 问题
1. sentry 错误映射源码 要求必须 上传 sourcemap， 此时需要设置 devtool ('source-map' yes, 'hidden-source-map' yes)
2. 在build完成之后，需要删除 .map 文件，不然会被别人看到源码 (webpack plugin 删除 || upload 之前 删除) 
本质上还是在 compiler.hooks.afterEmit 完成 upload
webpack-plugin 的  constructor 执行 this.cli = this.getSentryCli();
apply -> attachAfterEmitHook(看 afterEmit 有没有准备好) -> compiler.hooks.afterEmit.tapAsync('SentryCliPlugin', callback)  ->  this.finalizeRelease(compilation).then(() => cb()); (cb 很重要，非常重要)
this.finalizeRelease   ->   this.cli.releases.uploadSourceMaps 完成上传

    注意看 this.finalizeRelease 的代码
    {
        new Promise((resolve,reject)=>{
            console.log(1)
            resolve()
          }).then(()=>{
            console.log(2)
            new Promise((resolve,reject)=>{
                console.log(3)
                resolve()
            }).then(()=>{
                console.log(4)
            }).then(()=>{
                console.log(5)
            })
          }).then(()=>{
            console.log(6)
          })
    }
    {
        new Promise((resolve, reject) => {
            console.log(1)
            resolve()
          }).then(() => {
            console.log(2)
            // 多了个return
            return new Promise((resolve, reject) => {
              console.log(3)
              resolve()
            }).then(() => {
              console.log(4)
            }).then(() => { // 相当于return了这个then的执行返回Promise
              console.log(5)
            })
        }).then(() => {
            console.log(6)
        })
    }
}
{
    // 看调用顺序问题 (多个 AsyncSeriesHook 实列)
    // compiler.run(callback); ->  this.hooks.beforeRun.callAsync()  -> this.hooks.run.callAsync()   ->  this.readRecords(cb)
    // this.compile  ->  this.hooks.beforeCompile -> this.hooks.make.callAsync  ->  this.hooks.afterCompile.callAsync  
    // ->  cb === onCompiled ->  this.emitAssets   -> this.hooks.afterEmit(cb) ->  cb() === this.hooks.done.callAsync()  
    // 本质上还是 微内核，便于扩展。。拦截中间件
    const {AsyncSeriesHook} = require("tapable");

    const hook1 = new AsyncSeriesHook(['name']);
    const hook2 = new AsyncSeriesHook(['name']);
    hook1.tapAsync('afterEmit', (name, cb) => {
        setTimeout(() => {
            console.log('afterEmit', name);
            cb();
        }, 3000)
    })
    
    
    hook2.tapAsync('done', (name, cb) => {
        console.log('done1', name);
        cb();
    })
    hook2.tapAsync('done', (name, cb) => {
        console.log('done2', name);
        cb();
    })
    
    hook1.callAsync('chifan',() => {
        hook2.callAsync('chifan',() => {
            console.log('end');
        })
    });
}



3. webpack plugin 删除 需要清楚的知道  upload .map 文件的时机，删除操作会不会影响 上传的 .map 文件
4. 写 plugin 本身是一件很简单的事情，清楚的知道 Webpack的基本构建流程，大概就可以写了
compile compilation emit afterEmit done

5. 删除之后发现 测试环境的 还是能映射出来源码 (why why why)
6. 看了一下 原来是 hash在搞鬼， 修改hash值，发现无效，还是显示源码(之前传上去的.map文件一直在cdn上面，后面构建的时候，产出的文件没变，所以本质上还是拉的第一次的.map文件下来了) ？？？？？？？(尝试之后删不掉，cdn是只加不删的)
vue-cli 做了处理，默认的 output 是 [contentHash:8], 跟着内容走的，内容不变，文件hash不变。 
vue-cli 在哪里加的
chunkFilename:'js/[name].[contenthash:8].js'
filename:'js/[name].[contenthash:8].js'

`js/[name]${isLegacyBundle ? `-legacy` : ``}${isProd && options.filenameHashing ? '.[contenthash:8]' : ''}.js`
https://github.com/vuejs/vue-cli/blob/cf7b46adc4c5f181d9e3eb03decbeb4cfb792bc8/packages/%40vue/cli-service/lib/config/app.js?_pjax=%23js-repo-pjax-container%3Afirst-of-type%2C%20div%5Bitemtype%3D%22http%3A%2F%2Fschema.org%2FSoftwareSourceCode%22%5D%20main%3Afirst-of-type%2C%20%5Bdata-pjax-container%5D%3Afirst-of-type#L29
https://cli.vuejs.org/zh/config/#filenamehashing


inspect 为什么拿到是错误的
vue inspect --mode production> ss.js
https://github.com/vuejs/vue-cli/blob/b0e7bf07d6d7e086985475df713b593cb42ef878/packages/%40vue/cli-service/lib/config/app.js?_pjax=%23js-repo-pjax-container%3Afirst-of-type%2C%20div%5Bitemtype%3D%22http%3A%2F%2Fschema.org%2FSoftwareSourceCode%22%5D%20main%3Afirst-of-type%2C%20%5Bdata-pjax-container%5D%3Afirst-of-type#L22


vue脚手架的另一个问题 (把node 的环境变了给了前端，风马流不想干的东西)
https://github.com/vuejs/vue-cli/blob/b0e7bf07d6d7e086985475df713b593cb42ef878/packages/%40vue/cli-service/lib/config/base.js?_pjax=%23js-repo-pjax-container%3Afirst-of-type%2C%20div%5Bitemtype%3D%22http%3A%2F%2Fschema.org%2FSoftwareSourceCode%22%5D%20main%3Afirst-of-type%2C%20%5Bdata-pjax-container%5D%3Afirst-of-type#L182
https://github.com/vuejs/vue-cli/blob/b0e7bf07d6/packages/%40vue/cli-service/lib/util/resolveClientEnv.js
https://github.com/vuejs/vue-cli/blob/b0e7bf07d6d7e086985475df713b593cb42ef878/packages/%40vue/cli-service/lib/util/resolveClientEnv.js?_pjax=%23js-repo-pjax-container%3Afirst-of-type%2C%20div%5Bitemtype%3D%22http%3A%2F%2Fschema.org%2FSoftwareSourceCode%22%5D%20main%3Afirst-of-type%2C%20%5Bdata-pjax-container%5D%3Afirst-of-type#L16


import() 产生的hash 怎么来的 ？？？？
hash 无效，hash每次构建都不一样 ？？？？？？？？compile返回的hash？？？

img、font中是没有chunkHash的 ？？？？？？？？
// hash chunkHash contentHash
// 1. hash 每次编译产生新的 hash值， 只要改了就会变
// 2. chunkHash 代码块的hash
// 3. contentHash 内容hash

// webpack5的 更新 以前的 chunkfilename 都是 以 0 1 2 3 作为[name].js, 现在改进采用 确定性的算法计算出来的 文件名， 文件内容不变，名字不变

7. 发现使用了按需加载(import()), 使用按需加载的目的： 为了优化H5首屏加载速度，想到使用按需加载的方式，减少首次加载的JavaScript文件体， 为什么需要切割代码( 如何查看 每一帧的 task，如何切割，fiber的诞生, requestIdlecallback)
8. 分割代码的几种方式
// 1. 拆分多入口 2. import() 3. cacheGroups

8. 按需加载如何实现的 (源码)？？？？？？？？？
10. 命名chunk的名称(webpackChunkName) 为何无效 (魔法注释无效) 缺少 @babel/plugin-syntax-dynamic-import，


11. vue-cli 默认加了 @babel/plugin-syntax-dynamic-import 还是出了问题？？？？
https://github.com/vuejs/vue-cli/blob/b0e7bf07d6d7e086985475df713b593cb42ef878/packages/%40vue/babel-preset-app/index.js?_pjax=%23js-repo-pjax-container%3Afirst-of-type%2C%20div%5Bitemtype%3D%22http%3A%2F%2Fschema.org%2FSoftwareSourceCode%22%5D%20main%3Afirst-of-type%2C%20%5Bdata-pjax-container%5D%3Afirst-of-type#L240



11. filename和chunkFilename的区别
filename 决定了每个入口(entry) 输出 bundle 的名称。
chunkFilename 决定了非入口(non-entry) chunk 文件的名称。