import { createRenderer } from "@vue/runtime-core"
export * from '@vue/runtime-core'


import { nodeOps } from "./nodeOps"
import { patchProps } from "./patchProps"

const renderOptions = Object.assign({}, nodeOps, { patchProps })


// runtime-dom， 用户可以直接使用该方法进行调用，默认集合了 renderOptions
// 用户也可以手动 调用 runtime-core 的 createRenderer，但是需要配置参数
export const render = (vnode, container) => {
    console.log(renderOptions, 'renderOptions')
    return createRenderer(renderOptions).render(vnode, container)
}
