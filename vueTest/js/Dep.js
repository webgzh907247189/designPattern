class Dep {
    constructor() {
        this.subs = [];
    }
    // 添加订阅
    addSub(watcher) {
        this.subs.push(watcher);
    }
    // 通知
    notify() {
        console.log(this.subs,'this.subs')
        this.subs.forEach(watcher => watcher.update());
    }
}
