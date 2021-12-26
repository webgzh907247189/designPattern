const plugins = []

if (process.env.UNI_OPT_TREESHAKINGNG) {
    plugins.push(require('@dcloudio/vue-cli-plugin-uni-optimize/packages/babel-plugin-uni-api/index.js'))
}

if (process.env.UNI_PLATFORM === 'app-plus' && process.env.UNI_USING_V8) {
    const path = require('path')

    const isWin = /^win/.test(process.platform)

    const normalizePath = path => (isWin ? path.replace(/\\/g, '/') : path)

    const input = normalizePath(process.env.UNI_INPUT_DIR)
    try {
        plugins.push([
            require('@dcloudio/vue-cli-plugin-hbuilderx/packages/babel-plugin-console'),
            {
                file(file) {
                    file = normalizePath(file)
                    if (file.indexOf(input) === 0) {
                        return path.relative(input, file)
                    }
                    return false
                }
            }
        ])
    } catch (e) {}
}

process.UNI_LIBRARIES = process.UNI_LIBRARIES || ['@dcloudio/uni-ui']
process.UNI_LIBRARIES.forEach(libraryName => {
    plugins.push([
        'import',
        {
            'libraryName': libraryName,
            'customName': (name) => {
                return `${libraryName}/lib/${name}/${name}`
            }
        }
    ])
})

// 放在这里，为了 plugin 顺序
// 生产环境清除console
if (process.env.NODE_CUSTOM_ENV === 'prod') {
    plugins.push('transform-remove-console');
}

plugins.push('@babel/plugin-transform-runtime', '@babel/plugin-proposal-optional-chaining', '@babel/plugin-proposal-nullish-coalescing-operator');

module.exports = {
    presets: [
        [
            '@vue/app',
            {
                modules: false,
                useBuiltIns: process.env.UNI_PLATFORM === 'h5' ? 'usage' : 'entry'
            }
        ]
    ],
    plugins
}