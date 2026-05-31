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
    FRAGEMENT: () => FRAGEMENT,
    LicycleHooks: () => LicycleHooks,
    PATCHFLAGS: () => PATCHFLAGS,
    ReactiveEffect: () => ReactiveEffect,
    TEXT: () => TEXT,
    Teleport: () => Teleport,
    Transition: () => Transition,
    _createElementBlock: () => _createElementBlock,
    _createElementVNode: () => createVnode,
    _openBlock: () => _openBlock,
    _toDisplayString: () => _toDisplayString,
    activeEffect: () => activeEffect,
    activeEffectScope: () => activeEffectScope,
    computed: () => computed,
    createComponentInstance: () => createComponentInstance,
    createRenderer: () => createRenderer,
    createVnode: () => createVnode,
    currentBlock: () => currentBlock,
    currentInstancce: () => currentInstancce,
    defineAsyncComponent: () => defineAsyncComponent,
    effect: () => effect,
    effectScope: () => effectScope,
    getCurrentInstance: () => getCurrentInstance,
    h: () => h,
    inject: () => inject,
    isReactive: () => isReactive,
    isSameVnode: () => isSameVnode,
    isTeleport: () => isTeleport,
    isVnode: () => isVnode,
    onBeforeMount: () => onBeforeMount,
    onBeforeUnmount: () => onBeforeUnmount,
    onBeforeUpdate: () => onBeforeUpdate,
    onMounted: () => onMounted,
    onUnmounted: () => onUnmounted,
    onUpdated: () => onUpdated,
    provide: () => provide,
    proxyRefs: () => proxyRefs,
    reactive: () => reactive,
    recordEffectScope: () => recordEffectScope,
    ref: () => ref,
    setCurrentInstance: () => setCurrentInstance,
    setupComponent: () => setupComponent,
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
  var invokeArrayFn = (fns) => {
    fns && fns.forEach((fn) => fn());
  };
  console.log(6 /* COMPONENT */ & 1 /* ELEMENT */);

  // packages/runtime-core/src/teleport.ts
  var Teleport = {
    __isTeleport: true,
    process(oldVnode, newVnode, container, anchor, internals) {
      const { mountChildren, patchChildren, move } = internals;
      if (!oldVnode) {
        const target = newVnode.target = document.querySelector(newVnode.props.to);
        if (target) {
          const children = Array.isArray(newVnode.children) ? newVnode.children : [newVnode.children];
          mountChildren(children, target);
        }
      } else {
        let oldChildren = Array.isArray(oldVnode.children) ? oldVnode.children : [oldVnode.children];
        oldVnode.children = oldChildren;
        let newChildren = Array.isArray(newVnode.children) ? newVnode.children : [newVnode.children];
        newVnode.children = newChildren;
        patchChildren(oldChildren, newChildren);
        if (oldVnode.props.to !== newVnode.props.to) {
          const target = newVnode.target = document.querySelector(newVnode.props.to);
          newVnode.children.forEach((child) => {
            move(child, target);
          });
        }
      }
    },
    remove(vnode) {
      vnode.target.innerHTML = "";
    }
  };
  var isTeleport = (val) => {
    return !!val.__isTeleport;
  };

  // packages/runtime-core/src/vnode.ts
  var TEXT = Symbol("text");
  var FRAGEMENT = Symbol("fragment");
  var isSameVnode = (oldVnode, newVnode) => {
    return oldVnode.key === newVnode.key && oldVnode.type === newVnode.type;
  };
  var createVnode = (type, props, children = null, pathchFlag = 0) => {
    let shapeFlag = isString(type) ? 1 /* ELEMENT */ : isObject(type) ? isTeleport(type) ? 64 /* TELEPORT */ : 4 /* STATEFUL_COMPONENT */ : isFunction(type) ? 2 /* FUNCTIONAL_COMPONENT */ : 0;
    const vnode = {
      __v_isVnode: true,
      shapeFlag,
      type,
      props,
      children,
      key: props == null ? void 0 : props.key,
      el: null,
      pathchFlag,
      dynamicChildren: null
    };
    if (children) {
      let type2 = 0;
      if (isArray(children)) {
        type2 = 16 /* ARRAY_CHILDREN */;
      } else if (isObject(children)) {
        type2 = 32 /* SLOTS_CHILDREN */;
      } else {
        children = String(children);
        type2 = 8 /* TEXT_CHILDREN */;
      }
      vnode.shapeFlag = vnode.shapeFlag | type2;
    }
    if (currentBlock && pathchFlag > 0) {
      currentBlock.push(vnode);
    }
    return vnode;
  };
  var isVnode = (value) => {
    return !!(value && value.__v_isVnode);
  };
  var _toDisplayString = (val) => {
    if (isObject(val)) {
      return JSON.stringify(val);
    }
    if (isString(val)) {
      return val;
    }
    if (val === null) {
      return "";
    }
    return String(val);
  };
  var currentBlock = null;
  var _openBlock = () => {
    currentBlock = [];
  };
  var _createElementBlock = (type, props, children, patchFlag) => {
    const vnode = createVnode(type, props, children, patchFlag);
    vnode.dynamicChildren = currentBlock;
    currentBlock = null;
    return vnode;
  };
  var PATCHFLAGS = /* @__PURE__ */ ((PATCHFLAGS2) => {
    PATCHFLAGS2[PATCHFLAGS2["TEXT"] = 1] = "TEXT";
    PATCHFLAGS2[PATCHFLAGS2["CLASS"] = 2] = "CLASS";
    PATCHFLAGS2[PATCHFLAGS2["STYLE"] = 4] = "STYLE";
    PATCHFLAGS2[PATCHFLAGS2["PROPS"] = 8] = "PROPS";
    PATCHFLAGS2[PATCHFLAGS2["FULL_PROPS"] = 16] = "FULL_PROPS";
    return PATCHFLAGS2;
  })(PATCHFLAGS || {});

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
    ReactiveFlags2["IS_REACTIVE"] = "__v_isReactive";
    return ReactiveFlags2;
  })(ReactiveFlags || {});

  // packages/reactivity/src/reactive.ts
  var reactiveMap = /* @__PURE__ */ new WeakMap();
  var isReactive = (val) => {
    return val && val["__v_isReactive" /* IS_REACTIVE */];
  };
  var reactive = (target) => {
    if (!isObject(target)) {
      return;
    }
    if (target["__v_isReactive" /* IS_REACTIVE */]) {
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
      this.__v_isReadOnly = true;
      this.__v_isRef = true;
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
      this.__v_isRef = true;
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
        return r.__v_isRef ? r.value : r;
      },
      set(target, key, value, recevier) {
        let oldValue = target[key];
        if (oldValue.__v_isRef) {
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

  // packages/runtime-core/src/components.ts
  var currentInstancce = null;
  var setCurrentInstance = (i) => {
    currentInstancce = i;
  };
  var getCurrentInstance = () => {
    return currentInstancce;
  };
  var createComponentInstance = (initialVnode, parentComponent) => {
    const instance = {
      state: {},
      isMounted: false,
      subTree: null,
      vnode: initialVnode,
      update: null,
      attrs: {},
      props: {},
      propsOptions: initialVnode.type.props || {},
      proxy: null,
      render: null,
      exposed: {},
      slots: {},
      parent: parentComponent,
      providers: parentComponent ? parentComponent.providers : /* @__PURE__ */ Object.create(null)
    };
    return instance;
  };
  var publicProperties = {
    $attrs: (i) => i.attrs,
    $slots: (i) => i.slots
  };
  var initSlots = (instance, children) => {
    if (instance.vnode.shapeFlag & 32 /* SLOTS_CHILDREN */) {
      instance.slots = children;
    }
  };
  var setupComponent = (instance) => {
    instance.vnode.component = instance;
    initProps(instance, instance.vnode.props);
    initSlots(instance, instance.vnode.children);
    instance.proxy = new Proxy(instance, {
      get(traget, key, receiver) {
        const { state, props, setupState } = traget;
        if (key in setupState) {
          return setupState[key];
        }
        if (state && key in state) {
          return state[key];
        } else if (key in props) {
          return props[key];
        }
        let getter = publicProperties[key];
        if (getter) {
          return getter(instance);
        }
      },
      set(traget, key, value, receiver) {
        const { state, props, setupState } = traget;
        if (state && key in setupState) {
          setupState[key] = value;
          return true;
        }
        if (state && key in state) {
          state[key] = value;
          return true;
        } else if (key in props) {
          console.log("\u4E0D\u5141\u8BB8\u4FEE\u6539props");
          return false;
        }
        return true;
      }
    });
    const { data, setup, render } = instance.vnode.type;
    if (isFunction(setup)) {
      const context = {
        attrs: instance.attrs,
        emit(eventName, ...args) {
          var _a;
          const bindName = `on${(_a = eventName[0]) == null ? void 0 : _a.toUpperCase()}${eventName.slice(1)}`;
          const hander = instance.attrs[bindName];
          if (hander) {
            let handers = Array.isArray(hander) ? hander : [hander];
            handers.forEach((hander2) => hander2(...args));
          }
        },
        expose(exposed) {
          instance.exposed = exposed;
        },
        slots: instance.slots
      };
      setCurrentInstance(instance);
      const setupResult = setup(instance.props, context);
      setCurrentInstance(null);
      if (isFunction(setupResult)) {
        instance.render = setupResult;
      } else {
        instance.setupState = proxyRefs(setupResult);
      }
    }
    if (!instance.render) {
      instance.render = render;
    }
    if (isFunction(data)) {
      instance.state = reactive(data.call(instance.proxy));
    }
  };
  var initProps = (instance, userProps) => {
    var _a;
    const attrs = {};
    const props = {};
    const propsOptions = (_a = instance.propsOptions) != null ? _a : {};
    if (userProps) {
      for (const key in userProps) {
        const value = userProps[key];
        if (key in propsOptions) {
          props[key] = value;
        } else {
          attrs[key] = value;
        }
      }
    }
    if (instance.vnode.shapeFlag & 2 /* FUNCTIONAL_COMPONENT */) {
      instance.props = attrs;
    } else {
      instance.attrs = attrs;
      instance.props = reactive(props);
    }
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
    const mountChildren = (children, container, parentComponent) => {
      for (let index = 0; index < children.length; index++) {
        let child = normalise(children, index);
        patch(null, child, container, null, parentComponent);
      }
    };
    const mountElement = (vnode, container, anchor, parentComponent) => {
      console.log(vnode, "vnode");
      let { type, props, children, shapeFlag, transition } = vnode;
      let el = vnode.el = hostCreateElement(type);
      if (props) {
        for (const key in props) {
          hostPatchProps(el, key, null, props[key]);
        }
      }
      if (8 /* TEXT_CHILDREN */ & shapeFlag) {
        hostSetElementText(el, children);
      } else if (16 /* ARRAY_CHILDREN */ & shapeFlag) {
        mountChildren(children, el, parentComponent);
      }
      if (transition) {
        transition.beforeEnter(el);
      }
      hostInsert(el, container, anchor);
      if (transition) {
        transition.enter(el);
      }
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
    const unmountChildren = (oldChildren, parentComponent) => {
      for (let index = 0; index < oldChildren.length; index++) {
        const elementVnode = oldChildren[index];
        unmount(elementVnode, parentComponent);
      }
    };
    const patchKeydChildren = (oldChildren, newChildren, el, parentComponent) => {
      let i = 0;
      let oldChildrenLength = oldChildren.length - 1;
      let newChildrenLength = newChildren.length - 1;
      while (i <= oldChildrenLength && i <= newChildrenLength) {
        const oldChildrenItem = oldChildren[i];
        const newChildrenItem = newChildren[i];
        if (isSameVnode(oldChildrenItem, newChildrenItem)) {
          patch(oldChildrenItem, newChildrenItem, el, null, parentComponent);
        } else {
          break;
        }
        i++;
      }
      while (i <= oldChildrenLength && i <= newChildrenLength) {
        const oldChildrenItem = oldChildren[oldChildrenLength];
        const newChildrenItem = newChildren[newChildrenLength];
        if (isSameVnode(oldChildrenItem, newChildrenItem)) {
          patch(oldChildrenItem, newChildrenItem, el, null, parentComponent);
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
            patch(null, newChildren[i], el, anchor, parentComponent);
            i++;
          }
        }
      } else if (i > newChildrenLength) {
        if (i <= oldChildrenLength) {
          while (i <= oldChildrenLength) {
            unmount(oldChildren[i], parentComponent);
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
          unmount(oldElement, parentComponent);
        } else {
          newIndexToOldIndexMap[newIdx - s2] = index + 1;
          patch(oldElement, newChildren[newIdx], el, null, parentComponent);
        }
      }
      console.log(newIndexToOldIndexMap);
      for (let index = tobePatched - 1; index >= 0; index--) {
        const idx = s2 + tobePatched - 1;
        let current = newChildren[idx];
        let anchor = idx + 1 < newChildren.length ? newChildren[idx + 1].el : null;
        if (newIndexToOldIndexMap[index] === 0) {
          patch(null, current, el, anchor, parentComponent);
        } else {
          hostInsert(current.el, el, anchor);
        }
      }
    };
    const patchChildren = (oldValue, newVnode, el, parentComponent) => {
      const oldChildren = oldValue && oldValue.children;
      const newChildren = newVnode && newVnode.children;
      const prevFlag = oldValue.shapeFlag;
      const shapeFlag = newVnode.shapeFlag;
      if (shapeFlag & 8 /* TEXT_CHILDREN */) {
        if (prevFlag & 16 /* ARRAY_CHILDREN */) {
          unmountChildren(oldChildren, parentComponent);
        }
        if (oldChildren !== newChildren) {
          hostSetElementText(el, newChildren);
        }
      } else {
        if (prevFlag & 16 /* ARRAY_CHILDREN */) {
          if (shapeFlag & 16 /* ARRAY_CHILDREN */) {
            debugger;
            patchKeydChildren(oldChildren, newChildren, el, parentComponent);
          } else {
            unmountChildren(oldChildren, parentComponent);
          }
        } else {
          if (prevFlag & 8 /* TEXT_CHILDREN */) {
            hostSetElementText(el, "");
          }
          if (shapeFlag & 16 /* ARRAY_CHILDREN */) {
            mountChildren(newVnode, el, parentComponent);
          }
        }
      }
    };
    const patchElement = (oldValue, newVnode, container, parentComponent) => {
      debugger;
      let el = newVnode.el = oldValue.el;
      let oldProps = oldValue.props;
      let newProps = newVnode.props;
      if (newVnode.patchFlag) {
        if (newVnode.patchFlag && 1 /* TEXT */) {
          if (oldValue.children !== newVnode.children) {
            hostSetElementText(el, newVnode.children);
          }
        }
      } else {
        patchProps(oldProps, newProps, el);
      }
      if (newVnode.dynamicChildren) {
        pathchBlockChildren(oldValue, newVnode, container, parentComponent);
      } else {
        patchChildren(oldValue, newVnode, el, parentComponent);
      }
    };
    const pathchBlockChildren = (oldValue, newVnode, container, parentComponent) => {
      for (let index = 0; index < newVnode.dynamicChildren.length; index++) {
        patchElement(oldValue.dynamicChildren[index], newVnode.dynamicChildren[index], container, parentComponent);
      }
    };
    const processFragment = (oldValue, newVnode, container, parentComponent) => {
      if (oldValue == null) {
        mountChildren(newVnode.children, container, parentComponent);
      } else {
        patchKeydChildren(oldValue.children, newVnode.children, container, parentComponent);
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
    const processElement = (oldValue, newVnode, container, anchor, parentComponent) => {
      if (oldValue == null) {
        mountElement(newVnode, container, anchor, parentComponent);
      } else {
        patchElement(oldValue, newVnode, container, parentComponent);
      }
    };
    const processComponent = (oldValue, newVnode, container, anchor, parentComponent) => {
      if (oldValue == null) {
        mountComponent(newVnode, container, anchor, parentComponent);
      } else {
        updateComponent(oldValue, newVnode, container, anchor, parentComponent);
      }
    };
    const updateProps = (instance, nextProps) => {
      let prevProps = instance.props;
      for (const key in nextProps) {
        prevProps[key] = nextProps[key];
      }
      for (const key in prevProps) {
        if (!(key in nextProps)) {
          delete prevProps[key];
        }
      }
    };
    const updatePreRender = (instance, next) => {
      instance.next = null;
      instance.vnode = next;
      updateProps(instance, next.props);
      Object.assign(instance.slots, next.children);
    };
    const setupRenderEffect = (instance, container, anchor) => {
      const componentUpdate = () => {
        debugger;
        if (instance.isMounted) {
          const prevSubTree = instance.subTree;
          if (instance.next) {
            updatePreRender(instance, instance.next);
          }
          let { bu, u } = instance;
          invokeArrayFn(bu);
          let nextSubTree;
          if (instance.shapeFlag & 2 /* FUNCTIONAL_COMPONENT */) {
            nextSubTree = instance.type(instance.props, { slots: instance.slots });
          } else {
            nextSubTree = instance.render.call(instance.proxy, { slots: instance.slots });
          }
          instance.subTree = nextSubTree;
          patch(prevSubTree, nextSubTree, container, anchor, instance);
          invokeArrayFn(u);
        } else {
          let { bm, m, vnode } = instance;
          invokeArrayFn(bm);
          let subTree;
          if (vnode.shapeFlag & 2 /* FUNCTIONAL_COMPONENT */) {
            subTree = vnode.type(instance.props, { slots: instance.slots });
          } else {
            subTree = instance.render.call(instance.proxy, { slots: instance.slots });
          }
          patch(null, subTree, container, anchor, instance);
          instance.subTree = subTree;
          instance.isMounted = true;
          invokeArrayFn(m);
        }
      };
      const effect2 = new ReactiveEffect(componentUpdate, () => {
        debugger;
        queueJobs(instance.update);
      });
      const update = instance.update = effect2.run.bind(effect2);
      update();
    };
    const mountComponent = (initialVnode, container, anchor, parentComponent) => {
      const instance = createComponentInstance(initialVnode, parentComponent);
      setupComponent(instance);
      setupRenderEffect(instance, container, anchor);
    };
    const updateComponent = (oldVnode, newVnode, container, anchor, parentComponent) => {
      const instance = newVnode.component = oldVnode.component;
      if (shouldComponentUpdate(oldVnode, newVnode)) {
        instance.next = newVnode;
        instance.update();
      }
    };
    const shouldComponentUpdate = (oldVnode, newVnode) => {
      const oldProps = oldVnode.props;
      const newProps = newVnode.props;
      if (oldProps === newProps)
        return false;
      if (oldVnode.children || newVnode.children)
        return true;
      return hasChanged(oldProps, newProps);
    };
    const hasChanged = (oldProps, newProps) => {
      let oldKeys = Object.keys(oldProps);
      let newKeys = Object.keys(newProps);
      if (oldKeys.length !== newKeys.length) {
        return true;
      }
      for (let index = 0; index < newKeys.length; index++) {
        const key = newKeys[index];
        if (newProps[key] !== oldProps[key]) {
          return true;
        }
      }
      return false;
    };
    const patch = (oldValue, newVnode, container, anchor = null, parentComponent = null) => {
      if (oldValue === newVnode)
        return;
      if (oldValue && !isSameVnode(oldValue, newVnode)) {
        unmount(oldValue, parentComponent);
        oldValue = null;
      }
      const { type, shapeFlag } = newVnode;
      switch (type) {
        case TEXT:
          processText(oldValue, newVnode, container);
          break;
        case FRAGEMENT:
          processFragment(oldValue, newVnode, container, parentComponent);
          break;
        default:
          if (shapeFlag & 1 /* ELEMENT */) {
            processElement(oldValue, newVnode, container, anchor, parentComponent);
          } else if (shapeFlag & 6 /* COMPONENT */) {
            processComponent(oldValue, newVnode, container, anchor, parentComponent);
          } else if (shapeFlag & 64 /* TELEPORT */) {
            type.process(oldValue, newVnode, container, anchor, {
              mountChildren,
              patchChildren,
              move(vnode, el, anchor2) {
                hostInsert(vnode.component ? vnode.component.subTree.el : vnode.el, el, anchor2);
              }
            });
          }
      }
    };
    const unmount = (vnode, parentComponent = null) => {
      const { shapeFlag, type, children } = vnode;
      if (type === FRAGEMENT) {
        return unmountChildren(children, parentComponent);
      }
      if (shapeFlag & 64 /* TELEPORT */) {
        type.remove(vnode);
        return;
      }
      if (shapeFlag & 6 /* COMPONENT */) {
        let { bum, um } = vnode.component;
        invokeArrayFn(bum);
        unmount(vnode.component.subTree, parentComponent);
        invokeArrayFn(um);
        return;
      }
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

  // packages/runtime-core/src/apiLifecycle.ts
  var LicycleHooks = /* @__PURE__ */ ((LicycleHooks2) => {
    LicycleHooks2["BEFORE_MOUNT"] = "bm";
    LicycleHooks2["MOUNTED"] = "m";
    LicycleHooks2["BEFORE_UPDATE"] = "bu";
    LicycleHooks2["UPDATED"] = "u";
    LicycleHooks2["BEFORE_UNMOUNT"] = "bum";
    LicycleHooks2["UNMOUNTED"] = "um";
    return LicycleHooks2;
  })(LicycleHooks || {});
  var createHook = (type) => {
    return (hookCb, i = currentInstancce) => {
      if (currentInstancce) {
        const hooks = currentInstancce[type] || (currentInstancce[type] = []);
        hooks.push(() => {
          setCurrentInstance(i);
          hookCb();
          setCurrentInstance(null);
        });
      }
    };
  };
  var onBeforeMount = createHook("bm" /* BEFORE_MOUNT */);
  var onMounted = createHook("m" /* MOUNTED */);
  var onBeforeUpdate = createHook("bu" /* BEFORE_UPDATE */);
  var onUpdated = createHook("u" /* UPDATED */);
  var onBeforeUnmount = createHook("bum" /* BEFORE_UNMOUNT */);
  var onUnmounted = createHook("um" /* UNMOUNTED */);

  // packages/runtime-core/src/apiInject.ts
  var provide = (key, value) => {
    const instance = getCurrentInstance();
    if (!instance)
      return;
    let parentProviders = instance.parent && instance.parent.providers;
    if (parentProviders === instance.providers) {
      instance.providers = Object.create(parentProviders);
    }
    instance.providers[key] = value;
  };
  var inject = (key, defaultValue) => {
    const instance = getCurrentInstance();
    if (!instance)
      return;
    const providers = instance.parent.providers;
    if (providers && key in providers) {
      return providers[key];
    } else {
      return defaultValue;
    }
  };

  // packages/runtime-core/src/transition.ts
  function Transition(props, { slots }) {
    return h(BaseTransition, resoleveTransitionProps(props), slots);
  }
  var resoleveTransitionHooks = (props) => {
    const { onBeforeEnter, onEnter, onLeave } = props;
    return {
      beforeEnter(el) {
        onBeforeEnter(el);
      },
      enter(el, done) {
        onEnter(el, done);
      },
      leave(el, done) {
        onLeave(el, done);
      }
    };
  };
  var BaseTransition = {
    props: { "onBeforeEnter": Function, "onEnter": Function, "onLeave": Function },
    setup(props, { slots }) {
      return () => {
        const innerChild = slots.default && slots.default();
        const enterHooks = resoleveTransitionHooks(props);
        innerChild.transition = enterHooks;
        return innerChild;
      };
    }
  };
  var resoleveTransitionProps = (props) => {
    const {
      name = "v",
      enterFromClass = `${name}-enter-from`,
      enterActiveClass = `${name}-enter-active`,
      enterToClass = `${name}-enter-to`,
      leaveFromClass = `${name}-leave-from`,
      leaveActiveClass = `${name}-leave-active`,
      leaveToClass = `${name}-leave-to`,
      onBeforeEnter,
      onEnter,
      onLeave
    } = props;
    return {
      onBeforeEnter(el) {
        onBeforeEnter && onBeforeEnter(el);
        el.classList.add(enterFromClass);
        el.classList.add(enterActiveClass);
      },
      onEnter(el, done) {
        const resolve = () => {
          el.classList.remove(enterActiveClass);
          el.classList.remove(enterToClass);
          done && done();
        };
        nextFrame(() => {
          el.classList.remove(enterFromClass);
          el.classList.add(enterToClass);
          if (!onEnter || onEnter.length <= 1) {
            el.addEventListener("transitionend", resolve);
          }
        });
        onEnter && onEnter(el, resolve);
      },
      onLeave(el, done) {
        const resolve = () => {
          el.classList.remove(leaveToClass);
          el.classList.remove(leaveActiveClass);
          done && done();
        };
        el.classList.add(leaveFromClass);
        document.body.offsetWidth;
        el.classList.add(leaveActiveClass);
        nextFrame(() => {
          el.classList.remove(leaveFromClass);
          el.classList.add(leaveToClass);
          if (!onEnter || onEnter.length <= 1) {
            el.addEventListener("transitionend", resolve);
          }
        });
        onLeave && onLeave(el, done);
      }
    };
  };
  var nextFrame = (cb) => {
    requestAnimationFrame(() => {
      requestAnimationFrame(cb);
    });
  };

  // packages/runtime-core/src/defineAsyncComponent.ts
  var defineAsyncComponent = (promiseLoaderOrOptions) => {
    return {
      setup() {
        let LoadingCom;
        const loading = ref(false);
        let errorTimeout;
        let ErrorCom;
        const error = ref(false);
        const loaded = ref(false);
        let InnerComp;
        if (isFunction(promiseLoaderOrOptions)) {
          promiseLoaderOrOptions().then((comP) => {
            loaded.value = true;
            InnerComp = comP;
          });
        } else {
          const { loader, loadingComponent, delay, timeout, errorComponent, onError } = promiseLoaderOrOptions;
          LoadingCom = loadingComponent;
          ErrorCom = errorComponent;
          if (delay) {
            const timer = setTimeout(() => {
              loading.value = true;
            }, delay);
          } else {
            loading.value = true;
          }
          if (timeout) {
            errorTimeout = setTimeout(() => {
              error.value = true;
            }, timeout);
          }
          const load = () => {
            return loader().catch((err) => {
              if (onError) {
                return new Promise((r, j) => {
                  const retry = () => {
                    r(load());
                  };
                  const fail = () => {
                    j(err);
                  };
                  onError(err, retry, fail, attemps++);
                });
              } else {
                throw new Error("error");
              }
            }).then((comP) => {
              loaded.value = true;
              error.value = false;
              InnerComp = comP;
            });
          };
          let attemps = 0;
          load().catch(() => {
            error.value = true;
          }).finally(() => {
            loading.value = false;
          });
        }
        return () => {
          console.log("defineAsyncComponent--defineAsyncComponent");
          if (error.value) {
            return h(ErrorCom, {});
          } else if (loaded.value) {
            return h(InnerComp, {});
          } else if (loading.value) {
            return h(LoadingCom, {});
          } else {
            return h(FRAGEMENT, []);
          }
        };
      }
    };
  };
  return __toCommonJS(src_exports);
})();
//# sourceMappingURL=runtime-core.global.js.map
