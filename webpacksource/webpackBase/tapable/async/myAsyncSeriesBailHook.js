// class AsyncParallelHook{
//     constructor(){
//         this.tasks = []
//     }

//     tapAsync(name, task){
//         this.tasks.push(task);
//     }

//     callAsync(...args){
//         let finalCb = args.pop();
        
//         let idx = 0;
//         let next = () => {
//             if(idx === this.tasks.length){
//                 finalCb();
//             }else {
//                 this.tasks[idx++](...args, next)
//             }
//         }
//         next();
//     }
// }


// const hook = new AsyncParallelHook(['name'])
// hook.tapAsync('node', (name, cb) => {
//     setTimeout(() => {
//         console.log('node', name);
//         cb()
//     }, 2000)
// })
// hook.tapAsync('react', (name, cb) => {
//     setTimeout(() => {
//         console.log('react', name);
//         cb()
//     }, 1000)
// })
// hook.callAsync('吃饭',() => {
//     console.log('end');
// });





class AsyncParallelHook{
    constructor(){
        this.tasks = []
    }

    tapPromise(name, task){
        this.tasks.push(task);
    }

    promise(...args){
        let [first, ...other] = this.tasks;
        return other.reduce((result, item) => {
            // return result.then(() => {
            //     item(...args);
            // })

            return result.then(() => {
                return item(...args);
            })
        }, first(...args))
    }
}


const hook = new AsyncParallelHook(['name'])
hook.tapPromise('node', (name) => {
    return new Promise((resolve,reject) => {
        setTimeout(() => {
            console.log('node', name);
            resolve();
        }, 1000)
    })
})
hook.tapPromise('react', (name, cb) => {
    return new Promise((resolve,reject) => {
        setTimeout(() => {
            console.log('react', name);

            resolve();
        }, 2000)
    })
})
hook.promise('吃饭').then(() => {
    console.log('end');
});