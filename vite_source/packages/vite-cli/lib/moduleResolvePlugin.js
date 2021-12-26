const fs = require("fs")
const { resolveVue } = require('./util');

const moduleRegexp = /^\/@modules\//
function moduleResolvePlugin({ app, projectRoot }) {
    app.use(async (ctx, next) => {
        const vueResolved = resolveVue(projectRoot)
        // 如果当前的请求路径不是我们改写的模块路径
        if(!moduleRegexp.test(ctx.path)){
            await next() // ????
        }

        // 把 /@modules/vue 替换成 vue
        const id = ctx.path.replace(moduleRegexp, '')
        ctx.type = 'js'
        const context = await fs.readFile(vueResolved[id], 'utf8')
        // 把模块内容给响应体
        ctx.body = context
    })
}

exports.moduleResolvePlugin = moduleResolvePlugin

