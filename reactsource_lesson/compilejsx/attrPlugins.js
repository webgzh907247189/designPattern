const tag =
    'a,i,address,article,aside,base,blockquote,body,caption,col,colgroup,dd,' +
    'details,dialog,div,span,dl,dt,fieldset,figcaption,figure,footer,form,' +
    'h1,h2,h3,h4,h5,h6,head,header,hgroup,hr,html,legend,li,menuitem,meta,' +
    'optgroup,option,param,rp,rt,source,style,summary,tbody,td,tfoot,th,thead,table' +
    'title,tr,track,nuxt-link,nuxt,img,template,svg,path' +
    's,samp,small,span,strong,sub,sup,time,u,ul,p,ol,i' +
    'button,datalist,input,label,meter,pre'

const makeMap = tag.split(',').reduce((result, item) => {
    result[item] = true
    return result
}, Object.create(null))

module.exports = ({ types }, state) => {
    return {
        visitor: {
            JSXOpeningElement(astPath, state) {
                const jsxOpeningElement = astPath.get('name')?.toString?.()
                console.log(jsxOpeningElement, 'jsxOpeningElement')

                if (!makeMap[jsxOpeningElement]) {
                    const jsxAttributeList = astPath.get('attributes').toString()
                    // console.log(jsxOpeningElement, 'jsxOpeningElement', state)

                    const newPropComponentName = types.jSXAttribute(
                        types.jSXIdentifier('component-name'),
                        types.stringLiteral(jsxOpeningElement)
                    )
                    const newPropRenderFileName = types.jSXAttribute(
                        types.jSXIdentifier('render-file-name'),
                        types.stringLiteral('111')
                    )
                    astPath.node.attributes.push(newPropComponentName, newPropRenderFileName)
                }
            }
        }
    }
}