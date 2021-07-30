class AsyncParallelHook{
    constructor(){
        this.tasks = []
    }

    tapAsync(name, task){
        this.tasks.push(task);
    }

    callAsync(...args){
        let finalCb = args.pop();
        
        let idx = 0;
        let done = () => {
            idx++;
            if(idx === this.tasks.length){
                finalCb();
            }
        }
        this.tasks.forEach((item) =>  {
            item(...args, done)
        })
    }
}


const hook = new AsyncParallelHook(['name'])
hook.tapAsync('node', (name, cb) => {
    setTimeout(() => {
        console.log('node', name);
        cb()
    }, 1000)
})
hook.tapAsync('react', (name, cb) => {
    setTimeout(() => {
        console.log('react', name);
        cb()
    }, 1000)
})
hook.callAsync('吃饭',() => {
    console.log('end');
});