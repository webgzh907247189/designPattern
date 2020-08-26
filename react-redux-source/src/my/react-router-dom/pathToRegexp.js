// https://jex.im/regulex/#!flags=i&re=%5E%5C%2Fhome%5B%5C%2F%23%5C%3F%5D%3F%24
// 正则在线查看

const pathToRegexp = require('path-to-regexp')

// end 以什么结束(/home 结束)
let regexp = pathToRegexp.pathToRegexp('/home',[], {end: true})
console.log(regexp)

// ?: 分组不捕获
let str = '/home/'
console.log(str.match(regexp))
// [ '/home/', index: 0, input: '/home/' ]

let params = []
let regexp1 = pathToRegexp.pathToRegexp('/home/:name/:id',params, {end: false})
console.log(regexp1, params) // /^\/home(?:\/([^\/#\?]+?))(?:\/([^\/#\?]+?))[\/#\?]?$/i
// [ 
//     { name: 'name', prefix: '/', suffix: '', pattern: '[^\\/#\\?]+?', modifier: '' },
//     { name: 'id', prefix: '/', suffix: '', pattern: '[^\\/#\\?]+?', modifier: '' } 
// ]


{
    // 正向肯定预查
    let str = 'abcd'
    let reg1 = /a(?=b)/
    // 匹配a，并且a后面必须要有b，但是不会消费b(重点)
    let result = str.match(reg1)
    console.log(result) // [ 'a', index: 0, input: 'abcd' ]
}



{
    // 正向否定预查
    let str = 'acbcd'
    let reg1 = /a(?!b)/
    // 匹配a，并且a后面必须没有b，但是不会消费b(重点)
    let result = str.match(reg1)
    console.log(result) // [ 'a', index: 0, input: 'acbcd' ]
}

{
    console.log('1a'.match(/\d(?=[a-z])a/))
    console.log('1@'.match(/\d(?![a-z])@/))

    // 反向肯定后顾
    console.log('a1'.match(/(?<=[a-z])\d/))

    // 后面是/d 前面不能是[a-z]
    console.log('$1'.match(/(?<![a-z])\d/))
}