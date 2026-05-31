const Bundle = require('./bundle')

function rollup(entry, outputFile){
    const bundle = new Bundle({ entry })
    bundle.build(outputFile)
}
module.exports = rollup