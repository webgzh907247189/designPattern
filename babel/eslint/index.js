// eslint 底层用的 espree

// esprima 经典的解析器
// acorn 基于 esprima 二次开发的
// @babel/parser 内部使用 babylon，基于 acorn 开发的
// espree 最初从 esprima fork 出来的，现在基于 acorn

// 编译器 基本上就 2种 (esprima, acorn)



// 创建 eslint 配置文件  ---->   npm init @eslint/config



// eslint 插件2个核心属性 create、meta



// eslint 在 yoman 提供了一个脚手架 
// npm i yo generator-eslint -g

// 生成一个 eslint 插件模板 --> yo eslint:plugin (需要添加自定义 rule， 有了自定义规则， 可以通过 extends 来 继承)
// 生成 eslint rule yo eslint:rule

// eslint 的 extends = plugin + rule