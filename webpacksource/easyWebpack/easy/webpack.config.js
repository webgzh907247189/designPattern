const path = require('path');

class Runplugin{
    apply(compiler){
        compiler.hooks.run.tap('Runplugin',(complation) => {
            console.log('Runplugin---done');
        })
    }
}

class DonePlugin{
    apply(compiler){
        compiler.hooks.done.tap('DonePlugin',(complation) => {
            console.log('DonePlugin---done');
        })
    }
}

module.exports = {
    entry: {
        entry1: './src/index1.js',
        entry2: './src/index2.js',
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].js',
    },
    resolve: {
        extensions: ['.js', '.ts'],
    },
    module: {
        rules: [
                {
                    test: /\.js$/,
                    use: [
                        path.resolve(__dirname, './loaders/loader1.js'),
                        path.resolve(__dirname, './loaders/loader2.js')
                    ],
                },
        ]
    },
    plugins: [
        new Runplugin(),
        new DonePlugin(),
    ]
}

