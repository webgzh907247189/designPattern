let {SyncWaterfallHook} = require('tapable');

class Lesson{
    constructor(){
        this.hook = {
            // 参数代表 传参的意思
            arch: new SyncWaterfallHook(['name']),
        }
    }

    tap(){
        this.hook.arch.tap('vue', (name) => {
            console.log('vue', name);
            return '我是vue';
        })

        // 返回非 undefined 就停止运行代码
        this.hook.arch.tap('node', (data) => {
            console.log('node', data);

            return '我是node'
        })

        this.hook.arch.tap('react', (data) => {
            console.log('react', data);
        })
    }

    start(name){
        this.hook.arch.call(name);
    }
}

let lesson = new Lesson();
lesson.tap()
lesson.start('chifan')