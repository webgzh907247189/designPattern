const { resolve } = require('path');
const { build } = require('esbuild')

const args = require('minimist')(process.argv.slice(2))

console.log(args, '111', process.argv)

const target = args._[0] || 'reactivity'
const format = args.f || 'global'

const pkg = require(resolve(__dirname, `../packages/${target}/package.json`));

const outputFormat = format.startsWith('global') ? 'iife' : format === 'cjs' ? 'cjs' : 'esm'

const outfile = resolve(__dirname, `../packages/${target}/dist/${target}.${format}.js`)




// esbuild 配置
build({
    entryPoints: [resolve(__dirname, `../packages/${target}/src/index.ts`)],
    outfile,
    bundle: true,  // 把所有的包打到一起
    sourcemap: true,
    format: outputFormat,
    globalName: pkg.buildOptions?.name, // 打包全局的名字
    platform: format === 'cjs' ? 'node' : 'browser',
    watch: {
        onRebuild(err){
            if(!err){ console.log('rebuild ~~') }
        }
    }
}).then(() => {
    console.log('watching~~')
})