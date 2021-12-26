vue3.0 虽然已经出了，但是vue2.7版本还会加进来,继续使用还是有必要深入聊一下。vuex 饶峰同学认领了，使用和深入理解源码，vue-router 哪位自告奋勇认领下


1. computed 本质上就是 Watcher 类的实列， vue 里面 有三种 Watcher 类的实列 (render watcher, computed Watcher, user watcher);

大家有时候用的 $forceUpdate, 本质上就是让当前组件  render watcher 重新渲染(vm._watcher.update(), vm._watcher 就是 render watch)


依靠 stack 这个数组 存储 watcher实列

初始化的时候 因为先执行 initComputed，所以先对 每个 computed key 进行 new wacther 实列化， 重点 ***但是没有执行 Watcher里面的get，所以没有 push 到 stack 这个数组***
user watcher 不太一样， 初始化的时候 执行了 initWatch，同时也对 每个 watcher key 进行 new wacther 实列化，但是，user watcher 一旦 实列化之后，会立马走 get，会把 user watcher push 到 stack，之后在删除


因为在页面或者组件里面 取值，触发了 computed 定义的 key 的 get属性，自动触发了  watch.evaluate(), 在其里面执行了 wacther.get(), 此时执行 用户自定义的 computed Fn，并且把 computed wacther 放入到了stack数组里面
在这个过程中，会缓存 computed wacther 这个实列，挂到当前组件的(vm._watchersComputed 这个对象下面， 在createComputedGetter 方法里面取值)。
下次取值，如果 computed wacther 这个实列存在 并且 dirty 为 false，直接返回 这个 computed wacther 实列的value，这就是computed 的缓存(缓存的是 computed watcher)


Q&A
1. vue里面有几种 wacther 实列
// 有三种 Watcher 类的实列 (render watcher, computed Watcher, user watcher);
2. 为什么vue2 版本，要采用组件级 更新策略, 继续像 vue1 那样每个属性都 new wactehr 一次有什么问题？
3. computed watcher 缓存的是什么？ 怎么缓存的？
4. computed watcher 与 this.$watcher 的区别是什么？
5. 为什么在 computed watcher 执行 get的时候，在 stack 数组里面，第一项一定是 render wacther？
// 因为在render 过程中去 触发了 computed wactcher 的 get 属性，此时 stack push 了 render watcher
6. 如果有多个 computed watcher， stack数组里面会是什么样子？ stack里面 会出现 多个 computed watcher？
// 
7. 为什么要在 computed wacther 依赖的 dep 中把 render watcher 也追加进来，也就是转移 deps 那些操作？
// 在 computed fn 使用到的 data 中的 key 本质上每个key 都会有一个dep，这个dep 一开始只是收集了 computed watcher 这个 watcher，没有追加 render watcher进来，
// 这个转移本质上是吧 render watcher 追加进来， 让这个 data 中的 key 有 2个watcher [computed watcher, render watcher]。 computed watcher 只是负责 变更 computed 相关事件(计算 computed)， 
// render watcehr 负责渲染 || 重新渲染 (从render 函数中拿到 模板使用的 变量，然后展示)

8. 什么时候把 dirty 改为 true
// 在更新的时候进行变更，在 Object.defineProperty 的set 里面 进行  dep.notify()，能够 精准的找到 哪一个 data 对应的 key 的dep 依赖的 watcher 进行更新。
// 如果此时有一个 data的 key 对应 存在 computed wacther 里面，会更新当前的这个 computed watcher，把当前的 computed watcher 的 dirty 变更为 true，(因为 computed 里面使用到了这个 data 到key)
// 后面执行render watcher 的update，进入 nextTick 阶段

9. stack里面 会出现 多个 computed watcher? (vue 为了方便自己，每个组件在 都有  vm._watchers， 这个记录每个组件有多少个 watcher)
// 会，因为 stack 第一个元素肯定是render watcher，后面接着是 computed watcher

// 多个computed 并且有依赖， 依赖间的 computed wactehr 靠 依赖的 data 的key ，其实就是 dep 来维系 watcher


10. this.$watcher 初始化执行一次， 初始化一定会执行一次？在computed的时候，stack里面为什么没有 它的 watcher？
// 初始化一定会执行一次。 因为执行computed的时候， user watcher 已经执行完毕了，执行完毕 已经 释放 user watcher了。

11.把自己的dep 转让给了 stack 这个数组 的下一个 watcher 
// 本质上还是 让当前使用到的 key 的 dep 记住 render watcher，不然下次这个 key 发生了变化，没有办法通知 render watcher 重新渲染， 如果不通知 render watcher的话，只是 computed 自己变更，没办法渲染到页面

12. watcher会销毁吗？什么时候销毁？
// 会， 1. 手动调用 unWacthfn。 2. $destroy 的时候。 



// dep会不会转让的越来越多，销毁组件， cleanupDeps？？

// 多组件渲染，stack堆积renderwatch ？？？ 结合 生命周期看


xx. 事件的 发布订阅问题?
// 使用 $on('hook:mounted', () => {}), 本质上 还是 mouted 事件
//  if (vm._hasHookEvent) { vm.$emit('hook:' + hook); } 
// 先执行 mouted 方法逻辑，在走这个 发布订阅的 hook: xxx



渲染过程:
先执行 initComputed initWacth 这些逻辑，后面进行 template 的编译(***可选操作***)，最终拿到的是render 函数(webpack 编译之后的直接就是 render 函数)
把 这个 render 函数挂到当前组件的对象里面去(vm.$options.render)，这个 key 就是 render。 所以我们可以写 jsx， jsx 就是渲染的组件的key 是 render (这个阶段还在render函数阶段) 
在 render 过程中， 会尝试把写的那些 render 函数里面的变量回去一个一个的取值，过程中涉及 computed 的，直接通过之前的 computed的key 的 get 进行取值


上面渲染的过程， render watcher 还处在渲染中（因为在render 过程中去 触发了 computed wactcher 的 get 属性，此时 stack push 了 render watcher），
所以这个时候的 stack 一定保存了 render watcher (因为还处在 render watcher 的函数调用栈里面，因为 此时的 getter 就是 updateCom 这个函数)
后续对 computed的 key进行取值，会把 computed watcher 推入 stack，在完成 evaluate 之后，已经 从 stack里面 移除了 computed Wacther
此时  stack 里面只有 render watcher，没有 用户自定义的 wacther(用户自定义的在new wacther的时候立马调用，调用完成之后删除 user Watcher)



这句代码的含义
if(Dep.target){
    // watcher 代表 计算属性 watcher
    watcher.depend()
}
开始转移 computed watcher 的 deps  给 render Wacther
目的：把当前 stack里面剩下的 render wacther 添加到当前 computed watcher 的依赖(key)里面去，因为求完值， stack 里面就只有 render wacther了，只有这样，当这个 computed watcher 的依赖的 key 发生了变化，会重新渲染(render watcher的作用)

上面目的 为了拿到 render 函数的那些变量的值，拿到之后，生成 vnode， 这一步其实就是 vm_render()
vm_render() 返回的 vnode 给了 render wacther 的 vm._update 接收了



3. computed 传参(返回函数的computed)
Q&A
1. 为什么可以传参数，传了参数为什么在第二个函数，为什么还是可以运行？
// 在初始化 给 computed 的 每个 computed key 定义了 get 属性， 渲染阶段执行 watcher.evaluate() -> watcher.get() -> 此时 拿到的是第一层被return出去的  ->  给了 watcher的 get 返回值(watcher.value)
// 在模板渲染的时候触发了 computed watcher 的 get，此时拿到的值(get的返回值 watcher.value) -> 第一层被return出去的 fn， 所以， this.[computedkey] = 第一层被return出去的 fn, 此时传入参数才有意义 且能 接收
2. 这个时候缓存的watcher 是什么？
// 缓存的还是 当前这个 computed key 对应的 new watcher 实列,存贮的 value 其实是 computed fn 执行的 返回值





// 组件性能 init patch ？？
// frezz 结合 黄奕文章 ？？
// watcher 的 immetares
111. sameVnode 没有key 算sameVnode 吗？
// sameVnode 首先的判断条件就是 vnode.key 新需要相同，不然直接 return false


// 1. 事件
// 2. computed
// 3. v-ifv-for，
// 4. provider，inject结合v4.
// isstatic， keep-alive 这种静态组件？？？vue2 vue3的 tree shaking



// 看书vue compited 与 watch ？？
// vue有nextTick，react 有 batchUpdate ？？？
// vue-router


// babel和vue jsx v-model
// 黄毅写的vue优化文章
// 黄毅写的wacther 文章 ？？
// 数组的劫持？？？
// 扁平化数据测试






// 多维表格 记录任务
1. css公共
2. 启动慢
3. 食安险

1. sourcemap
2. 公共组件问题
3. visule list