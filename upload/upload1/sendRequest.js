// 可以批量请求数据。所有的url地址都在urls参数中，同时可以通过max控制请求的并发度，当所有请求结束后，调用callback回调函数
{
    var urls = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20];
    const limit = 5;

    // 主函数
    function sendRequest(urls, limit , callback) {
        let idx = 0;
        const requestList = [];
        while(limit-- && limit >= 0){
            const itemUrl = urls[idx];
            idx++;
            requestList.push(
                new Promise((resolve,reject)=>{
                    setTimeout(()=>{
                        ++limit;
                        resolve(itemUrl);
                    },parseInt(Math.random()*1000))
                })
            )
        }
        
        return Promise.all(requestList).then((listRes) => { callback(listRes) })
    }

    sendRequest(urls, limit, function(listRes) {
        console.log('finish',listRes)
    });
}



{
    var urls = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20];
    const limit = 5;
    const result = [];

    function sendRequest(urls, limit , callback) {
        function _send (urls) {
            return new Promise((resolve, reject) => {
                const url = urls.shift();
                if(url) {
                    setTimeout(()=>{
                        console.log(`当前发送：${url}`);
                        resolve(url);
                        result.push(url);
                    }, 1000)
                }
            })
            .finally(() => {
                if(urls.length > 0) {
                    return _send(urls)
                }else {
                    callback(result);
                }
            })
        
        }
        let asyncList = [];
        while(limit--) {
            asyncList.push(_send(urls));
        }
        return Promise.all(asyncList)
    }

    sendRequest(urls, limit, function(list) {
        console.log('all urls sended!',list)
    });
}


{
    // 我把你那个改成长轮询机制，来执行了。。。不过没有callback功能了。不知道算不算。。。给你代码看看。我用了mock接口
    {
        let urls = [
          1,
          2,
          3,
          4,
          5,
          6,
          7,
          8,
          9,
          10,
          11,
          12,
          13,
          14,
          15,
          16,
          17,
          18,
          19,
          20
        ];
        const limit = 4;
        let onLimit = 0; // 当前请求数量
        queue();
      
        // 长轮询
        function queue() {
          let time = setInterval(() => {
            if (limit > onLimit) {
              _send(urls);
            }
      
            if (urls.length == 0) clearInterval(time); // 测试用，中断轮询
          }, 100);
        }
      
        function _send(urls) {
          return new Promise((resolve, reject) => {
            const url = urls.shift();
            onLimit++;
            if (url) {
              setTimeout(async () => {
                const res = await fetch(
                  `https://www.fastmock.site/mock/f29153ea802b2006237d862f7a54b82b/base/test?version=${url}`,
                  {
                    method: 'get',
                    mode: 'cors',
                    headers: {
                      Accept: 'text/html,*/*;q=0.8',
                      'Content-Type': 'application/x-www-form-urlencoded'
                    }
                  }
                ).then(res => {
                  result = res.json();
                  return result;
                });
                console.log(`当前发送：${res.data.version}`);
                // console.log(`当前发送：${url}`);
                resolve(url);
              }, 1000);
            }
          }).finally(() => {
            if (urls.length > 0) {
              onLimit--;
            }
          });
        }
    }
}