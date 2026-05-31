const path = require('path')
const rollup = require('./lib/rollup')

let entry = path.resolve(__dirname, 'src/main.js')
rollup('./src/main.js', 'bundle.js')