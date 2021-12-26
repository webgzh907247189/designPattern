/**
 * 初始化
 * lerna init
 * 
 * lerna bootstrap 安装依赖
 * lerna bootstrap用于为所有项目安装依赖
 * 
 * lerna clean 可以删除各个包下掉 node_modules 除了根目录
 * lerna list 查看本地包列表
 * lerna changed 现实上次 realease tag 依赖有修改的包
 * lerna diff 显示自上次 release tag 以来有修改的包的差异， 执行 git diff
 * lerna exec 在每个包目录下执行任意命令
 * lerna run 执行每个包 package.json 中的脚本命令
 * lerna add 添加一个包的版本为各个包的依赖
 * lerna import 引入 package
 * lerna link 链接互相引用的库
 * lerna create 新建package
 * lerna publish 发布
 * 
 * lerna updated  检查发包更新
 * lerna publish --force-publish=@shuinfo/wepack-plugin-obfuscator 发布指定的包
 * 
 * 
 * yarn workspace 允许我们使用 monorepo 的形式来管理项目
 * 在安装 node_modules 的时候它不会安装到每个子项目的 node_modules 里面， 而是直接安装到根目录下面，这样每个子项目都可以读取到根目录的 node_modules
 * 整个项目只有跟目录下面才有一份 yarn.lock 文件，子项目也会被link到 node_modules 里面，这样就允许我们就可以直接用import倒入对应的项目
 * yarn.lcok 文件是自动生成的，也完全根据 yarn.lock 来安装你的依赖
 * 
 * 
 * 
 * 依赖管理和安装包和链接包 用yran
 * 初始化和发布用 lerna 管理
 * 
 * 
 * lerna 是简化 monorepo的工具
 * 
 * 
 * 进入到 vite-cli目录下，执行 npm link 之后被 link到全局
 * 可以执行 vite-cli 这个命令
 * 
 * 
 * 
 * 在项目根目录 执行 lerna version
 * 弹出选项 让你选择升级 包的版本
 * 
 * 
 * 
  multi-packages/
    package.json
    packages/
      package-1/
        package.json
      package-2/
        package.json
  lerna add babel , 该命令会在package-1和package-2下安装babel
  lerna add react --scope=package-1 ,该命令会在package-1下安装react
  lerna add package-2 --scope=package-1，该命令会在package-1下安装package-2

 * 给指定的包添加依赖
 * yarn workspace vite-project add vite
 * lerna add xxx --scope=@fengyinchao/modulea
 * 
 * 
 * 
 * 
 * 
 * lerna publish 发布
 * 先登录 选择你要发布的包的 registry 在发布
 * 
 * 发布的配置， 因为是带有命名空间的包，所以需要加上  access 才能发布成功
 * "publishConfig": {
    "registry": "https://registry.npmjs.org",
    "access": "public"
  },
 *
 */