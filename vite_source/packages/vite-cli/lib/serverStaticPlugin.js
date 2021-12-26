const path = require('path');
const static = require('koa-static')

function serverStaticPlugin({ app, projectRoot }) {
    // console.log('111', projectRoot);
    app.use(static(projectRoot))
}

exports.serverStaticPlugin = serverStaticPlugin