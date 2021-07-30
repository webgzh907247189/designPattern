class AsyncSeriesWaterfallHook{
    constructor(){
        this.tasks = []
    }

    tapAsync(name, task){
        this.tasks.push(task);
    }

    callAsync(...args){
        let finalCb = args.pop();
        
        let idx = 0;
        let next = (err, data) => {
            let itemTak = this.tasks[idx];
            if(!itemTak){
                return finalCb();
            }

            if(idx === 0){
                itemTak(...args,next);
            }else {
                itemTak(data,next);
            }
            idx++
        }

        next();
    }
}


const hook = new AsyncSeriesWaterfallHook(['name'])
hook.tapAsync('node', (name, cb) => {
    setTimeout(() => {
        console.log('node', name);
        cb(null, '结果')
    }, 1000)
})
hook.tapAsync('react', (data, cb) => {
    setTimeout(() => {
        console.log('react', data);
        cb(null)
    }, 1000)
})
hook.callAsync('吃饭',() => {
    console.log('end');
});