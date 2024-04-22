var VueReactivity = (() => {
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

  // packages/reactivity/src/index.ts
  var src_exports = {};
  __export(src_exports, {
    ReactiveEffect: () => ReactiveEffect,
    activeEffect: () => activeEffect,
    activeEffectScope: () => activeEffectScope,
    computed: () => computed,
    effect: () => effect,
    effectScope: () => effectScope,
    isReactive: () => isReactive,
    proxyRefs: () => proxyRefs,
    reactive: () => reactive,
    recordEffectScope: () => recordEffectScope,
    ref: () => ref,
    toRef: () => toRef,
    toRefs: () => toRefs,
    track: () => track,
    trackEffect: () => trackEffect,
    trigger: () => trigger,
    triggerEffect: () => triggerEffect,
    watch: () => watch,
    watchEffect: () => watchEffect
  });

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
    debugger;
    const { deps } = effect2;
    deps.forEach((item) => {
      item.delete(effect2);
    });
    effect2.deps.length = 0;
  };
  var ReactiveEffect = class {
    constructor(fn, scheduler) {
      this.fn = fn;
      this.scheduler = scheduler;
      this.deps = [];
      this.parent = null;
      this.active = true;
      recordEffectScope(this);
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
    debugger;
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
    debugger;
    const depsMap = targetMap.get(target);
    if (!depsMap) {
      return;
    }
    let effects = depsMap.get(key);
    if (effects) {
      triggerEffect(effects);
    }
  };

  // packages/shared/src/index.ts
  var isObject = (value) => {
    return typeof value === "object" && value !== null;
  };
  var isFunction = (value) => {
    return typeof value === "function";
  };
  var isArray = Array.isArray;

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
    const proxy = new Proxy(target, baseHandler);
    reactiveMap.set(target, proxy);
    return proxy;
  };

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
  return __toCommonJS(src_exports);
})();
//# sourceMappingURL=reactivity.global.js.map
