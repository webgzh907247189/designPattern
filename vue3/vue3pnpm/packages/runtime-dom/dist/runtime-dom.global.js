var VueRuntimeDOM = (() => {
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

  // packages/runtime-dom/src/index.ts
  var src_exports = {};
  __export(src_exports, {
    FRAGEMENT: () => FRAGEMENT,
    ReactiveEffect: () => ReactiveEffect,
    TEXT: () => TEXT,
    activeEffect: () => activeEffect,
    activeEffectScope: () => activeEffectScope,
    computed: () => computed,
    createRenderer: () => createRenderer,
    createVnode: () => createVnode,
    effect: () => effect,
    effectScope: () => effectScope,
    h: () => h,
    isReactive: () => isReactive,
    isSameVnode: () => isSameVnode,
    isVnode: () => isVnode,
    proxyRefs: () => proxyRefs,
    reactive: () => reactive,
    recordEffectScope: () => recordEffectScope,
    ref: () => ref,
    render: () => render,
    toRef: () => toRef,
    toRefs: () => toRefs,
    track: () => track,
    trackEffect: () => trackEffect,
    trigger: () => trigger,
    triggerEffect: () => triggerEffect,
    watch: () => watch,
    watchEffect: () => watchEffect
  });

  // packages/shared/src/index.ts
  var isObject = (value) => {
    return typeof value === "object" && value !== null;
  };
  var isString = (value) => {
    return typeof value === "string";
  };
  var isFunction = (value) => {
    return typeof value === "function";
  };
  var isArray = Array.isArray;
  console.log(6 /* COMPONENT */ & 1 /* ELEMENT */);

  // packages/runtime-core/src/vnode.ts
  var TEXT = Symbol("text");
  var FRAGEMENT = Symbol("fragment");
  var isSameVnode = (oldVnode, newVnode) => {
    return oldVnode.key === newVnode.key && oldVnode.type === newVnode.type;
  };
  var createVnode = (type, props, children = null) => {
    let shapeFlag = isString(type) ? 1 /* ELEMENT */ : isObject(type) ? 4 /* STATEFUL_COMPONENT */ : 0;
    const vnode = {
      __v_isVnode: true,
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
    return !!(value && value.__v_isVnode);
  };

  // packages/reactivity/src/effectScope.ts
  var activeEffectScope = null;
  var EffectScope = class {
    constructor(detached = false) {
      this.active = true;
      this.effects = [];
      if (!detached && activeEffectScope) {
        (activeEffectScope.scopes || (activeEffectScope.scopes = [])).push(this);
      }
    }
    run(fn) {
      if (this.active) {
        try {
          this.parent = activeEffectScope;
          activeEffectScope = this;
          return fn();
        } catch (e) {
          activeEffectScope = this.parent;
          this.parent = null;
        }
      }
    }
    stop() {
      if (this.active) {
        for (let index = 0; index < this.effects.length; index++) {
          const effect2 = this.effects[index];
          effect2.stop();
        }
        if (this.scopes) {
          for (let index = 0; index < this.scopes.length; index++) {
            const scope = this.scopes[index];
            scope.stop();
          }
        }
        this.active = false;
      }
    }
  };
  var effectScope = (detached) => {
    return new EffectScope(detached);
  };
  var recordEffectScope = (effect2) => {
    if (activeEffectScope && activeEffectScope.active) {
      activeEffectScope.effects.push(effect2);
    }
  };

  // packages/reactivity/src/effect.ts
  var activeEffect = void 0;
  var cleanupEffect = (effect2) => {
    const { deps } = effect2;
    deps.forEach((item) => {
      item.delete(effect2);
    });
    effect2.deps.length = 0;
  };
  var ReactiveEffect = class {
    constructor(fn, scheduler) {
      this.fn = fn;
      this.deps = [];
      this.parent = null;
      this.active = true;
      recordEffectScope(this);
      this.scheduler = scheduler;
    }
    run() {
      if (!this.active) {
        return this.fn();
      }
      try {
        this.parent = activeEffect;
        activeEffect = this;
        cleanupEffect(this);
        return this.fn();
      } finally {
        activeEffect = this.parent;
        this.parent = null;
      }
    }
    stop() {
      if (this.active) {
        this.active = false;
        cleanupEffect(this);
      }
    }
  };
  var effect = (fn, options) => {
    debugger;
    const _effect = new ReactiveEffect(fn, options == null ? void 0 : options.scheduler);
    _effect.run();
    const runner = _effect.run.bind(_effect);
    runner.effect = _effect;
    return runner;
  };
  var trackEffect = (depSet) => {
    if (activeEffect) {
      let shouldTrack = !depSet.has(activeEffect);
      if (shouldTrack) {
        depSet.add(activeEffect);
        activeEffect.deps.push(depSet);
      }
    }
  };
  var triggerEffect = (effects) => {
    effects = new Set(effects);
    effects.forEach((effect2) => {
      if (effect2 != activeEffect) {
        if (effect2.scheduler) {
          effect2.scheduler();
        } else {
          effect2.run();
        }
      }
    });
  };
  var targetMap = /* @__PURE__ */ new WeakMap();
  var track = (target, type, key) => {
    if (!activeEffect) {
      return;
    }
    let depsMap = targetMap.get(target);
    if (!depsMap) {
      targetMap.set(target, depsMap = /* @__PURE__ */ new Map());
    }
    let depSet = depsMap.get(key);
    if (!depSet) {
      depsMap.set(key, depSet = /* @__PURE__ */ new Set());
    }
    trackEffect(depSet);
  };
  var trigger = (target, type, key, value, oldValue) => {
    const depsMap = targetMap.get(target);
    if (!depsMap) {
      return;
    }
    let effects = depsMap.get(key);
    if (effects) {
      triggerEffect(effects);
    }
  };

  // packages/reactivity/src/baseHandler.ts
  var baseHandler = {
    get(target, key, receiver) {
      if (key === ReactiveFlags.IS_REACTIVE) {
        return true;
      }
      track(target, "get", key);
      let res = Reflect.get(target, key, receiver);
      if (isObject(res)) {
        return reactive(res);
      }
      return res;
    },
    set(target, key, value, receiver) {
      let oldValue = target[key];
      let result = Reflect.set(target, key, value, receiver);
      if (oldValue != value) {
        trigger(target, "set", key, value, oldValue);
      }
      return result;
    }
  };
  var ReactiveFlags = /* @__PURE__ */ ((ReactiveFlags2) => {
    ReactiveFlags2["IS_REACTIVE"] = "_v_isReactive";
    return ReactiveFlags2;
  })(ReactiveFlags || {});

  // packages/reactivity/src/reactive.ts
  var reactiveMap = /* @__PURE__ */ new WeakMap();
  var isReactive = (val) => {
    return val && val["_v_isReactive" /* IS_REACTIVE */];
  };
  var reactive = (target) => {
    if (!isObject(target)) {
      return;
    }
    if (target["_v_isReactive" /* IS_REACTIVE */]) {
      return target;
    }
    const exisitingProxy = reactiveMap.get(target);
    if (exisitingProxy) {
      return exisitingProxy;
    }
    const proxy2 = new Proxy(target, baseHandler);
    reactiveMap.set(target, proxy2);
    return proxy2;
  };
  var obj = {
    name: "123",
    get test() {
      return this.name;
    }
  };
  var proxy = new Proxy(obj, {
    get(target, key, receiver) {
      return target[key];
    }
  });
  console.log(proxy.test);

  // packages/reactivity/src/computed.ts
  var computed = (getterOrOptions) => {
    debugger;
    let onlyGettter = isFunction(getterOrOptions);
    let getter;
    let setter;
    if (onlyGettter) {
      getter = getterOrOptions;
      setter = () => {
        console.warn("no set");
      };
    } else {
      getter = getterOrOptions.get;
      setter = getterOrOptions.set;
    }
    return new ComputedRefImpl(getter, setter);
  };
  var ComputedRefImpl = class {
    constructor(getter, setter) {
      this.getter = getter;
      this.setter = setter;
      this._dirty = true;
      this._v_isReadOnly = true;
      this._v_isRef = true;
      this.dep = /* @__PURE__ */ new Set();
      this.effect = new ReactiveEffect(getter, () => {
        if (!this._dirty) {
          this._dirty = true;
          triggerEffect(this.dep);
        }
      });
    }
    get value() {
      trackEffect(this.dep);
      if (this._dirty) {
        this._value = this.effect.run();
        this._dirty = false;
      }
      return this._value;
    }
    set value(newVal) {
      this.setter(newVal);
    }
  };

  // packages/reactivity/src/watch.ts
  var traversal = (value, set = /* @__PURE__ */ new Set()) => {
    if (!isObject(value))
      return value;
    if (set.has(value)) {
      return value;
    }
    set.add(value);
    for (const key in value) {
      traversal(value[key], set);
    }
    return value;
  };
  var doWatch = (source, cb, { immediate } = {}) => {
    let getter;
    if (isReactive(source)) {
      getter = () => traversal(source);
    } else if (isFunction(source)) {
      getter = source;
    }
    let cleanup;
    const onCleanup = (fn) => {
      cleanup = fn;
    };
    let oldValue;
    const job = () => {
      if (cb) {
        if (cleanup) {
          cleanup();
        }
        const newValue = _effect.run();
        cb(newValue, oldValue, onCleanup);
        oldValue = newValue;
      } else {
        _effect.run();
      }
    };
    const _effect = new ReactiveEffect(getter, job);
    if (immediate) {
      return job();
    }
    oldValue = _effect.run();
  };
  var watch = (source, cb, options) => {
    doWatch(source, cb, options);
  };
  var watchEffect = (source, options) => {
    doWatch(source, null, options);
  };

  // packages/reactivity/src/ref.ts
  var ref = (value) => {
    return new RefImpl(value);
  };
  var RefImpl = class {
    constructor(rowValue) {
      this.rowValue = rowValue;
      this._v_isRef = true;
      this.dep = /* @__PURE__ */ new Set();
      this._value = toReactive(rowValue);
    }
    get value() {
      trackEffect(this.dep);
      return this._value;
    }
    set value(newValue) {
      if (this.rowValue !== newValue) {
        this._value = toReactive(newValue);
        this.rowValue = newValue;
        triggerEffect(this.dep);
      }
    }
  };
  function toReactive(value) {
    return isObject(value) ? reactive(value) : value;
  }
  function toRefs(value) {
    const result = isArray(value) ? new Array(value.length) : {};
    for (let key in value) {
      result[key] = toRef(value, key);
    }
    return result;
  }
  function toRef(object, key) {
    return new ObjectRefImpl(object, key);
  }
  var ObjectRefImpl = class {
    constructor(object, key) {
      this.object = object;
      this.key = key;
      this.__v_isRef = true;
    }
    get value() {
      return this.object[this.key];
    }
    set value(newValue) {
      this.object[this.key] = newValue;
    }
  };
  var proxyRefs = (object) => {
    return new Proxy(object, {
      get(target, key, recevier) {
        const r = Reflect.get(target, key, recevier);
        return r._v_isRef ? r.value : r;
      },
      set(target, key, value, recevier) {
        let oldValue = target[key];
        if (oldValue._v_isRef) {
          oldValue.value = value;
          return true;
        } else {
          return Reflect.set(target, key, value, recevier);
        }
      }
    });
  };

  // packages/runtime-core/src/scheduler.ts
  var queue = [];
  var isFlushing = false;
  var p = Promise.resolve();
  function queueJobs(job) {
    if (!queue.includes(job)) {
      queue.push(job);
    }
    if (!isFlushing) {
      isFlushing = true;
      p.then(() => {
        isFlushing = false;
        let copyQueue = queue.slice(0);
        queue.length = 0;
        copyQueue.forEach((job2) => job2());
        copyQueue.length = 0;
      });
    }
  }

  // packages/runtime-core/src/render.ts
  var createRenderer = (renderOptions2) => {
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
    } = renderOptions2;
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
    const patchProps2 = (oldProps, newProps, el) => {
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
      patchProps2(oldProps, newProps, el);
      patchChildren(oldValue, newVnode, el);
    };
    const processFragment = (oldValue, newVnode, container) => {
      if (oldValue == null) {
        mountChildren(newVnode.children, container);
      } else {
        patchKeydChildren(oldValue.children, newVnode.children, container);
      }
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
    const processComponent = (oldValue, newVnode, container, anchor) => {
      if (oldValue == null) {
        mountComponent(newVnode, container, anchor);
      } else {
        updateComponent(oldValue, newVnode, container);
      }
    };
    const mountComponent = (initialVnode, container, anchor) => {
      const { data = () => ({}), render: render3 } = initialVnode.type;
      const state = reactive(data());
      const instance = {
        state,
        isMounted: false,
        subTree: null,
        vnode: initialVnode,
        update: null
      };
      const componentUpdate = () => {
        debugger;
        if (instance.isMounted) {
          const prevSubTree = instance.subTree;
          const nextSubTree = render3.call(state, state);
          instance.subTree = nextSubTree;
          patch(prevSubTree, nextSubTree, container, anchor);
        } else {
          const subTree = render3.call(state, state);
          patch(null, subTree, container, anchor);
          instance.subTree = subTree;
          instance.isMounted = true;
        }
      };
      const effect2 = new ReactiveEffect(componentUpdate, () => {
        debugger;
        queueJobs(instance.update);
      });
      const update = instance.update = effect2.run.bind(effect2);
      update();
    };
    const updateComponent = (oldVnode, newVnode, container) => {
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
        case FRAGEMENT:
          processFragment(oldValue, newVnode, container);
          break;
        default:
          if (shapeFlag & 1 /* ELEMENT */) {
            processElement(oldValue, newVnode, container, anchor);
          } else if (shapeFlag & 6 /* COMPONENT */) {
            processComponent(oldValue, newVnode, container, anchor);
          }
      }
    };
    const unmount = (vnode) => {
      const { shapeFlag, type, children } = vnode;
      if (type === FRAGEMENT) {
        return unmountChildren(children);
      }
      hostRemove(vnode.el);
    };
    const render2 = (vnode, container) => {
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
      render: render2
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

  // packages/runtime-dom/src/nodeOps.ts
  var nodeOps = {
    insert(child, parent, anchor = null) {
      parent.insertBefore(child, anchor);
    },
    remove(child) {
      let parentNode = child.parentNode;
      if (parentNode) {
        parentNode.removeChild(child);
      }
    },
    setElementText(el, text) {
      el.textContent = text;
    },
    setText(node, text) {
      node.nodeValue = text;
    },
    querySelector(selector) {
      return document.querySelector(selector);
    },
    parentNode(node) {
      return node.parentNode;
    },
    nextSibiling(node) {
      return node.nextSibiling;
    },
    createElement(ele) {
      return document.createElement(ele);
    },
    createText(ele) {
      return document.createTextNode(ele);
    }
  };

  // packages/runtime-dom/src/modules/attr.ts
  var patchAttr = (el, key, nextVal) => {
    if (nextVal) {
      el.setAttribute(key, nextVal);
    } else {
      el.removeAttribute(key);
    }
  };

  // packages/runtime-dom/src/modules/class.ts
  var patchClass = (el, nextVal) => {
    if (nextVal === null) {
      el.removeAttribute("class");
    } else {
      el.className = nextVal;
    }
  };

  // packages/runtime-dom/src/modules/event.ts
  var patchEvent = (el, eventName, naxtVal) => {
    let invokers = el._vei || (el._vei = {});
    let extis = invokers[eventName];
    if (extis && naxtVal) {
      extis.value = naxtVal;
    } else {
      let event = eventName.slice(2).toLowerCase();
      if (naxtVal) {
        let invoker = invokers[eventName] = createInvoker(naxtVal);
        el.addEventListener(event, invoker);
      } else if (extis) {
        el.removeEventListener(event, extis);
        invokers[eventName] = void 0;
      }
    }
  };
  function createInvoker(cb) {
    const invoker = (e) => invoker.value(e);
    invoker.value = cb;
    return invoker;
  }

  // packages/runtime-dom/src/modules/style.ts
  var patchStyle = (el, prevVal, nextVal = {}) => {
    for (const key in nextVal) {
      el.style[key] = nextVal[key];
    }
    if (prevVal) {
      for (const key in prevVal) {
        if (!nextVal[key]) {
          el.style[key] = null;
        }
      }
    }
  };

  // packages/runtime-dom/src/patchProps.ts
  var patchProps = (el, key, prevVal, nextVal) => {
    if (key === "class") {
      patchClass(el, nextVal);
    } else if (key === "style") {
      patchStyle(el, prevVal, nextVal);
    } else if (/^on[^a-z]/.test(key)) {
      patchEvent(el, key, nextVal);
    } else {
      patchAttr(el, key, nextVal);
    }
  };

  // packages/runtime-dom/src/index.ts
  var renderOptions = Object.assign({}, nodeOps, { patchProps });
  var render = (vnode, container) => {
    console.log(renderOptions, "renderOptions");
    return createRenderer(renderOptions).render(vnode, container);
  };
  return __toCommonJS(src_exports);
})();
//# sourceMappingURL=runtime-dom.global.js.map
