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


