let {AsyncSeriesBailHook} = require('tapable');

// 异步的钩子 (串行 -> series， 并行 -> Paralle)  
// 并行 需要等待所有并发的 异步事件执行后 在 执行 回调方法
class Lesson{
    constructor(){
        this.hook = {
            // 参数代表 传参的意思
            // 异步 串形 钩子
            arch: new AsyncSeriesBailHook(['name']),
        }
    }

    tapAsync(){
        this.hook.arch.tapAsync('node', (name, cb) => {
            setTimeout(() => {
                console.log('node', name);

                // 标示 当前异步什么时候 执行完
                cb();
            }, 2000)
        })

        this.hook.arch.tapAsync('react', (name, cb) => {
            setTimeout(() => {
                console.log('react', name);

                // 标示 当前异步什么时候 执行完
                cb();
            }, 1000)
        })
    }

    start(name){
        this.hook.arch.callAsync(name, () => {
            console.log('end');
        });
    }


    tapPromise(){
        this.hook.arch.tapPromise('node', (name) => {
            return new Promise((resolve,reject) => {
                setTimeout(() => {
                    console.log('node', name);

                    resolve();
                }, 2000)
            })
        })

        this.hook.arch.tapPromise('react', (name) => {

            return new Promise((resolve,reject) => {
                setTimeout(() => {
                    console.log('react', name);

                    resolve();
                }, 1000)
            })
        })
    }

    promise(name){
        this.hook.arch.promise(name).then(() => {
            console.log('end');
        });
    }
}

let lesson = new Lesson();
// lesson.tapAsync()
// lesson.start('chifan')


lesson.tapPromise()
lesson.promise('chifan111')
