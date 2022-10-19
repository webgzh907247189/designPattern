let id = 0;
/**
 * Vue data 中随意更改一个属性，视图都会被更新吗？
 * https://juejin.cn/post/7040733315791323143
 * 
 * template 会被编译成render函数，函数执行的时候，访问什么变量，就出触发相应变量的get，然后才会添加watcher。
 * 触发了 get，然后在 get里面 (每一个data 属性都有一个 dep 实列), 触发了dep.depend() ---> watcher.addDep ---> dep.addSub(dep 把 wacther 加进来)。 dep里面有 wacther， wacter 里面有dep
 * 
 * 同一个的 Watcher 在同一个 tick 的时候应该只被执行一次，也就是说队列 queue 中不应该出现重复的 Watcher 对象。
 */
class Dep{
    constructor(props) {
        this.id = id++;
        this.subs = []
    }
    
    addSub(watcher){
        // dep 里面 记住 watcher
        this.subs.push(watcher)
    }

    notify(){
        this.subs.forEach((item) => {
            item.update()
        })
    }

    depend(){
        if(Dep.target){
            // 在 watcher 里面 记住 dep
            Dep.target.addDep(this)
        }
    }
}

export default Dep

let stack = [];
export function pushTarget(watcher){
    Dep.target = watcher

    stack.push(watcher)
}

export function popTarget(){
    stack.pop()

    Dep.target = stack[stack.length - 1]
}