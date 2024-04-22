import { createRenderer } from "@vue/runtime-core";
import { nodeOps } from "./nodeOps";
import { patchProps } from "./patchProps";
const renderOptions = Object.assign({}, nodeOps, { patchProps });
export const render = (vnode, container) => {
    console.log(renderOptions, 'renderOptions');
    return createRenderer(renderOptions).render(vnode, container);
};
export * from '@vue/runtime-core';
//# sourceMappingURL=index.js.map