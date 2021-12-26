// 编译器工作流
// 1. parse -> ast   词法分析(分词, token)   语法分析(得到ast)
// 2. transform 转换成为新代码
// 3. generation 生成新的代码(并生成 sourcemap)



// 1. 第一步分词，转为token， 2. 把 token 转为 ast
const esprima = require('esprima');
const code = '<h1 id="title"><span>hello</span>world</h1>'

// parseScript parseModule 都可以
let ast = esprima.parseModule(code, { jsx: true, tokens: true }) // 不加 tokens 没有tokens打印
console.log(ast, 'ast');


// tokens: [
//     { type: 'Punctuator', value: '<' },
//     { type: 'JSXIdentifier', value: 'h1' },
//     { type: 'JSXIdentifier', value: 'id' },
//     { type: 'Punctuator', value: '=' },
//     { type: 'String', value: '"title"' },
//     { type: 'Punctuator', value: '>' },
//     { type: 'Punctuator', value: '<' },
//     { type: 'JSXIdentifier', value: 'span' },
//     { type: 'Punctuator', value: '>' },
//     { type: 'JSXText', value: 'hello' },
//     { type: 'Punctuator', value: '<' },
//     { type: 'Punctuator', value: '/' },
//     { type: 'JSXIdentifier', value: 'span' },
//     { type: 'Punctuator', value: '>' },
//     { type: 'JSXText', value: 'world' },
//     { type: 'Punctuator', value: '<' },
//     { type: 'Punctuator', value: '/' },
//     { type: 'JSXIdentifier', value: 'h1' },
//     { type: 'Punctuator', value: '>' }
//   ]








// 有限状态机
// 每一个状态都是一个机器，每个机器都可以接收输入和计算输出
// 机器本身没有状态，每一个机器会根据输入决定下一个状态

let NUMBERS = /[0-9]/
let tokens = [];
let currentToken;
function start(char){
    if(NUMBERS.test(char)){
        currentToken = { type: 'Numberic',value: '' }
    }

    return number(char)
}

function number(char){
    if(NUMBERS.test(char)){
        currentToken.value += char
    }else if(char === '+' || char === '-'){
        emit(currentToken)
        emit({ type: 'Punctuator',value: char })
    }
    return number
}
function tokenizer(input){
    let state = start;
    for (const iterator of input) {
        state = state(iterator)
    }
    emit(currentToken)
    return tokens
}
console.log(tokenizer('10+20'))

function emit(token){
    tokens.push(token)
    currentToken = { type: 'Numberic',value: '' };
}