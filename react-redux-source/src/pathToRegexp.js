/**
 * jex.im/regulex/ 正则可视化网站 
 */

let pathToRegexp = require('path-to-regexp')

let regexp = pathToRegexp('/home',[],{end: true})
console.log(regexp) 
// /^\/home(?:\/)?$/i
// ?: 非捕获分组，不保存值  
// ?= 正向肯定匹配，后面必须跟着什么 b
// ?! 正向否定匹配，后面不能跟着什么 b
// ? 0 || 1 有或者没有


let str = '/home/'
console.log(str.match(regexp))
// [ '/home/', index: 0, input: '/home/', groups: undefined ]


// 捕获分组
console.log(str.match(/^\/home(\/)?$/i))
// [ '/home/', '/', index: 0, input: '/home/', groups: undefined ]


let str1 = 'abcd'
let reg1 = /a(?=b)/
console.log(str1.match(reg1))
//[ 'a', index: 0, input: 'abcd', groups: undefined ] 


let str2 = 'abcd'
let reg2 = /a(?!b)/
console.log(str2.match(reg2))
//null 