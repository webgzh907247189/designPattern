import { ReactiveEffect, trackEffect, triggerEffect } from ".";
import { isFunction } from "@vue/shared";
export const computed = (getterOrOptions) => {
    debugger;
    let onlyGettter = isFunction(getterOrOptions);
    let getter;
    let setter;
    if (onlyGettter) {
        getter = getterOrOptions;
        setter = () => { console.warn('no set'); };
    }
    else {
        getter = getterOrOptions.get;
        setter = getterOrOptions.set;
    }
    return new ComputedRefImpl(getter, setter);
};
class ComputedRefImpl {
    constructor(getter, setter) {
        this.getter = getter;
        this.setter = setter;
        this._dirty = true; // 默认取值时候进行计算
        this._v_isReadOnly = true;
        this._v_isRef = true; // 这个属性代表需要使用 .value 来访问
        this.dep = new Set();
        this.effect = new ReactiveEffect(getter, () => {
            // 依赖的属性发生变化执行此调度函数 其实是  scheduler
            // 值不是脏, 更新
            if (!this._dirty) {
                this._dirty = true;
                // 触发更新
                triggerEffect(this.dep);
            }
        });
    }
    // 计算属性 创建完成不会 立即执行，当 触发 .value 才会执行
    // 类中的属性访问器， 编译出来是 Object.defineProperty
    get value() {
        // 依赖收集
        trackEffect(this.dep);
        // 避免多次取值 (第一次取值完毕之后， _dirty 为 false，再次取值进不来，直接返回值 因为_dirty 为 false)
        if (this._dirty) { // 值是脏的，需要重新运行
            this._value = this.effect.run(); // 调用 run 执行 getter 函数
            this._dirty = false; // 取完值，变成false， 值是干净的，不需要重新取值
        }
        return this._value;
    }
    set value(newVal) {
        this.setter(newVal);
    }
}
// 0. _dirty 规避了多次取值，反复运算的现象  get value() 里面
// 1. 初始化 computed 没有执行逻辑
// 2. 当取值 computed.value 时候 (在渲染 effect 里面), 触发了 get value()
// 3. 执行 trackEffect 此时 this.dep.add(activeEffect -> 渲染 effect) 相当于 computed.dep.add(activeEffect -> 渲染 effect)
// 4. 之后执行 computed.effect.run() 去 取值， 执行  computed 传入的 getter 函数。 此时 activeEffect -> computed effect
// 取值的过程中 name 属性 关联了 Set， Set 里面 activeEffect (computed effect)
// 5. state2.name = '123test' 给state2.name 赋值了新值， 触发了 new Proxy 的 set 的 trigger
// 6. 在targetMap 里面找到了 name 对应的 set 集合， 里面存贮了 name 的 effect (也就是 computed effect)
// 7. 触发 triggerEffect (name 对应 的 set 里面存的是 computed effect) 让 computed effect 执行他的 scheduler
// 8. 在 computed effect 的 scheduler 里面执行 triggerEffect (dep.effect 其实是渲染 effect 执行渲染) 关联步骤3
// this.dep 对应的是  computed.dep
// 9. 重新触发 渲染 effect取值 -> compued getter 执行
// 渲染 effect -> computed effect 的 dep 记录了 渲染 effect -> computed effect -> computed efect.scheduler() -> 渲染 effect.run()
// 取值的过程中 name 属性 关联了 Set， Set 里面 activeEffect (computed effect)
// state2.name = '123test' 给state2.name 赋值了新值， 触发了 new Proxy 的 set 的 trigger
// 执行 computed effect 的 scheduler()  之后触发  scheduler 里面执行 triggerEffect()
// 执行了 渲染effect.run() 重新执行 渲染逻辑
//# sourceMappingURL=computed.js.map