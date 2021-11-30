let {SyncBailHook} = require('tapable');

class Lesson{
    constructor(){
        this.hook = {
            // 参数代表 传参的意思
            arch: new SyncBailHook(['name']),
        }
    }

    tap(){
        this.hook.arch.tap('vue', (name) => {
            console.log('vue', name);
            return undefined;
        })

        // 返回非 undefined 就停止运行代码
        this.hook.arch.tap('node', (name) => {
            console.log('node', name);

            // return 了 返回值 就停止执行
            return '想停止学习'
        })

        this.hook.arch.tap('react', (name) => {
            console.log('react', name);
        })
    }

    start(name){
        this.hook.arch.call(name);
    }
}

let lesson = new Lesson();
lesson.tap()
lesson.start('chifan')