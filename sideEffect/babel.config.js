module.exports = {
	presets: [
        [
            '@babel/preset-env',
            {
                modules: false,
                useBuiltIns: 'usage',
                corejs: '3',
                // targets: {
                //     browsers: [
                //       'Chrome >= 60',
                //       'Safari >= 10.1',
                //       'iOS >= 10.3',
                //       'Firefox >= 54',
                //       'Edge >= 15',
                //     ],
                // },
            },
        ],
    ],
	plugins: [
        ["@babel/plugin-transform-runtime", {
            "corejs": 3 // ???? 对比之前的版本 flat打包体积 //测试babel 文章的 打包 // 压缩比列 // ？？vite 测试
        }]
	]
}


/**
 * 插件比预设先执行
 * 插件执行顺序是插件数组从前向后执行
 * 预设执行顺序是预设数组从后向前执行
 */

