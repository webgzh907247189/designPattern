let {SyncHook} = require('tapable');

class Lesson{
    constructor(){
        this.hook = {
            // 参数代表 传参的意思 , 下面传递多个参数， 此处没有约定也是 不行的
            arch: new SyncHook(['name']),
        }
    }

    tap(){
        this.hook.arch.tap('node', (name, age) => {
            console.log('node', name, age);
        })

        this.hook.arch.tap('react', (name, age) => {
            console.log('react', name, age);
        })
    }

    start(name, age){
        this.hook.arch.call(name, age);
    }
}

let lesson = new Lesson();
lesson.tap()
lesson.start('chifan', '222')