const compiler = require('@vue/compiler-sfc')
function stylePostLoader(source){
    const query = new URLSearchParams(this.resourceQuery.slice(1))
  
    const {code} = compiler.compileStyle({
        source,
        id: `data-v-${query.get('id')}`,
        scoped: !!query.get('scoped'),
    })

    
    // console.log('stylePostLoader', source)
    this.callback(null, code)
}

module.exports = stylePostLoader;