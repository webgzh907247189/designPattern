const path = require('path')
const parser = require('@babel/parser')
const traverse = require('@babel/traverse').default
const generate = require('@babel/generator').default
const types = require('@babel/types')
const { RawSource, SourceMapSource } = require('webpack-sources')
const transferSourceMap = require("multi-stage-sourcemap").transfer;


const isBinaryExpression = (astNode) => {
    return types.isBinaryExpression(astNode)
}

const handlerBinaryExpression = (ast) => {
    const binaryExpressionLeft = ast.get('left')
    const binaryExpressionRight = ast.get('right')


    const leftAndright = [binaryExpressionLeft, binaryExpressionRight]
    for (const itemBinaryExpression of leftAndright) {
        if(types.isCallExpression(itemBinaryExpression)){
            const calleeName = itemBinaryExpression.get('callee').toString()
            if(calleeName === '_vm._s'){
                itemBinaryExpression.replaceWithSourceString(`_vm.cusgzh(${itemBinaryExpression.toString()})`)
                itemBinaryExpression.isNewNode = true
            }
        }

        if(isBinaryExpression(itemBinaryExpression)){
            return handlerBinaryExpression(itemBinaryExpression)
        }
    }
}

const extractSourceAndSourceMap = (asset) => {
    if (asset.sourceAndMap) {
        const { source, map } = asset.sourceAndMap();
       
        return { inputSource: source, inputSourceMap: map };
    } else {
        return {
            inputSource: asset.source(),
            inputSourceMap: asset.map()
        }
    }
}

module.exports = class xss{
    constructor(options = []) {
    }
    apply(compiler){
        const compilerContext = compiler.context

        compiler.hooks.emit.tapAsync('ErrorWithPackage', (compilation, cb) => {
            // console.log('zzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzz')
            Object.keys(compilation.assets).forEach((itemAssetKey) => {
                if(path.extname(itemAssetKey) === '.js'){
                    const itemAsset = compilation.assets[itemAssetKey]
                    const { inputSource: itemAssetSource, inputSourceMap } = extractSourceAndSourceMap(itemAsset)
                    // console.log(compilation.assets[itemAssetKey], 'inputSourceMap')

                    const ast = parser.parse(itemAssetSource, { sourceType: 'module' })

                    traverse(ast, {
                        // 处理 _vm._v(_vm._s()) 这种情况 
                        // 需要使用 方法包装一下
                        CallExpression(astPath, state){
                            const calleeName = astPath?.get?.('callee')?.toString?.()
                            if(calleeName === '_vm._v'){
                                const calleeArgsList = astPath?.get?.('arguments')

                                for (const itemArgAst of calleeArgsList) {
                                    // console.log(itemArgAst.toString(), '??');
                                    const isCallExpression = types.isCallExpression(itemArgAst)
                                    const childrenCallExpressionFnName = itemArgAst?.get?.('callee').toString?.()
                                    // console.log(childrenCallExpressionFnName, 'childrenCallExpressionFnThis', isCallExpression)
                                    if(isCallExpression && childrenCallExpressionFnName === '_vm._s'){
                                        // const args1 = itemArgAst.get('arguments').toString()
                                        itemArgAst.replaceWithSourceString(`_vm.cusgzh(${itemArgAst.toString()})`)
                                        itemArgAst.isNewNode = true

                                        // console.log(astPath.toString())
                                    }

                                    const isBinaryExpre = isBinaryExpression(itemArgAst)
                                    if(isBinaryExpre){
                                        handlerBinaryExpression(itemArgAst)
                                    }
                                }
                            }
                        }
                    })

                    // console.log(Object.keys(compilation.assets), 'compilation.assets')
                    // console.log(compilation.assets[itemAsset].sourceAndMap ,'???')
                    const { code, map: newSourceMap } = generate(ast)


                    // console.log(newSourceMap)
                    // const transferedSourceMap = transferSourceMap({
                    //     fromSourceMap: newSourceMap,
                    //     toSourceMap: inputSourceMap
                    // })
                    // const finalSourcemap = JSON.parse(transferedSourceMap);
                    // finalSourcemap['sourcesContent'] = inputSourceMap['sourcesContent'];
                    // compilation.assets[itemAssetKey] = new SourceMapSource(code,itemAssetKey, finalSourcemap)
                    compilation.assets[itemAssetKey] = {
                        source: () => code,
                        size: () => code.length,
                        // map: () => sourceMap,
                    }
                }
            })

            cb()
        })
    }
}