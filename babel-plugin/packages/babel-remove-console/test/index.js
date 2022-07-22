const babelCore = require('@babel/core');
const removeConsole = require('./removeConsole.js');


// let sourceCode1 = `let s = 1; 
//     console.log(s, '??', 'notremove');
//     console('??', 'notremove');
//     console.info('??', 'notremo22ve');
//     console.log(s, '??', 'notremove11');
//     console.error(s, '??', 'notremove11');
// `
let sourceCode1 = `
    let s = 's'; 
    const afun =() => {   
        console.log(s, '??', 'notremove');
        
        let s1 = 's11'; 
        console.log(s1, '??', 'notremove');
        let s2 = 's2'; 
    } 
`
//exclude: ['error'], contain: ['notremove']
const code = babelCore.transformSync(sourceCode1, {
    // plugins: [[removeConsole, { contain: ['notremove'], exclude: [] }]]
    plugins: [[removeConsole, { contain: ['s'], exclude: [''] }]]
    // plugins: [[removeConsole]]
    // plugins: [[removeConsole, { contain: ['notremove'] }]]
    // plugins: [[removeConsole, { exclude: ['log'] }]]
})
console.log('22' + code.code, '11');

