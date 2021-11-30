/**
 * 1. 初始化参数: 从配置文件和 shell 语句中读取并且合并参数，得到最终的对象
 * 2. 用上一步得到的参数 初始化 Compile 对象
 * 3. 加载所有的插件
 * 4. 执行对象的 run 方法开始编译
 * 5. 根据 entry 找到入口文件
 * 6. 从入口文件出发，调用所有配置的 loader 对模块进行编译
 * 7. 在找到该模块依赖的模块，在递归本步骤直到所有入口依赖的文件都经过了步骤的处理
 * 8. 根据入口 和模块的联系，组装成一个包含多个模块的chunk
 * 9. 再把每一个 chunk 转换为一个单独的文件加入到输出列表
 * 10. 在确定好输出内容之后，根据配置明确输出路径和文件名，把文件内容写入到文件里面
 * 
 * 以上过程中 webpack会在特定的时间广播出特定的事件，插件监听到感兴趣的事件执行特定的逻辑，并且插件可以调用 webpack 提供的 API改变webpack的执行结果
 */

const Compiler = require("./compiler")

const webpack = (options) => {
    const args = process.argv.slice(2)

    // --entry="111"  --output="111"
    let shelloptions = args.reduce((result, item) => {
        const [key, value] = item.split('=')
        const realKey = key.slice(2)
        result[realKey] = value
        return result
    }, Object.create(null))

    // shelloptions 优先级更高
    let finalOptions = {...options, ...shelloptions}

    let compiler = new Compiler(finalOptions)

    let plugins = finalOptions.plugins
    for (const plugin of plugins) {
        plugin.apply(compiler)
    }
    return compiler
}


module.exports = webpack