const compiler = require('@vue/compiler-sfc')
function templateLoader(source){

    const query = new URLSearchParams(this.resourceQuery.slice(1))
    const { code } = compiler.compileTemplate({
        source,
        filename: this.resourcePath,
        id: query.get('id'),
    })
    this.callback(null, code)
}

module.exports = templateLoader;