let {SyncHook} = require('tapable');

class Lesson{
    constructor(){
        this.hook = {
            // 参数代表 传参的意思
            arch: new SyncHook(['name']),
        }
    }

    tap(){
        this.hook.arch.tap('node', (name) => {
            console.log('node', name);
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