const Hook = require("./Hook");

// 动态创建函数
const HookCodeFactory = require('./HookCodeFactory'); 
class SyncHookCodeFactory extends HookCodeFactory{
    // 不同的子类实现的 content 内容是不一样的
    content(){
        // 串行的方式调用
        return this.callTapSeries()
    }
}


const factory = new SyncHookCodeFactory();
class SyncHook extends Hook{
    compile(options){
        factory.setup(this, options)
        return factory.create(options) // 创建一个新的函数并返回
    }
}

module.exports = SyncHook