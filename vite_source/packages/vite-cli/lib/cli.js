const Koa = require('koa');
const {serverStaticPlugin} = require('./serverStaticPlugin');
const {modleRewritePlugin} = require('./modleRewritePlugin');
const {moduleResolvePlugin} = require('./moduleResolvePlugin');

function createServer() {
   const app = new Koa()
   const projectRoot = process.cwd();
  
   const context = { app,projectRoot }

   app.use((ctx, next) => {
      Object.assign(ctx, context)
      return next()
   })

   // 注意中间件的 next 
   // app.use((ctx, next) => {
   //    console.log(ctx, '2');
   //    if(ctx.path === '/'){
   //       ctx.body = {name: '111'}
   //    }
   //    next() 
   // })

   // 顺序有关联， 注意顺序
   const resolvePlugin = [modleRewritePlugin, moduleResolvePlugin, serverStaticPlugin]
   resolvePlugin.forEach((plugin) => {
      plugin(context)
   })
   // console.log(projectRoot, 'projectRoot~~', app.middleware);
   return app;
}

createServer().listen(8080)