class SyncLoopHook{
    constructor(){
        this.tasks = []
    }

    tap(name, task){
        this.tasks.push(task);
    }

    call(...args){
        this.tasks.forEach((itemTask) => {
            let result
            do{
                result = itemTask(...args)
            }while(result !== undefined)
        })
    }
}

let index = 0;
const hook = new SyncLoopHook(['name'])
hook.tap('node', (name) => {
    console.log('node', name);
    return ++index === 3 ? undefined : '继续学'
})
hook.tap('react', (name) => {
    console.log('react', name);
})
hook.call('吃饭');