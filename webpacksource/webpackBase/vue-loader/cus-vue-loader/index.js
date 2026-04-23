const compiler = require('@vue/compiler-sfc')
const hash = require('hash-sum')
const VueLoaderPlugin = require('./plugin')
const { stringiftRequest } = require('./utils')
const select = require('./select')
function loader(source){
    // resourcePath  ----> 当前文件的绝对路径
    // resourceQuery ----> 当前文件的查询参数
    const { resourcePath, resourceQuery } = this;
    const id = hash(resourcePath)
    const { descriptor } = compiler.parse(source)
    const hasScoped = descriptor.styles.some(s => s.scoped)
    

    // 第三轮进入到当前 loader 逻辑
    {
        const rawRequest = resourceQuery.slice(1)
        const incomeRquery = new URLSearchParams(rawRequest)
       
        if(incomeRquery.get('type')){
            return select.selectBlock(descriptor, id, this, incomeRquery)
        }
    }
    // console.log(resourcePath, '--zzz--',resourceQuery)

    const code = []
    const { script, template, styles } = descriptor

    if(script){
        const query = `?vue&type=script&id=${id}&lang=js`
        
        // stringiftRequest ---->  这里拿到一个相对路径
        // const stringiftRequest = JSON.stringify(this.utils.contextify(this.context, resourcePath + resourceQuery))
        const request = stringiftRequest(this, resourcePath + query)
        // console.log(request, '--request--')

        code.push(`import script from ${request}`)
    }

    if(template){
        const scopedQuery = hasScoped ? `&scoped=true` : ''
        const query = `?vue&type=template&id=${id}${scopedQuery}&lang=js`
        const request = stringiftRequest(this, resourcePath + query)
        code.push(`import {render} from ${request}`)
        code.push(`script.render = render`)
    }

     if(styles.length > 0){
        styles.forEach((style, idx) => {
            const scopedQuery = style.scoped ? `&scoped=true` : ''
            const query = `?vue&type=style&index=${idx}&id=${id}${scopedQuery}&lang=css`
            const request = stringiftRequest(this, resourcePath + query)
            // console.log(request, '--request--')
            code.push(`import ${request}`)

            // code.push(`import ${style.scoped ? 'scopedStyle' : 'style'} from ${request}`)
            // code.push(`script.styles = script.styles || []`)
            // code.push(`script.styles.push(${style.scoped ? 'scopedStyle' : 'style'})`)
        })
    }
    if(hasScoped){
        code.push(`script.__scopeId = 'data-v-${id}'`)
    }
    code.push(`export default script`)

    // console.log(code, '--code--')
    return code.join('\n')
}

module.exports = loader
loader.VueLoaderPlugin = VueLoaderPlugin