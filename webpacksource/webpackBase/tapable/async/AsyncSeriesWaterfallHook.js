let {AsyncSeriesWaterfallHook} = require('tapable');

// 异步的钩子 (串行 -> series， 并行 -> Paralle)  
// 并行 需要等待所有并发的 异步事件执行后 在 执行 回调方法
class Lesson{
    constructor(){
        this.hook = {
            // 参数代表 传参的意思
            arch: new AsyncSeriesWaterfallHook(['name']),
        }
    }

    tapAsync(){
        this.hook.arch.tapAsync('node', (name, cb) => {
            setTimeout(() => {
                console.log('node', name);

                // 标示 当前异步什么时候 执行完
                // cb('error', '传递给下一个函数');
                cb('', '传递给下一个函数');
            }, 2000)
        })

        this.hook.arch.tapAsync('react', (data, cb) => {
            setTimeout(() => {
                console.log('react', data);

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
}

let lesson = new Lesson();
lesson.tapAsync()
lesson.start('chifan')
