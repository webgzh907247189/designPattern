var runtimeCore = (() => {
  var __defProp = Object.defineProperty;
  var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __hasOwnProp = Object.prototype.hasOwnProperty;
  var __export = (target, all) => {
    for (var name in all)
      __defProp(target, name, { get: all[name], enumerable: true });
  };
  var __copyProps = (to, from, except, desc) => {
    if (from && typeof from === "object" || typeof from === "function") {
      for (let key of __getOwnPropNames(from))
        if (!__hasOwnProp.call(to, key) && key !== except)
          __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
    }
    return to;
  };
  var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

  // packages/runtime-core/src/index.ts
  var index_exports = {};
  __export(index_exports, {
    createRenderer: () => createRenderer,
    createVnode: () => createVnode,
    h: () => h,
    isSameVnode: () => isSameVnode,
    isVnode: () => isVnode
  });

  // packages/shared/src/index.ts
  var isObject = (val) => {
    return typeof val === "object" && val !== null;
  };
  var isString = (val) => {
    return typeof val === "string";
  };

  // packages/runtime-core/src/createVode.ts
  var createVnode = (type, props, children) => {
    const shapeFlag = isString(type) ? 1 /* ELEMENT */ : 0;
    const vnode = {
      __v_isVnode: true,
      type,
      props,
      children,
      key: props?.key,
      el: null,
      // 虚拟节点对应的 真是节点 DOM
      shapeFlag
    };
    if (children) {
      if (Array.isArray(children)) {
        vnode.shapeFlag |= 16 /* ARRAY_CHILDREN */;
      } else {
        children = String(children);
        vnode.shapeFlag |= 8 /* TEXT_CHILDREN */;
      }
    }
    return vnode;
  };
  var isVnode = (value) => {
    return value?.__v_isVnode;
  };
  var isSameVnode = (n1, n2) => {
    return !!(n1.type === n2.type && n1.key === n2.key);
  };

  // packages/runtime-core/src/h.ts
  var h = (...args) => {
    const [type, propsOrChildren, children] = args;
    let l = args.length;
    if (l === 2) {
      if (isObject(propsOrChildren) && !Array.isArray(propsOrChildren)) {
        if (isVnode(propsOrChildren)) {
          return createVnode(type, null, [propsOrChildren]);
        }
        return createVnode(type, propsOrChildren);
      }
      return createVnode(type, null, propsOrChildren);
    } else {
      let child = [];
      if (l > 3) {
        child = args.slice(2);
      } else if (l === 3 && isVnode(children)) {
        child = [children];
      } else {
        child = children;
      }
      return createVnode(type, propsOrChildren, child);
    }
  };

  // packages/runtime-core/src/renderer.ts
  function createRenderer(renderOptions) {
    const {
      insert: hostInsert,
      // 删除节点
      remove: hostRemove,
      // 文本节点
      // 元素节点动态变更
      setElementText: hostSetElementText,
      setText,
      hostSetText,
      parentNode: hostParentNode,
      nextSibiling: hostNextSibiling,
      createElement: hostCreateElement,
      createText: hostCreateText,
      patchProps: hostPatchProps
    } = renderOptions;
    const mountChildren = (children, container) => {
      for (let index = 0; index < children.length; index++) {
        const element = children[index];
        patch(null, element, container);
      }
    };
    const mountElement = (vnode, container, anchor) => {
      const { type, children, shapeFlag, props } = vnode;
      let el = hostCreateElement(type);
      vnode.el = el;
      if (props) {
        for (const key in props) {
          hostPatchProps(el, key, null, props[key]);
        }
      }
      if (shapeFlag & 8 /* TEXT_CHILDREN */) {
        hostSetElementText(el, children);
      } else if (shapeFlag & 16 /* ARRAY_CHILDREN */) {
        mountChildren(children, el);
      }
      hostInsert(el, container, anchor);
    };
    const processElement = (n1, n2, container, anchor) => {
      if (n1 === null) {
        mountElement(n2, container, anchor);
      } else {
        patchElement(n1, n2, container);
      }
    };
    const patch = (n1, n2, container, anchor = null) => {
      if (n1 === n2) return;
      if (n1 && !isSameVnode(n1, n2)) {
        unmount(n1);
        n1 = null;
      }
      processElement(n1, n2, container, anchor);
    };
    const render = (vnode, container) => {
      console.log(vnode, container);
      if (vnode === null) {
        if (container._vnode) {
          console.log(container._vnode, "container._vnode");
          unmount(container._vnode);
        }
      }
      patch(container._vnode ?? null, vnode, container);
      container._vnode = vnode;
    };
    const unmount = (vnode) => {
      return hostRemove(vnode.el);
    };
    const patchElement = (n1, n2, container) => {
      let el = n2.el = n1.el;
      let oldProps = n1.props ?? {};
      let newProps = n2.props ?? {};
      patchProps(oldProps, newProps, el);
      patchChildren(n1, n2, el);
    };
    const patchProps = (oldProps, newProps, el) => {
      for (const key in newProps) {
        hostPatchProps(el, key, oldProps[key], newProps[key]);
      }
      for (const key in oldProps) {
        if (!(key in newProps)) {
          hostPatchProps(el, key, oldProps[key], null);
        }
      }
    };
    const patchChildren = (n1, n2, el) => {
      const c1 = n1.children;
      const c2 = n2.children;
      const prevFlag = n1.shapeFlag;
      const shapeFlag = n2.shapeFlag;
      if (shapeFlag & 8 /* TEXT_CHILDREN */) {
        if (prevFlag & 16 /* ARRAY_CHILDREN */) {
          unmountChildren(c1);
        }
        if (c1 !== c2) {
          hostSetElementText(el, c2);
        }
      } else {
        if (prevFlag & 16 /* ARRAY_CHILDREN */) {
          if (shapeFlag & 16 /* ARRAY_CHILDREN */) {
            patchKeydChildren(c1, c2, el);
          } else {
            unmountChildren(c1);
          }
        } else {
          if (prevFlag & 8 /* TEXT_CHILDREN */) {
            hostSetElementText(el, "");
          }
          if (shapeFlag & 16 /* ARRAY_CHILDREN */) {
            mountChildren(c2, el);
          }
        }
      }
    };
    const patchKeydChildren = (oldChildren, newChildren, el) => {
      let i = 0;
      let e1 = oldChildren.length - 1;
      let e2 = newChildren.length - 1;
      while (i <= e1 && i <= e2) {
        const n1 = oldChildren[i];
        const n2 = newChildren[i];
        if (isSameVnode(n1, n2)) {
          patch(n1, n2, el);
        } else {
          break;
        }
        i++;
      }
      console.log(i, e1, e2);
      while (i <= e1 && i <= e2) {
        const n1 = oldChildren[e1];
        const n2 = newChildren[e2];
        if (isSameVnode(n1, n2)) {
          patch(n1, n2, el);
        } else {
          break;
        }
        e1--;
        e2--;
      }
      console.log(i, e1, e2);
      if (i > e1) {
        if (i <= e2) {
          let nextPos = e2 + 1;
          let anchor = newChildren[nextPos]?.el;
          while (i <= e2) {
            patch(null, newChildren[i], el, anchor);
            i++;
          }
        }
      } else if (i > e2) {
        if (i <= e1) {
          while (i <= e1) {
            unmount(oldChildren[i]);
            i++;
          }
        }
      } else {
        console.log(i, e1, e2);
        let s1 = i;
        let s2 = i;
        const keyToNewIndexMap = /* @__PURE__ */ new Map();
        for (let i2 = s2; i2 <= e2; i2++) {
          const vnode = newChildren[i2];
          keyToNewIndexMap.set(vnode.key, i2);
        }
        let toBePatch = e2 - s2 + 1;
        let newIndexToOldMapIndex = new Array(toBePatch).fill(0);
        for (let i2 = s1; i2 <= e1; i2++) {
          const vnode = oldChildren[i2];
          const newIndex = keyToNewIndexMap.get(vnode.key);
          if (newIndex === void 0) {
            unmount(vnode);
          } else {
            newIndexToOldMapIndex[newIndex - s2] = i2 + 1;
            patch(vnode, newChildren[newIndex], el);
          }
        }
        console.log(newIndexToOldMapIndex, "newIndexToOldMapIndexnewIndexToOldMapIndex");
        debugger;
        for (let i2 = toBePatch - 1; i2 >= 0; i2--) {
          let newIndex = s2 + i2;
          let anchor = newChildren[newIndex + 1]?.el;
          const vnode = newChildren[newIndex];
          if (!vnode.el) {
            patch(null, vnode, el, anchor);
          } else {
            hostInsert(vnode.el, el, anchor);
          }
        }
      }
    };
    const unmountChildren = (oldChildren) => {
      for (let index = 0; index < oldChildren.length; index++) {
        const elementVnode = oldChildren[index];
        unmount(elementVnode);
      }
    };
    return {
      render
    };
  }
  return __toCommonJS(index_exports);
})();
//# sourceMappingURL=runtime-core.js.map
