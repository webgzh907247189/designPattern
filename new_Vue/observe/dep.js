let id = 0;

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