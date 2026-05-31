const webpack = require('./lib/webpack');
const config = require('./webpack.config');

const compiler = webpack(config)

compiler.run((err, stats) => {
    console.log('我是自定义的webpack',stats);
})