const compiler = require('@vue/compiler-sfc')

const selectBlock = (descriptor, id, loaderContext, incomeRquery) => {
    if(incomeRquery.get('type') === 'script'){
        const script = compiler.compileScript(descriptor, {
            id
        })
        // console.log(script, 'scriptscriptscript')

        loaderContext.callback(null, script.content)

        return
    }

    if(incomeRquery.get('type') === 'template'){
        const template = descriptor.template

        loaderContext.callback(null, template.content)

        return
    }

      if(incomeRquery.get('type') === 'style'){
        const style = descriptor.styles[Number(incomeRquery.get('index'))]

        loaderContext.callback(null, style.content)

        return
    }
}

module.exports = {
    selectBlock
}