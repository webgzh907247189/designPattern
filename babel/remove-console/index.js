const babelCore = require('@babel/core');
const removeConsole = require('./removeConsole.js');


let sourceCode1 = `let s = 1; 
    console.log(s, '??', 'notremove');
    console('??', 'notremove');
    console.info('??', 'notremo22ve');
    console.log(s, '??', 'notremove11');
    console.error(s, '??', 'notremove11');
`
//exclude: ['error'], contain: ['notremove']
const code = babelCore.transformSync(sourceCode1, {
    // plugins: [[removeConsole, { contain: ['notremove'], exclude: [] }]]
    plugins: [[removeConsole, { contain: ['notremove'], exclude: ['log'] }]]
    // plugins: [[removeConsole]]
    // plugins: [[removeConsole, { contain: ['notremove'] }]]
    // plugins: [[removeConsole, { exclude: ['log'] }]]
})
console.log(code.code);

