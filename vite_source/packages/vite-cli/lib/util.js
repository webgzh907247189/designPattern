const path = require('path/posix');
const { Readable } = require('stream');

async function readBody(stream) {
    return new Promise((resolve) => {
        let buffers = []
        stream.on('data', chunk => buffers.push(chunk))
        .on('end', () => {
            resolve(Buffer.concat(buffers).toString())
        })
    })
}


function resolveVue(projectRoot) {
    const compilerPkgPath = path.resolve(projectRoot, '../../node_modules','@vue/compiler-sfc/package.json')
    const compilerPkg = require(compilerPkgPath)

    // compiler 的绝对路径
    const compilerPath = path.join(path.dirname(compilerPkg),compilerPkg.main)

    return {
        compiler: compilerPath
    }
}
exports.readBody = readBody;
exports.resolveVue = resolveVue;
