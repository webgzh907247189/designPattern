// https://astexplorer.net/


// babel 是一个转译器，暴露了很多 api，用这些 api 可以完成代码到 AST 的 parse，AST 的转换，以及目标代码的生成。

// 一般编译器 Compiler 是指高级语言到低级语言的转换工具，对于高级语言到高级语言的转换工具，被叫做转换编译器，简称转译器 (Transpiler)。
// babel 就是一个 Javascript Transpiler。



// parse 阶段的目的是把源码字符串转换成机器能够理解的 AST，这个过程分为词法分析、语法分析。




// AST 也是有标准的，JS parser 的 AST 大多是 estree 标准，从 SpiderMonkey 的 AST 标准扩展而来。



/**
 * Literal 字面量的意思
 * Literal 是字面量的意思，比如 let name = 'guang'中，'guang'就是一个字符串字面量 StringLiteral，
 * 
 * 
 * 
 * Identifier 标识符的意思
 * Identifer 是标识符的意思，变量名、属性名、参数名等各种声明和引用的名字，都是Identifer
 * const **obj** = {**name**: 'guang'}  加**的是 Identifier
 * 
 * 
 * 
 * Statement  语句
 * statement 是语句，它是可以独立执行的单位，比如 break、continue、debugger、return 或者 if 语句、while 语句、for 语句，还有声明语句，表达式语句等。我们写的每一条可以独立执行的代码都是语句。
 *                  break;          continue;           return;             debugger;              throw Error();
 * 对应 的 ast节点 是 BreakStatement  ContinueStatement   ReturnStatement     DebuggerStatement      ThrowStatement
 * 
 * 
 * 
 * Declaration 声明
 * 声明语句是一种特殊的语句，它执行的逻辑是在作用域内声明一个变量、函数、class、import、export 等。
 * const a = 1              VariableDeclaration
 * function b(){}           FunctionDeclaration
 * class C{}                ClassDeclaration
 * import d from 'd'        ImportDeclaration
 * export default e= '1'    ExportDefaultDeclaration\
 * export {e}               ExportNameDeclaration
 * export * from 'e'        ExportAllDeclaration
 * 
 * 
 * 
 * Expression
 * expression 是表达式，特点是执行完以后有返回值，这是和语句 (statement) 的区别。
 * [1,2,3]                  ArrayExpression 数组表达式
 * a = 1                    AssignmentExpression 赋值表达式
 * 1 + 2;                   BinaryExpression  二元表达式
 * -1;                      UnaryExpression 一元表达式
 * function(){};            FunctionExpression 函数表达式
 * () => {};                ArrowFunctionExpression 箭头函数表达式
 * class{};                 ClassExpression  class表达式
 * a;                       Identifier  标示符
 * this;                    ThisExpression  this表达式
 * super;                   Super  super
 * a::b;                    BindExpression  绑定表达式
 * 
 * 
 * 
 * class 的语法也有专门的 AST 节点来表示。
 * es module 是语法级别的模块规范，所以也有专门的 AST 节点。
 * 
 * 
 * 
 * import
 * import {c, d} from 'c';      ImportSpicifier 
 * import a from 'a';           ImportDefaultSpecifier
 * import * as b from 'b';      ImportNamespaceSpcifier
 * 这 3 种语法都对应 ImportDeclaration 节点，但是 specifiers 属性不同，分别对应 ImportSpicifier、ImportDefaultSpecifier、ImportNamespaceSpcifier。
 * 
 * 
 * export
 * export { b, d};              ExportNamedDeclaration
 * export default a;            ExportDefaultDeclaration
 * export * from 'c';           ExportAllDeclaration
 * 
 * 
 * 
 * Program & Directive
 * program 是代表整个程序的节点，它有 body 属性代表程序体，存放 statement 数组，就是具体执行的语句的集合。
 * directives 属性，存放Directive 节点，比如"use strict" 这种指令会使用 Directive 节点表示。
 * 
 * 
 * 每种 AST 都有自己的属性，但是它们也有一些公共属性：
 * type： AST 节点的类型
 * start、end、loc：start 和 end 代表该节点对应的源码字符串的开始和结束下标，不区分行列。而 loc 属性是一个对象，有 line 和 column 属性分别记录开始和结束行列号。
 * leadingComments、innerComments、trailingComments： 表示开始的注释、中间的注释、结尾的注释，因为每个 AST 节点中都可能存在注释，而且可能在开始、中间、结束这三种位置，通过这三个属性来记录和 Comment 的关联。
 * extra：记录一些额外的信息，用于处理一些特殊情况。比如 StringLiteral 修改 value 只是值的修改，而修改 extra.raw 则可以连同单双引号一起修改。
 */



/**
 * @babel/core 是babel编译器的核心
 * babel parser(babylon babel的解析器) 也是基于 acorn， 是 babel使用的js编译器
 * @babel/types 用于创建、判断 AST 节点，提供了 xxx、isXxx、assertXxx 的 api (lodash 工具库)
 * @babel/traverse 通过 visitor 函数对遍历到的 ast 进行处理，分为 enter 和 exit 两个阶段，具体操作 AST 使用 path 的 api，还可以通过 state 来在遍历过程中传递一些数据
 * @babel/generator 打印 AST 成目标代码字符串，支持 comments、minified、sourceMaps 等选项。
 * 
 * 
 * 
 * parse 阶段有@babel/parser，功能是把源码转成 AST      词法分析(分词, token)   语法分析(得到ast)
 * transform 阶段有 @babel/traverse，可以遍历 AST，并调用 visitor 函数修改 AST，修改 AST 自然涉及到 AST 的判断、创建、修改等，这时候就需要 @babel/types 了，
 * 当需要批量创建 AST 的时候可以使用 @babel/template 来简化 AST 创建逻辑。
 * 
 * generate 阶段会把 AST 打印为目标代码字符串，同时生成 sourcemap，需要 @babel/generate 包
 * 中途遇到错误想打印代码位置的时候，使用 @babel/code-frame 包
 * babel 的整体功能通过 @babel/core 提供，基于上面的包完成 babel 整体的编译流程，并实现插件功能。
 */


// **********  遍历的时候只会遍历有 type 属性的节点  **********
// path 是一个对象，表示两个节点的连接
// path.node 指向当前 AST 节点