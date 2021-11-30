const babel = require('@babel/core');

const ast2 = babel.transform(`import {concat, deepClone} from 'lodash';
    console.log(concat);
`, {
    presets: ['@babel/preset-env'],
    plugins: [
        ['./babel-plugin-import', { "libraryName": 'lodash' }]
    ]
});

console.log(ast2.code);