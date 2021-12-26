// https://juejin.cn/post/6976028030770610213
// https://juejin.cn/post/6916317088521027598

{
    async function aa(){
        for(let item of [1,3,9,2]){
            let start = Date.now()
            await fn(item, start)
        }
    }
    
    function fn(d, start){
        return new Promise((resolve,reject) => {

            // settimeout是异步任务， 不resolve 上面await哪里知道你执行完成
            setTimeout(() => {
                console.log(Date.now() - start, 'start', d , start)
                resolve('')
            }, d * 1000)
        })
    }
    
    aa();
    // 1007 start 1 1629179465478
    // 3004 start 3 1629179466499    1021
    // 9003 start 9 1629179469504    3005
    // 2002 start 2 1629179478507    9003
}






{
    const timeout = i => new Promise(resolve => setTimeout(() => {
        resolve(i); 
        console.log('end', i);
    }, i));
    
    // asyncPool(3, [1000, 5000, 3000, 2000, 4000, 2000], timeout);
    
    asyncPool(2, [1000, 5000, 3000, 2000], timeout);
    
    
    async function asyncPool(poolLimit, listTask, iteratorFn) {
        // 所有的异步任务
        const allTask = []
    
        // 存储正在执行的异步任务
        const executing = []; 
        for (const item of listTask) {
            const itemTask = Promise.resolve().then(() =>  iteratorFn(item) )
            allTask.push(itemTask)
    
            // 需要进行限制
            if(listTask.length >= poolLimit){
                const doingPromise = itemTask.then(() =>  executing.splice(executing.indexOf(doingPromise), 1) )
                executing.push(doingPromise)
    
                if(executing.length >= poolLimit){
                    // 等待较快的任务执行完成
                    await Promise.race(executing); 
                }
            }
        }
        // console.log(allTask, 'allTask', executing);
        return Promise.all(allTask);
    }




    function multiRequest(maxNum, urls, iteratorFn){
        let len = urls.length;
        // 根据请求数量创建一个数组来保存请求的结果
        let resultList = new Array(len).fill(false);
        // 当前完成的数量
        let count = 0;

        return new Promise((resolve,reject) => {
            // 请求maxNum个
            // 第一次没满的时候 有效， 后续满了，靠后面的 then里面的逻辑
            while (count < maxNum) {
                next();
            }

            function next(){
                let current = count++;
                if(current >= len){
                    // 请求全部完成就将promise置为成功状态, 然后将result作为promise值返回
                    // 可能 第三个请求已经完成，第四个还在 pedding， 所以需要判断 resultList.includes(false)
                    !resultList.includes(false) && resolve(resultList)
                    return
                }

                const url = urls[current];
                // console.log(`开始 ${current}, id号: ${url}`);
                iteratorFn(url).then((res) => {
                    resultList[current] = res;
                    // console.log(`完成 ${current}, id号: ${url}`);
                    // 请求没有全部完成, 就递归
                    if (current < len) {
                        next();
                    }
                })
            }
        })
    }
    multiRequest(2, [1000, 5000, 3000, 2000], timeout);

}







{
    const timeout = i => new Promise(resolve => setTimeout(() => {
        resolve(i); 
        console.log('end', i);
    }, i));
    
    // asyncPool(3, [1000, 5000, 3000, 2000, 4000, 2000], timeout);
    
    asyncPool(2, [1000, 5000, 3000, 2000], timeout);
    
    
    function asyncPool(poolLimit, listTask, iteratorFn) {
        let i = 0;
        // 所有的异步任务
        const allTask = []
        // 存储正在执行的异步任务
        const executing = []; 
        
        const enqueue = function () {
            if (i === listTask.length) {
                return Promise.resolve();
            }

            const item = listTask[i++];
            const itemTask = Promise.resolve().then(() =>  iteratorFn(item) )
            allTask.push(itemTask)
    
            let r = Promise.resolve();

            // 需要进行限制
            if(listTask.length >= poolLimit){
                const doingPromise = itemTask.then(() =>  executing.splice(executing.indexOf(doingPromise), 1) )
                executing.push(doingPromise)
    
                if(executing.length >= poolLimit){
                    // 等待较快的任务执行完成
                    r = Promise.race(executing); 
                }
            }
            // 正在执行任务列表 中较快的任务执行完成之后，才会从array数组中获取新的待办任务
            return r.then(() => enqueue());
        }
       
        return enqueue().then(() => Promise.all(allTask))
    }
}
















{
    const concurrencyPromise = (data, handler, limit = 6) => {
        const sequence = [].concat(data);
        let promises = [];
        const result = {};
        const handlerFn = (val, index) => {
            return handler(val).then((res) => {
                result[val] = res;
    
                return index;
            });
        }
    
        //并发请求到最大数
        promises = sequence.splice(0, limit).map((val, index) => {
            // 这里返回的 index 是任务在 promises 的脚标，用于在 Promise.race 之后找到完成的任务脚标
            return handlerFn(val, index);
        });
    
        return sequence
            .reduce((last, item) => {
                return last
                    .then(() => {
                        return Promise.race(promises);
                    })
                    .catch((e) => {
                        return e;
                    })
                    .then((res) => {
                        promises[res] = handlerFn(item, res);
                    });
            }, Promise.resolve())
            // 等待所有结果返回（如果不需要请求的结果，这里不需要）
            .then(() => Promise.all(promises))
            .then(() => result);
    };

    
    const timeout = i => new Promise(resolve => setTimeout(() => {
        resolve(i); 
        console.log('end', i);
    }, i));

    concurrencyPromise([1000, 5000, 3000, 2000], timeout, 2);
}
















// 手写 Promise.all
{
    Promise.all = function (iterators) {
        return new Promise((resolve, reject) => {
            if(!iterators || iterators.length === 0){
                resolve([])
            }else {
                let count = 0; // 计数器，用于判断所有任务是否执行完成
                let result = []; // 结果数组
                for (let i = 0; i < iterators.length; i++) {
                    Promise.resolve(iterators[i]).then((data) => {

                        // result.push(data);
                        // 按顺序保存对应的结果
                        result[i] = data;
                        // 按顺序保存对应的结果

                        if(++count === iterators.length){
                            resolve(result);
                        }
                    })
                }
            }
        }, (err) => {
            reject(err); // 任何一个Promise对象执行失败，则调用reject()方法
            return;
        })
    }
}


// 手写 Promise.race
// 一旦迭代器中的某个 promise 对象 resolved 或 rejected，返回的 promise 对象就会 resolve 或 reject 相应的值。
{
    Promise.race = function (iterators) {
        return new Promise((resolve, reject) => {
            for (const iterator of list) {
                Promise.resolve(iterator).then((data) => {
                    resolve(data)
                }, (data) => {
                    reject(data);
                })
            }
        })
    }
}