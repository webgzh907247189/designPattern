class AsyncParallelHook{
    constructor(){
        this.tasks = []
    }

    tapPromise(name, task){
        this.tasks.push(task);
    }

    promise(...args){
        let promiseMap = this.tasks.map(_ => _(...args));
        return Promise.all(promiseMap)
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
hook.tapPromise('react', (name) => {
    return new Promise((resolve,reject) => {
        setTimeout(() => {
            console.log('react', name);
            resolve();
        }, 1000)
    })
})
hook.promise('吃饭').then(() => {
    console.log('end');
});;