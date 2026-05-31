const path = require('path')

// 1. webpack plugin 
// 2. babel import dynamic import
module.exports = class ErrorWithImportPackage{
    constructor(options = []) {
        this.errorWithImportPackageList = Array.isArray(options) ? options : [options];
    }
    apply(compiler){
        const compilerContext = compiler.context
        console.log('aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa')
        if(this.errorWithImportPackageList.length === 0) return

        compiler.hooks.emit.tapAsync('ErrorWithPackage', (compilation, cb) => {
            console.log('zzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzz')
            compilation.chunks.forEach(chunk => {
                chunk.getModules().forEach((module) => {

                    // module.dependencies.forEach((dependencie) => {

                    //     // console.log(dependencie?.module?.resource, '??')
                    //     if(dependencie?.module?.resource?.indexOf('node_modules') === -1){
                    //         console.log(dependencie?.module?.resource, '??')
                    //         dependencie.module.dependencies.forEach((fileDependencie) => {
                    //             if(fileDependencie?.module?.resource){
                    //                 const fileDependenciePath = path.posix.relative(compilerContext, fileDependencie?.module?.resource)
                    //                 console.log(fileDependenciePath, '11')

                    //                 this.errorWithImportPackageList.forEach((errorWithPackage) => {
                    //                     if(fileDependenciePath.includes(`node_modules/${errorWithPackage}`)){
                    //                         process.exit(1)
                    //                     }
                    //                 })
                    //             }
                    //         })
                    //     }
                    // })

                    // 浅度的 检测引入 npm 包
                    (module?.buildInfo?.fileDependencies ?? []).forEach((filePath) => {
                        const relativePath = path.posix.relative(compilerContext, filePath)
                        // console.log(relativePath,  this.errorWithImportPackageList, 'is-buffer')

                        this.errorWithImportPackageList.forEach((itemName) => {
                            const importPackageName = path.posix.join('node_modules', itemName)
                            
                            console.log(importPackageName, '???', relativePath)
                            if(relativePath.includes(importPackageName)){
                             
                                console.log(`\x1B[41;30m 引入非法npm包了: errow with import ${itemName}  \x1B[0m`);
                                process.exit(1);
                            }
                        })
                    })
                })
            });

            cb()
        })
    }
}