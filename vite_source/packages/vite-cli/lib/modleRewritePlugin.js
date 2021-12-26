const path = require('path');
let MagicString = require('magic-string');
let {parse} = require('es-module-lexer');
const { readBody } = require('./util');

function modleRewritePlugin({ app, projectRoot }) {
    app.use(async (ctx, next) => {
        await next()

        // 如果有响应体 并且 响应体的内容是 mime-type=application/javascript
        if(ctx.body && ctx.response.is('js')){
            const content = await readBody(ctx.body)
            console.log(content);

            const result = await rewriteImports(content)
            // console.log(result, 'result');
            ctx.body = result
        }
    })
}

exports.modleRewritePlugin = modleRewritePlugin



async function rewriteImports(content) {
    let imports = await parse(content)
    imports = imports[0]
    let magicString = new MagicString(content)
    if(imports.length > 0){
        for (let index = 0; index < imports.length; index++) {
            const {n, s, e} = imports[index];
            let rewriteModuleId = `/@modules/${n}`
            magicString.overwrite(s, e, rewriteModuleId)
        }
    }
    return magicString.toString()
}