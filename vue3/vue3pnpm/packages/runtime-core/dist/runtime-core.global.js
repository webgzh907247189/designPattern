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
    createRenderer: () => createRenderer,
    h: () => h
  });

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
      createText: hostCreateText
    } = renderOptions;
    const mountElement = (vnode, container) => {
      debugger;
      let { type, props } = vnode;
      let el = vnode.el = hostCreateElement(type);
      hostInsert(el, container);
    };
    const patch = (oldValue, newVnode, container) => {
      console.log(oldValue, newVnode);
      if (oldValue === newVnode)
        return;
      if (oldValue == null) {
        mountElement(newVnode, container);
      } else {
      }
    };
    const render = (vnode, container) => {
      if (vnode == null) {
      } else {
        patch(container._vnode || null, vnode, container);
      }
      container._vnode = vnode;
    };
    return {
      render
    };
  };

  // packages/shared/src/index.ts
  var isString = (value) => {
    return typeof value === "string";
  };
  var isArray = Array.isArray;

  // packages/runtime-core/src/vnode.ts
  var createVnode = (type, props, children = null) => {
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

  // packages/runtime-core/src/h.ts
  var h = function(type, propsOrChinlren, children) {
    const l = arguments.length;
    if (l === 2) {
      if (isArray(propsOrChinlren)) {
        return createVnode(type, null, propsOrChinlren);
      } else {
        if (isVnode(propsOrChinlren)) {
          return createVnode(type, null, [propsOrChinlren]);
        }
        return createVnode(type, propsOrChinlren);
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
