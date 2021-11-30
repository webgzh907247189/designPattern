const webpack = require('./index');
const config = require('./webpack.config');

const compiler = webpack(config)

compiler.run(() => {
    console.log('我是自定义的webpack');
})