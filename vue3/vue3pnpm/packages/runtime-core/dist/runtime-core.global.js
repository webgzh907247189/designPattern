var VueRuntimeCore = (() => {
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
  var src_exports = {};
  __export(src_exports, {
    TEXT: () => TEXT,
    createRenderer: () => createRenderer,
    createVnode: () => createVnode,
    h: () => h,
    isSameVnode: () => isSameVnode,
    isVnode: () => isVnode
  });

  // packages/shared/src/index.ts
  var isObject = (value) => {
    return typeof value === "object" && value !== null;
  };
  var isString = (value) => {
    return typeof value === "string";
  };
  var isArray = Array.isArray;

  // packages/runtime-core/src/vnode.ts
  var TEXT = Symbol("text");
  var isSameVnode = (oldVnode, newVnode) => {
    return oldVnode.key === newVnode.key && oldVnode.type === newVnode.type;
  };
  var createVnode = (type, props, children = null) => {
    debugger;
    let shapeFlag = isString(type) ? 1 /* ELEMENT */ : 0;
    const vnode = {
      _v_isVnode: true,
      shapeFlag,
      type,
      props,
      children,
      key: props == null ? void 0 : props.key,
      el: null
    };
    if (children) {
      let type2 = 0;
      if (isArray(children)) {
        type2 = 16 /* ARRAY_CHILDREN */;
      } else {
        children = String(children);
        type2 = 8 /* TEXT_CHILDREN */;
      }
      vnode.shapeFlag = vnode.shapeFlag | type2;
    }
    return vnode;
  };
  var isVnode = (value) => {
    return !!(value && value._v_isVnode);
  };

  // packages/runtime-core/src/render.ts
  var createRenderer = (renderOptions) => {
    const {
      insert: hostInsert,
      remove: hostRemove,
      setElementText: hostSetElementText,
      setText: hostSetText,
      querySelector: hostQuerySelector,
      parentNode: hostParentNode,
      nextSibiling: hostNextSibiling,
      createElement: hostCreateElement,
      createText: hostCreateText,
      patchProps: hostPatchProps
    } = renderOptions;
    const normalise = (children, idx) => {
      if (isString(children[idx])) {
        let vnode = createVnode(TEXT, null, children[idx]);
        children[idx] = vnode;
      }
      return children[idx];
    };
    const mountChildren = (children, container) => {
      for (let index = 0; index < children.length; index++) {
        let child = normalise(children, index);
        patch(null, child, container);
      }
    };
    const mountElement = (vnode, container, anchor) => {
      console.log(vnode, "vnode");
      let { type, props, children, shapeFlag } = vnode;
      let el = vnode.el = hostCreateElement(type);
      if (props) {
        for (const key in props) {
          hostPatchProps(el, key, null, props[key]);
        }
      }
      if (8 /* TEXT_CHILDREN */ & shapeFlag) {
        hostSetElementText(el, children);
      } else if (16 /* ARRAY_CHILDREN */ & shapeFlag) {
        mountChildren(children, el);
      }
      hostInsert(el, container, anchor);
    };
    const patchProps = (oldProps, newProps, el) => {
      for (const key in newProps) {
        hostPatchProps(el, key, oldProps[key], newProps[key]);
      }
      for (const key in oldProps) {
        if (!newProps[key]) {
          hostPatchProps(el, key, oldProps[key], void 0);
        }
      }
    };
    const unmountChildren = (oldChildren) => {
      for (let index = 0; index < oldChildren.length; index++) {
        const elementVnode = oldChildren[index];
        unmount(elementVnode);
      }
    };
    const patchKeydChildren = (oldChildren, newChildren, el) => {
      let i = 0;
      let oldChildrenLength = oldChildren.length - 1;
      let newChildrenLength = newChildren.length - 1;
      while (i <= oldChildrenLength && i <= newChildrenLength) {
        const oldChildrenItem = oldChildren[i];
        const newChildrenItem = newChildren[i];
        if (isSameVnode(oldChildrenItem, newChildrenItem)) {
          patch(oldChildrenItem, newChildrenItem, el);
        } else {
          break;
        }
        i++;
      }
      while (i <= oldChildrenLength && i <= newChildrenLength) {
        const oldChildrenItem = oldChildren[oldChildrenLength];
        const newChildrenItem = newChildren[newChildrenLength];
        if (isSameVnode(oldChildrenItem, newChildrenItem)) {
          patch(oldChildrenItem, newChildrenItem, el);
        } else {
          break;
        }
        oldChildrenLength--;
        newChildrenLength--;
      }
      console.log(i, oldChildrenLength, newChildrenLength);
      if (i > oldChildrenLength) {
        if (i <= newChildrenLength) {
          while (i <= newChildrenLength) {
            const nextPos = newChildrenLength + 1;
            const anchor = nextPos < newChildren.length ? newChildren[nextPos].el : null;
            patch(null, newChildren[i], el, anchor);
            i++;
          }
        }
      } else if (i > newChildrenLength) {
        if (i <= oldChildrenLength) {
          while (i <= oldChildrenLength) {
            unmount(oldChildren[i]);
            i++;
          }
        }
      }
      let s1 = i;
      let s2 = i;
      const keyToNewIndexMap = /* @__PURE__ */ new Map();
      for (let index = s2; index <= newChildrenLength; index++) {
        keyToNewIndexMap.set(newChildren[index].key, index);
      }
      console.log(keyToNewIndexMap, "keyToNewIndexMap");
      const tobePatched = newChildrenLength - s2 + 1;
      const newIndexToOldIndexMap = new Array(tobePatched).fill(0);
      for (let index = s1; index <= oldChildrenLength; index++) {
        const oldElement = oldChildren[index];
        let newIdx = keyToNewIndexMap.get(oldElement.key);
        if (!!newIdx) {
          unmount(oldElement);
        } else {
          newIndexToOldIndexMap[newIdx - s2] = index + 1;
          patch(oldElement, newChildren[newIdx], el);
        }
      }
      console.log(newIndexToOldIndexMap);
      for (let index = tobePatched - 1; index >= 0; index--) {
        const idx = s2 + tobePatched - 1;
        let current = newChildren[idx];
        let anchor = idx + 1 < newChildren.length ? newChildren[idx + 1].el : null;
        if (newIndexToOldIndexMap[index] === 0) {
          patch(null, current, el, anchor);
        } else {
          hostInsert(current.el, el, anchor);
        }
      }
    };
    const patchChildren = (oldValue, newVnode, el) => {
      const oldChildren = oldValue && oldValue.children;
      const newChildren = newVnode && newVnode.children;
      const prevFlag = oldValue.shapeFlag;
      const shapeFlag = newVnode.shapeFlag;
      if (shapeFlag & 8 /* TEXT_CHILDREN */) {
        if (prevFlag & 16 /* ARRAY_CHILDREN */) {
          unmountChildren(oldChildren);
        }
        if (oldChildren !== newChildren) {
          hostSetElementText(el, newChildren);
        }
      } else {
        if (prevFlag & 16 /* ARRAY_CHILDREN */) {
          if (shapeFlag & 16 /* ARRAY_CHILDREN */) {
            debugger;
            patchKeydChildren(oldChildren, newChildren, el);
          } else {
            unmountChildren(oldChildren);
          }
        } else {
          if (prevFlag & 8 /* TEXT_CHILDREN */) {
            hostSetElementText(el, "");
          }
          if (shapeFlag & 16 /* ARRAY_CHILDREN */) {
            mountChildren(newVnode, el);
          }
        }
      }
    };
    const patchElement = (oldValue, newVnode, container) => {
      debugger;
      let el = newVnode.el = oldValue.el;
      let oldProps = oldValue.props;
      let newProps = newVnode.props;
      patchProps(oldProps, newProps, el);
      patchChildren(oldValue, newVnode, el);
    };
    const processText = (oldValue, newVnode, container) => {
      if (oldValue == null) {
        newVnode.el = hostCreateText(newVnode.children);
        hostInsert(newVnode.el, container);
      } else {
        const el = newVnode.el = oldValue.el;
        if (newVnode.children !== oldValue.children) {
          hostSetText(el, newVnode.children);
        }
      }
    };
    const processElement = (oldValue, newVnode, container, anchor) => {
      if (oldValue == null) {
        mountElement(newVnode, container, anchor);
      } else {
        patchElement(oldValue, newVnode, container);
      }
    };
    const patch = (oldValue, newVnode, container, anchor = null) => {
      if (oldValue === newVnode)
        return;
      if (oldValue && !isSameVnode(oldValue, newVnode)) {
        unmount(oldValue);
        oldValue = null;
      }
      const { type, shapeFlag } = newVnode;
      switch (type) {
        case TEXT:
          processText(oldValue, newVnode, container);
          break;
        default:
          if (shapeFlag & 1 /* ELEMENT */) {
            processElement(oldValue, newVnode, container, anchor);
          }
      }
    };
    const unmount = (vnode) => {
      hostRemove(vnode.el);
    };
    const render = (vnode, container) => {
      console.log(vnode, container, "11");
      if (vnode == null) {
        if (container._vnode) {
          unmount(container._vnode);
        }
      } else {
        patch(container._vnode || null, vnode, container);
      }
      container._vnode = vnode;
    };
    return {
      render
    };
  };

  // packages/runtime-core/src/h.ts
  var h = function(type, propsOrChinlren, children) {
    const l = arguments.length;
    if (l === 2) {
      if (isObject(propsOrChinlren) && !isArray(propsOrChinlren)) {
        if (isVnode(propsOrChinlren)) {
          return createVnode(type, null, [propsOrChinlren]);
        }
        return createVnode(type, propsOrChinlren);
      } else {
        return createVnode(type, null, propsOrChinlren);
      }
    } else {
      let child = [];
      if (l > 3) {
        child = Array.from(arguments).slice(2);
      } else if (l === 3 && isVnode(children)) {
        child = [children];
      } else {
        child = children;
      }
      return createVnode(type, propsOrChinlren, child);
    }
  };
  return __toCommonJS(src_exports);
})();
//# sourceMappingURL=runtime-core.global.js.map
