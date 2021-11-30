const { SyncHook } = require('tapable');
const Complication = require('./complication');
const fs = require('fs');
const path = require('path');

module.exports = class Compiler {
    constructor(options){
        this.options = options
        this.hooks = {
            run: new SyncHook(),
            done: new SyncHook(),
        }
    }

    run(cb){
        this.hooks.run.call();

        this.compiler((err,stats) => {
            for (const filename in stats.assets) {
                // 10. 在确定好输出内容之后，根据配置明确输出路径和文件名，把文件内容写入到文件里面
                let filepath = path.join(this.options.output.path, filename)
                fs.writeFileSync(filepath, stats.assets[filename], 'utf8')
            }
            cb(err, {
                toJson(){
                    return stats
                }
            })
        });
        this.hooks.done.call();

        // Object.entries(this.options.entry).forEach((entry) => {
        //     fs.watchFile(entry, () => {
        //         return this.compiler(cb)
        //     })
        // })

        // 监听整个目录
        if(this.options.watch){
            fs.watchFile('.', () => {
                return this.compiler(cb)
            })
        }
    }
    compiler(cb){
        let complication = new Complication(this.options);
        complication.build(cb);
    }
}