const Hook = require("./Hook");

// 动态创建函数
const HookCodeFactory = require('./HookCodeFactory'); 
class AsyncParalleHookCodeFactory extends HookCodeFactory{
    // 不同的子类实现的 content 内容是不一样的
    content({ onDone }){
        // 串行的方式调用
        return this.callTapParalles({ onDone })
    }
}


const factory = new AsyncParalleHookCodeFactory();
class AsyncParallelHook extends Hook{
    compile(options){
        factory.setup(this, options)
        return factory.create(options) // 创建一个新的函数并返回
    }
}

module.exports = AsyncParallelHook







// {
//     const list = [0,1,0,2,1,0,1,3,2,1,2,1]
//     function trap(list) {
//         let count = 0
//         let left = 0, right = 0
//         for (let index = 0; index < list.length; index++) {
//             const element = list[index];
            
//         }
//         return count
//     }

//     trap(list)
// }
// {
//     var isValid = function(s) {
//         const result = []
//         for(let item of s){
//             switch(item){
//                 case '(':
//                     result.push(')')
//                     break;
//                 case '[':
//                     result.push(']')
//                     break;
//                 case '{':
//                     result.push('}')
//                     break;
//             }
//         }
//         return result
//     };
//     console.log(isValid('{[]}'))
// }
