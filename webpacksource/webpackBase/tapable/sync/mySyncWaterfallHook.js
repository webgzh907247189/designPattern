class SyncWaterfallHook{
    constructor(){
        this.tasks = []
    }

    tap(name, task){
        this.tasks.push(task);
    }

    call(...args){
        // 需要调用两次
        // return this.tasks.reduce((a,b) => {
        //     return () => b(a(...args))
        // })

        let [first, ...other] = this.tasks;
        return other.reduce((result,b) => {
            return b(result)
        }, first(...args))
    }
}


const hook = new SyncWaterfallHook(['name'])
hook.tap('vue', (name) => {
    console.log('vue', name);
    return '我是vue'
})
hook.tap('node', (name) => {
    console.log('node', name);
    return '我是node'
})
hook.tap('react', (name) => {
    console.log('react', name);
    return '我是react'
})
hook.call('吃饭');