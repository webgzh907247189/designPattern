interface Monitor{}
class Monitor27 implements Monitor{}


interface Host{}
class Le implements Host{}

class Computer{
    monitor: Monitor
    host: Host
    constructor(){
        this.monitor = new Monitor27()
        this.host = new Le()
    }

    startUp(){
        console.log('组装好了')
    }
}

let computer = new Computer()
computer.startUp()


/**
 * 1. 无法创建不同的部分组件 27寸 28寸 29寸.....
 * 2. 需要在 类的 内部手动创造零件
 */






// 改进
 class Computer1{
    monitor: Monitor
    host: Host
    constructor(monitor, host){
        this.monitor = monitor
        this.host = host
    }

    startUp(){
        console.log('组装好了')
    }
}

let monitor = new Monitor27() 
let host = new Le()
let computer1 = new Computer1(monitor, host)
// 解决问题1 -> 把创建 放到外面，动态传入到 Computer1 类 里面
computer1.startUp()




// ioc -> Inverse of Control 控制反转   目的: 降低耦合度
// 设计好的 对象 交给 容器 控制，不是使用 传统的方式，在对象内部直接控制

// 之前的 控制权在 自己手上，现在控制权在 容器手上 (控制反转)
// 之前自己创建 自己需要的依赖。现在不是这样了

// di -> Dependency injection 依赖注入  
// 把用户 需要的依赖注入给用户(依赖注入)
