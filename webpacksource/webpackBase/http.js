const timeout = i => new Promise(resolve => setTimeout(() => {
    resolve(i); 
    console.log('end', i);
}, i));


function multiRequest(maxNum, urls, iteratorFn){
    const len = urls.length
    let resultList = new Array(len).fill(false);
    let count = 0

    return new Promise((resolve,reject) => {
        while(count < maxNum){
            next()
        }

        function next() {
            let current = count++;
            if(current >= len){
                // 请求全部完成就将promise置为成功状态, 然后将result作为promise值返回
                // 可能 第三个请求已经完成，第四个还在 pedding， 所以需要判断 resultList.includes(false)
                !resultList.includes(false) && resolve(resultList)
                return
            }

            let url = urls[current]
            iteratorFn(url).then((res) => {
                resultList[current] = res

                if (current < len) {
                    next();
                }
            })
        }
    })
}
multiRequest(2, [1000, 5000, 3000, 2000], timeout);



/******/ 	// create a fake namespace object 
/******/ 	// mode & 1: value is a module id,  value是模块ID直接用__webpack_require__加载
/******/ 	// mode & 2: merge all properties of value into the ns require it 把所有的属性合并到命名空间ns上
/******/ 	// mode & 4: return value when already ns object 已经是ns对象了，可以直接返回值
/******/ 	// mode & 8|1: behave like require 行为类似于require