let {AsyncParallelHook} = require('tapable');

// 异步的钩子 (串行 -> series， 并行 -> Paralle)  
// 并行 需要等待所有并发的 异步事件执行后 在 执行 回调方法
class Lesson{
    constructor(){
        this.hook = {
            // 参数代表 传参的意思
            arch: new AsyncParallelHook(['name']),
        }
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

        this.hook.arch.tapPromise('react', (name, cb) => {
            return new Promise((resolve,reject) => {
                setTimeout(() => {
                    console.log('react', name);
                    resolve();
                }, 1000)
            })
        })
    }

    start(name){
        this.hook.arch.promise(name).then(() => {
            console.log('end');
        });
    }
}

let lesson = new Lesson();
lesson.tapPromise()
lesson.start('chifan')