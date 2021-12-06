// 一个被引用的容器称为 remote;
// 引用者称为 host
// remote 暴露模块给 host
// host 可以引用这些暴露的模块，这些模块称为 remote 模块

// 先加载 host 文件，出发 remote 的时候去 remote 请求

// remote 8080
// new ModuleFederationPlugin({
//     name: 'remotegzh', // 必填 输出的模块名 被远程引用路径为 ${remotes.name}/${expose}
//     filename: 'remoteEntry.js', // 构建出来的文件名 提供给 host
//     exposes: {
//         './NewList': './src/list'
//     },
//     shared: ['react', 'react-dom'], // 共享的模块
// })



// host 8081
// const RemoteNewList = React.lazy(() => import('remoteg/NewList'))  //  被远程引用路径为 ${remotes.name}/${expose}
// new ModuleFederationPlugin({
//     name: 'host', // 必填 输出的模块名 被远程引用路径为 ${remotes.name}/${expose}
//     remotes: { // 远程引用的应用名以及 别名的映射， 使用时 以 key 值作为 name
//         remoteg: 'remotegzh@http://localhost:8080/remoteEntry.js'
//     },
//     shared: ['react', 'react-dom'], // 共享的模块
// })

// shared 共享