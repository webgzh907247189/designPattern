const title = require('./title.js')
const isArray = require('isarray')
// require('./index.less')

console.log(title, isArray([]))

import(/*webpackChunkName: "sum"*/ './sum.js').then((data) => {
    console.log('sum', data)
})