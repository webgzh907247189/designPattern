let pathToRegexp = require('path-to-regexp')

let url = '/user/:id/:user'
let keys = []
let result = pathToRegexp(url,keys)

console.log(keys,result)

// [ { name: 'id', optional: false, offset: 7 },
//   { name: 'user', optional: false, offset: 22 } ] 
//   /^\/user\/(?:([^\/]+?))\/(?:([^\/]+?))\/?$/i