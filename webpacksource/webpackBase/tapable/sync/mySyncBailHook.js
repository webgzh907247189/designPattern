class SyncBailHook{
    constructor(){
        this.tasks = []
    }

    tap(name, task){
        this.tasks.push(task);
    }

    call(...args){
        let result;
        let index = 0
        // 返回非 undefined 就停止运行代码
        do{
         result = this.tasks[index++](...args)
        }while(result === undefined && index < this.tasks.length)
    }
}


const hook = new SyncBailHook(['name'])
hook.tap('node', (name) => {
    console.log('node', name);
    return '11'
})
hook.tap('react', (name) => {
    console.log('react', name);
})
hook.call('吃饭');