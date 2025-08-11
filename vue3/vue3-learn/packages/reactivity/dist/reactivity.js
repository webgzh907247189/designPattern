// packages/shared/src/index.ts
var isObject = (val) => {
  return typeof val === "object" && val !== null;
};
var isFunction = (val) => {
  return typeof val === "function";
};

// packages/reactivity/src/effect.ts
var effect = (fn, options) => {
  const _effect = new ReactiveEffect(fn, () => {
    _effect.run();
  });
  _effect.run();
  if (options) {
    Object.assign(_effect, options);
  }
  const runner = _effect.run.bind(_effect);
  runner.effect = _effect;
  return runner;
};
var cleanEffect = (oldDep, effect2) => {
  oldDep.delete(effect2);
  if (oldDep.size === 0) {
    oldDep.cleanup();
  }
};
var postCleanEffect = (effect2) => {
  if (effect2.deps.length > effect2._depsLength) {
    for (let index = effect2._depsLength; index < effect2.deps.length; index++) {
      cleanEffect(effect2.deps[index], effect2);
    }
    effect2.deps.length = effect2._depsLength;
  }
};
var preCleanEffect = (effect2) => {
  effect2._depsLength = 0;
  effect2._trackId++;
};
var activeEffect;
var ReactiveEffect = class {
  // fn 用户编写的函数
  // 如果 fn 中依赖的数据发生变更，需要重新执行 _effect.run()
  constructor(fn, scheduler) {
    this.fn = fn;
    this.scheduler = scheduler;
    // 记录 当前的 effect 执行了 几次
    this._trackId = 0;
    this.deps = [];
    this._depsLength = 0;
    this._running = 0;
    this.active = true;
    // 默认脏值
    this._dirtyLevel = 4 /* DIRTY */;
  }
  get dirty() {
    return this._dirtyLevel === 4 /* DIRTY */;
  }
  set dirty(value) {
    this._dirtyLevel = value ? 4 /* DIRTY */ : 0 /* NODIRTY */;
  }
  run() {
    this._dirtyLevel = 0 /* NODIRTY */;
    debugger;
    if (!this.active) {
      return this.fn();
    }
    let parentEffect = activeEffect;
    try {
      activeEffect = this;
      preCleanEffect(this);
      this._running++;
      return this.fn();
    } finally {
      this._running--;
      postCleanEffect(this);
      activeEffect = parentEffect;
    }
  }
  stop() {
    if (this.active) {
      this.active = false;
      preCleanEffect(this);
      postCleanEffect(this);
    }
  }
};
var trackEffect = (effect2, dep) => {
  debugger;
  if (dep.get(effect2) !== effect2._trackId) {
    dep.set(effect2, effect2._trackId);
    const oldDep = effect2.deps[effect2._depsLength];
    if (oldDep !== dep) {
      if (oldDep) {
        cleanEffect(oldDep, effect2);
      }
      effect2.deps[effect2._depsLength++] = dep;
    } else {
      effect2._depsLength++;
    }
  }
};
var triggerEffects = (dep) => {
  for (const effect2 of dep.keys()) {
    if (effect2._dirtyLevel < 4 /* DIRTY */) {
      effect2._dirtyLevel = 4 /* DIRTY */;
    }
    if (!effect2._running) {
      if (effect2.scheduler) {
        effect2.scheduler();
      }
    }
  }
};

// packages/reactivity/src/reactiveEffect.ts
var createDep = (cleanup, key) => {
  const dep = /* @__PURE__ */ new Map();
  dep.cleanup = cleanup;
  dep.name = key;
  return dep;
};
var targetMap = /* @__PURE__ */ new WeakMap();
var track = (target, key) => {
  if (activeEffect) {
    let depsMap = targetMap.get(target);
    if (!depsMap) {
      targetMap.set(target, depsMap = /* @__PURE__ */ new Map());
    }
    let dep = depsMap.get(key);
    if (!dep) {
      depsMap.set(key, dep = createDep(() => depsMap.delete(key), key));
    }
    trackEffect(activeEffect, dep);
  }
};
var trigger = (target, key, value, oldValue) => {
  const depsMap = targetMap.get(target);
  if (!depsMap) {
    return;
  }
  let dep = depsMap.get(key);
  if (dep) {
    triggerEffects(dep);
  }
};

// packages/reactivity/src/baseHandler.ts
var mutableHandlers = {
  get(target, key, receiver) {
    if (key === "__v_isReactive" /* IS_REACTIVE */) {
      return true;
    }
    track(target, key);
    let res = Reflect.get(target, key, receiver);
    if (isObject(res)) {
      return reactive(res);
    }
    return res;
  },
  set(target, key, value, receiver) {
    const oldValue = target[key];
    let result = Reflect.set(target, key, value, receiver);
    if (oldValue != value) {
      trigger(target, key, value, oldValue);
    }
    return result;
  }
};

// packages/reactivity/src/reactive.ts
var reactiveMap = /* @__PURE__ */ new WeakMap();
var createReactiveObject = (target) => {
  if (!isObject(target)) {
    return target;
  }
  if (target["__v_isReactive" /* IS_REACTIVE */]) {
    return target;
  }
  const exitsProxy = reactiveMap.get(target);
  if (exitsProxy) {
    return exitsProxy;
  }
  let proxy = new Proxy(target, mutableHandlers);
  reactiveMap.set(target, proxy);
  return proxy;
};
var reactive = (target) => {
  return createReactiveObject(target);
};
var toReactive = (value) => {
  return isObject(value) ? reactive(value) : value;
};
var isReactive = (value) => {
  return !!(value && value["__v_isReactive" /* IS_REACTIVE */]);
};

// packages/reactivity/src/ref.ts
var ref = (value) => {
  return createRef(value);
};
var createRef = (value) => {
  return new RefImpl(value);
};
var RefImpl = class {
  constructor(rawValue) {
    this.rawValue = rawValue;
    // 增加 ref 标识
    this.__v_isRef = true;
    this._value = toReactive(this.rawValue);
  }
  get value() {
    trackRefValue(this);
    return this._value;
  }
  set value(newValue) {
    if (newValue !== this.rawValue) {
      this.rawValue = newValue;
      this._value = newValue;
      triggerRefValue(this);
    }
  }
};
var trackRefValue = (ref2) => {
  if (activeEffect) {
    trackEffect(activeEffect, ref2.dep = ref2.dep || createDep(() => ref2.dep = void 0, "undefined"));
  }
};
var triggerRefValue = (ref2) => {
  let dep = ref2.dep;
  if (dep) {
    triggerEffects(dep);
  }
};
var ObjectRefImpl = class {
  constructor(_obj, _key) {
    this._obj = _obj;
    this._key = _key;
    // 增加 ref 标识
    this.__v_isRef = true;
  }
  get value() {
    return this._obj[this._key];
  }
  set value(newValue) {
    this._obj[this._key] = newValue;
  }
};
var toRef = (obj, key) => {
  return new ObjectRefImpl(obj, key);
};
var toRefs = (obj) => {
  const res = {};
  for (const key in obj) {
    res[key] = new ObjectRefImpl(obj, key);
  }
  return res;
};
var proxyRefs = (objectWithRef) => {
  debugger;
  return new Proxy(objectWithRef, {
    get(target, key, receiver) {
      const r = Reflect.get(target, key, receiver);
      return r.__v_isRef ? r.value : r;
    },
    set(target, key, value) {
      const oldVal = target[key];
      if (oldVal.__v_isRef) {
        oldVal.value = value;
        return true;
      } else {
        return Reflect.set(target, key, value);
      }
    }
  });
};

// packages/reactivity/src/computed.ts
var ComputedImpl = class {
  constructor(getter, setter) {
    this.getter = getter;
    this.setter = setter;
    debugger;
    this.effect = new ReactiveEffect(() => getter(this._value), () => {
      triggerRefValue(this);
    });
  }
  get value() {
    if (this.effect.dirty) {
      this._value = this.effect.run();
      trackRefValue(this);
    }
    return this._value;
  }
  set value(newValue) {
    this.setter(newValue);
  }
};
var computed = (getterOrOptions) => {
  let onlyFn = isFunction(getterOrOptions);
  let getter;
  let setter;
  if (onlyFn) {
    getter = getterOrOptions;
    setter = () => {
      console.warn("computed is readonly");
    };
  } else {
    getter = getterOrOptions.get;
    setter = getterOrOptions.set;
  }
  return new ComputedImpl(getter, setter);
};

// packages/reactivity/src/apiWatch.ts
var watch = (source, cb, options) => {
  return doWatch(source, cb, options);
};
var watchEffect = (source, options) => {
  return doWatch(source, null, options);
};
var doWatch = (source, cb, { immediate, deep, flush }) => {
  const reactiveGetter = (source2) => traverse(source2, deep === false ? 1 : void 0);
  let clean;
  const onCleanUp = (fn) => {
    clean = () => {
      fn();
      clean = void 0;
    };
  };
  let oldVal;
  const job = () => {
    if (cb) {
      const newVal = effect2.run();
      if (clean) {
        clean();
      }
      cb(oldVal, newVal, onCleanUp);
      oldVal = newVal;
    } else {
      effect2.run();
    }
  };
  let getter;
  if (isReactive(source)) {
    getter = () => {
      reactiveGetter(source);
    };
  }
  const effect2 = new ReactiveEffect(getter, job);
  if (cb) {
    oldVal = effect2.run();
  } else {
    effect2.run();
  }
  const unwatch = () => {
    effect2.stop();
  };
  return unwatch;
};
var traverse = (source, depth, currentDepth = 0, seen = /* @__PURE__ */ new Set()) => {
  if (!isObject(source)) {
    return;
  }
  if (depth) {
    if (currentDepth >= depth) {
      return source;
    }
    currentDepth++;
  }
  if (seen.has(source)) {
    return source;
  }
  for (const key in source) {
    traverse(source[key], depth, currentDepth, seen);
  }
  return source;
};
export {
  ReactiveEffect,
  RefImpl,
  activeEffect,
  computed,
  createReactiveObject,
  createRef,
  effect,
  isReactive,
  proxyRefs,
  reactive,
  ref,
  toReactive,
  toRef,
  toRefs,
  trackEffect,
  trackRefValue,
  triggerEffects,
  triggerRefValue,
  watch,
  watchEffect
};
//# sourceMappingURL=reactivity.js.map
