/**
 * https://segmentfault.com/a/1190000016949129 (wasm 入门)
 * 
 * 十六进制的Binary Code就是WebAssembly。
 * WebAssembly不是用来给各位用手一行一行撸的代码，WebAssembly是一个编译目标
 * 什么是编译目标？当我们写TypeScript的时候，Webpack最后打包生成的JavaScript文件就是编译目标
 * Binary就是左侧的C++代码经过编译器编译之后的结果。
 * 
 * 
 * 
 * WebAssembly是经过编译器编译之后的代码，体积小、起步快。在语法上完全脱离JavaScript，同时具有沙盒化的执行环境。
 * WebAssembly同样的强制静态类型，是C/C++/Rust的编译目标。
 */


/**
 * https://juejin.cn/post/6844903491740123143  (了解 V8 的字节码)
 * 
 * 我们的JavaScript代码在引擎中会经历什么。
 * 
 * JavaScript文件会被下载下来。
 * 然后进入Parser(解析器)，Parser(解析器)会把代码转化成AST（抽象语法树）.
 * 然后根据抽象语法树，Bytecode Compiler字节码编译器会生成引擎能够直接阅读、执行的字节码 (解释器 Ignition 根据语法树生成字节码)
 * 字节码进入翻译器，将字节码一行一行的翻译成效率十分高的Machine Code.(TurboFan 是 V8 的优化编译器，TurboFan 将字节码生成优化的机器代码)
 * 
 * 
 * 
 * 字节码是机器代码的抽象。如果字节码采用和物理 CPU 相同的计算模型进行设计，则将字节码编译为机器代码更容易。
 * 这就是为什么解释器（interpreter）常常是寄存器或堆栈。 Ignition 是具有累加器的寄存器。
 * V8 的编译器是惰性的，如果一个函数没有运行，V8 将不会解释它
 */

// 在项目运行的过程中，引擎会对执行次数较多的function记性优化，引擎将其代码编译成Machine Code后打包送到顶部的Just-In-Time(JIT) Compiler，
// 下次再执行这个function，就会直接执行编译好的Machine Code。但是由于JavaScript的动态变量，上一秒可能是Array，下一秒就变成了Object。那么上一次引擎所做的优化，就失去了作用，此时又要再一次进行优化。


// 无论asm.js对静态类型的问题做的再好，它始终逃不过要经过Parser，要经过ByteCode Compiler，
// 而这两步是JavaScript代码在引擎执行过程当中消耗时间最多的两步。
// 而WebAssembly不用经过这两步。这就是WebAssembly比asm.js更快的原因。






/**
 * AssemblyScript。支持直接将TypeScript编译成WebAssembly。这对于很多前端同学来说，入门的门槛还是很低的。
 * 
 * Emscripten。可以说是WebAssembly的灵魂工具不为过，上面说了很多编译，这个就是那个编译器。将其他的高级语言，编译成WebAssembly。
 * 
 * WABT。是个将WebAssembly在字节码和文本格式相互转换的一个工具，方便开发者去理解这个wasm到底是在做什么事。
 */

