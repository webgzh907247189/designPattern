const path = require('path')

module.exports = {
    mode: 'development',
    entry: path.join(__dirname,'./src/client'),
    output: {
        filename: 'indexssr.js',
        path: path.resolve(__dirname,'static')
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                loader: 'babel-loader',
                exclude: /node_modules/,
                options: {
                    presets: [
                        "@babel/preset-env",
                        "@babel/preset-react",
                    ],
                    plugins: [
                        "@babel/plugin-proposal-class-properties"
                    ]
                }
            }
        ]
    }
}