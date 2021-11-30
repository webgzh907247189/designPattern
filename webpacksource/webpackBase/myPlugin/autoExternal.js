const { ExternalModule } = require("webpack");
const HtmlWebpackplugin = require('html-webpack-plugin');

module.exports = class AutoExternal {
    constructor(options){
        this.options = options
        this.externalModules = Object.keys(options); // 自动外链的模块
        this.importedModules = new Set(); // 存放着 所有真正使用到的 外部依赖模块
    }

    apply(compiler){
        // 每种模块会对应一个模块工厂  普通模块对应的是 普通的模块工厂
        compiler.hooks.normalModuleFactory.tap('AutoExternal', (normalModuleFactory) => {
            normalModuleFactory.hooks.parser.for('javascript/auto').tap('AutoExternal',(parser) => {
                // parser 遍历的过程中 遇到 import 节点

                // source 模块名字
                parser.hooks.import.tap('AutoExternal', (statement, source) => {
                    if(this.externalModules.includes(source)){
                        this.importedModules.add(source);
                    }
                    // console.log(this.importedModules, 'this.importedModules');
                })

                parser.hooks.call.for('require').tap('AutoExternal',(expression) => {
                    let value = expression.arguments[0].value
                    if(this.externalModules.includes(value)){
                        this.importedModules.add(value);
                    }
                });
            })

            // console.log(normalModuleFactory.hooks, 'normalModuleFactory.hooks');
            normalModuleFactory.hooks.factorize.tapAsync('AutoExternal', (resolvedata, cb) => {
                let { request } = resolvedata
                if(this.externalModules.includes(request)){
                    let { variable } = this.options[request]
                    cb(null, new ExternalModule(variable, 'window', request))
                }else{
                    // 正常模块 直接向后执行， 走正常打包模块流程
                    cb();
                }
            })

            // 插入html中

        })

        compiler.hooks.compilation.tap('AutoExternal', (compilation) => {
            HtmlWebpackplugin.getHooks(compilation).alterAssetTags.tapAsync('AutoExternal', (htmlData) => {
                // console.log(htmlData, 'htmlData');
                Reflect.ownKeys(this.options).filter(_ => this.importedModules.has(_)).forEach(key => {
                    htmlData.assetTags.scripts.unshift({
                        tagName: 'script',
                        voidTag: false,
                        attributes: {
                            defer: false,
                            src: this.options[key].url
                        }
                    })
                })
                // 让下个钩子 拿到最新的 htmlData
                cb(null, htmlData)
            })
        })  
    }
}

/**
 * 1. 需要向塑出 html文件中添加cdn脚本引用
 * 2. 在打包生产包的时候 ，截断正常的打包逻辑，变成一个外部依赖模块
 */