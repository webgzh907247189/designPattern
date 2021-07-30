const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = class InlineSourceplugin {
    constructor({match}){
        this.reg = match;
    }

    apply(compiler){
        compiler.hooks.compilation.tap('MyPlugin', (compilation) => {
            console.log('The compiler is starting a new compilation...')
      
            // Static Plugin interface |compilation |HOOK NAME | register listener 
            HtmlWebpackPlugin.getHooks(compilation).alterAssetTagGroups.tapAsync(
              'InlineSourceplugin', // <-- Set a meaningful name here for stacktraces
              (data, cb) => {

                data = this.precessTags(data, compilation);
                // Tell webpack to move on
                cb(null, data)
              }
            )
        })
    }

    // 处理 引入数据的方式
    precessTags(data, compilation){
        let headTags = [];
        let bodyTags = []

        data.headTags.forEach(headTag => {
            headTags.push(this.precessTag(headTag, compilation))
        });

        data.bodyTags.forEach(bodyTag => {
            bodyTags.push(this.precessTag(bodyTag, compilation))
        });

        return {
            ...data,
            headTags,
            bodyTags
        }
    }

    precessTag(tag,compilation){
        let newTag = null;
        let url = null
        if(tag.tagName === 'link' && this.reg.test(tag.attributes.href)){
            newTag = {
                tagName: 'style',
                attributes: {type: 'text/css'}
            }
            url = tag.attributes.href
        }

        if(tag.tagName === 'script' && this.reg.test(tag.attributes.src)){
            newTag = {
                tagName: 'script',
                attributes: {type: 'application/javascript'}
            }
            url = tag.attributes.src
        }
        if(url){
            // 文件内容放到 innerHTML 上面
            newTag.innerHTML = compilation.assets[url].source();
            delete compilation.assets[url];
            return newTag
        }
        return tag;
    }
}