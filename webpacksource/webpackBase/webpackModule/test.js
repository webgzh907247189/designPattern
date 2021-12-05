let webpack = require('webpack');
const config = require('./webpack.config.prod');

let compiler = webpack(config)
console.log(compiler);
compiler.run();