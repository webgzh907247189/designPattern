
/** 1. 多层路径问题 **/
// [...slug] (包含多个层级的意思) 不会渲染当前文件夹下的路由 ---> (http://localhost:3001/about/ 不会被渲染)
// [[...slug]](包含当前文件夹根目录的意思) 才会渲染 当前文件夹下的路由 ---> (http://localhost:3001/about 才会会被渲染)

// about/[[...slugaa]] 文件夹下，如何不写[[...xxx]], 访问 http://localhost:3001/about 就会出现404页面



/** 2. 去掉不必要文件夹问题 **/
// 给文件夹加上 () 当前文件夹路径就会自动去掉
// 给当前项目 (dashboard) 加上了(), 所以访问路径变成了 --->  http://localhost:3001/admin, http://localhost:3001/user


/** 3. 去掉不必要组件文件夹路径问题 **/
// 文件夹 以 _开头，就不会识别为路由文件夹了


/** 4. 默认组件都是服务端组件，需要加 'use clinet 标识是客户端组件' **/


/** 5. layout.tsx 会继承 **/

/** 6. nextjs 16版本 middleware.ts 改为了 proxy.ts **/