const express = require('express')
const webpackDevMiddleware = require('webpack-dev-middleware');

let webpack = require('webpack')
const config = require('./webpack.config.dev');
const compile = webpack(config);


const app = express();
app.use(webpackDevMiddleware(compile))

app.get('/test', (req,res) => {
    res.json({name: 'json'});
})

app.listen(3001,() => {
    console.log('success');
});