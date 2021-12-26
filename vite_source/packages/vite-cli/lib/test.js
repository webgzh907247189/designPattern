let MagicString = require('magic-string');
let {parse} = require('es-module-lexer');

let code = `import {createApp} from 'vue';import React from 'react'`
let magicString = new MagicString(code)


// 这些操作都是返回克隆之后的版本，不会改变原始的字符串
console.log(magicString.snip(0, 6).toString())

console.log(magicString.remove(0, 7).toString())


parse(code).then((dataList) => {
    console.log(dataList, '~~');
    // [
    //     [ { n: 'vue', s: 25, e: 28, ss: 0, se: 29, d: -1, a: -1 } ],
    //     [],
    //     true
    // ] ~~
    let data = dataList[0]
    let id = `@modules/${ data[0].n}`
    let str = magicString.overwrite(data[0].s, data[0].e, id).toString()
    console.log(str, 'str')
})
