webpack 本质上是一种事件流的机制，微内核处理，暴露很多接口给其他人使用

webpack 插件机制的大体方式是
1. 创建  webpack 在其内部对象上创建各种钩子
2. 注册  把插件的方法注册在对应的钩子上，交给webpack
3. 调用  webpack编译过程中，适时触发相应的钩子，因此也触发了插件的方法face


webpack 本质上是一种事件流的机制， 她的工作流程使 各个插件串联起来，实现这一核心就是依靠 Tapable
webpack 中最核心的 负责编译的 Compile 和 负责创建 bundle 的 Compilation 都是 Tapable 的 实列




bail。 遇到返回值 不为 undefined 的，就结束执行， 执行下一个 (返回非 undefined 就停止运行代码，进行下一个)
waterfail 类似于 compose， 上个函数返回值 被下个函数当参数来使用 (没有返回值向上查找，找到前一个函数的返回值)

loop 返回值不为 undefined ，重复执行  (返回值为 undefined，可以 return 出来)