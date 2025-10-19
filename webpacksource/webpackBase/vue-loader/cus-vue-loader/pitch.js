const { stringiftRequest } = require('./utils')

const stylePostLoaderPath = require.resolve('./stylePostLoader.js')
const pitch = code => code

pitch.pitch = function () {
    // console.log('pitch')

    // this.loaders 有2个 loader ----> ['当前 pitch', 'vue-loader']
    const loaderList = this.loaders.filter(loader => loader.path !== __filename);

    const query = new URLSearchParams(this.resourceQuery.slice(1))

    if(query.get('type') === 'style') {
        // const cssLoaderIndex = loaderList.findIndex(loader => loader.path === 'css-loader') 
        const cssLoaderIndex = loaderList.findIndex(loader => /css-loader/.test(loader.path)) 
        // console.log(cssLoaderIndex, 'cssLoaderIndex', loaderList)
        return getnProxyModlue([
            ...loaderList.slice(0, cssLoaderIndex+ 1),
            { request: stylePostLoaderPath},
            ...loaderList.slice(cssLoaderIndex + 1)
        ], this)
    }
    // query ----->   vue&type=script 
    return getnProxyModlue(loaderList, this, query.get('type') !== 'template')
}

const getnProxyModlue =  function(loaderList, loaderContext, exportDefault = true) { 
    const request = genRequest(loaderList, loaderContext)
    return exportDefault ? `export { default } from ${request}` : `export * from ${request}`
}

const genRequest = function (loaderList, loaderContext) {
    const loaderStrings = loaderList.map(loader => {
        /**
         * loaderList 只有一个 loader -> ['vue-loader']
         * loader.request --->
         * /Users/web/Documents/github/designPattern/webpacksource/webpackBase/vue-loader/cus-vue-loader/index.js
         */
        return loader.request
    })

    /**
     * resource --->
     * /Users/web/Documents/github/designPattern/webpacksource/webpackBase/vue-loader/src/App.vue?vue&type=script
     */
    const resource = loaderContext.resourcePath + loaderContext.resourceQuery
    // console.log('resource', resource)

    const result =  stringiftRequest(loaderContext, '!!' + [...loaderStrings, resource].join('!'))
    // console.log('resultpath', '!!' + [...loaderStrings, resource].join('!'))

    // console.log('result', result)
    // result !!"../cus-vue-loader/index.js!./App.vue?vue&type=script"

    return result
}

module.exports = pitch