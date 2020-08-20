// https://juejin.im/post/6860646761392930830

const log = console.log;
const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const subFlow = createFlow([() => delay(1000).then(() => log("c"))]);

createFlow([
  () => log("a"),
  () => log("b"),
  subFlow,
  [() => delay(1000).then(() => log("d")), () => log("e")],
]).run(() => {
  console.log("done");
});

// 需要按照 a,b,延迟1秒,c,延迟1秒,d,e, done 的顺序打印

function createFlow(list){
    const listFn = list.slice().flat();

    function run(cb){
        const resultPromise = listFn.reduce((result, item) => {
            // 正确
            // if(typeof item == 'function'){
            //     return result.then(item)
            // } else {
            //     return result.then(item.run)
            // }

            // 正确 (本质上 下面这样写法相当与 result.then(item) ||  result.then(item.run)， 因为被then的cb执行完return出来了)
            return result.then(() => {
                return typeof item == 'function' ? item() : item.run();
            })

            // 错误
            // result.then(() => {
            //     typeof item == 'function' ? item() : item.run();
            // })
            // // 错误 (返回的不是同一个promise， 这样写返回的是第一次的 Promise.resolve())
            // return result;
        }, Promise.resolve())

        // 依赖promise 链式处理 then
        cb && resultPromise.then(cb);
    }
    return {
        run
    }
}


function createFlow(list){
    const listFn = list.slice().flat();

    async function run(cb){
        for(let item of listFn){
            typeof item == 'function' ? await item() : await item.run();
        }
        cb?.();
    }
    return {
        run
    }
}

// await 后面到then 都运行完毕了，在进行下一个
// function createFlow(list){
//     const listFn = list.slice().flat();

//     async function run(cb){
//         for(let item of listFn){
//             typeof item == 'function' ? await item() 
//             : 
//             await item.run().then(() => {console.log('???')})
//             .then(() => {
//                 console.log('???111')
//                 setTimeout(() => {
//                     console.log('....')
//                 }, 4000)
//             });
//         }
//         cb?.();
//     }
//     return {
//         run
//     }
// }
// a b c ???  ???111  d e done




// 构造多个then的形式，上一个then结束，到下一个then开始
{
    Promise.resolve().then(() => {
        console.log('0000')
        // 注意这里 有没有 return 对是不是按序打印影响很大
        return new Promise((reslve) => {
            setTimeout(() => {
                console.log('1111')
                reslve('111')
            }, 2000)
        
        })
    }).then(() => {
        console.log('222')
    }).then(() => {
        console.log('333')
        return Promise.resolve().then(() => {
            console.log('zzzz')
        })
    }).then(() => {
        console.log('4444')
    })

    // promise 链式调用，下一个then等待上一个then等结束
    // 此题 成功 还有一个重要原因，上面 new Promise((resolve) => setTimeout(resolve, ms));
    // 每次都是resolve
    
    // 0000
    // 1111
    // 222
    // 333
    // zzzz
    // 4444
}