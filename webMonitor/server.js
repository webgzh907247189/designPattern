/**
 * 本质上 webpack-dev-server 就是 express 服务 + webpack-dev-middleware
 */
const express = require('express');
const path = require('path');
console.log(path.resolve(__dirname, './server.js'), path.resolve(__dirname, './server.js') === require.resolve('./server.js'))
// /Users/web/Documents/workspace/gzh/gzhLearn/designPattern/webMonitor/server.js true

const config = require('./webpack.config.prod');
const webpack = require('webpack');
const compile = webpack(config);
const webpackDevMiddlerare = require('webpack-dev-middleware');

const app = express();

app.use(webpackDevMiddlerare(compile, {}))
app.use((req, res) => {
    console.log('1111');
    res.end('1111')
})

app.listen(3000, () => {
    console.log('监听3000端口');
})


