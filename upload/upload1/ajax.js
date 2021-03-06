function $ajax(options){
    options = Object.assign({
        method: 'post',
        url: '',
        data: null,
        headers: {

        },
        progress: Function.prototype,
        requestList: [],
    },options)

    return new Promise((resolve,reject) => {
        let xhr = new XMLHttpRequest()
        xhr.open(options.method,options.url);
        Object.keys(options.headers).forEach((item) => {
            xhr.setRequestHeader(item,options.headers[item])
        });

        options.requestList?.push(xhr);
        
        xhr.onreadystatechange = function(){
            if (options.requestList) {
                const xhrIndex = options.requestList.findIndex(item => item === xhr);
                options.requestList.splice(xhrIndex, 1);
            }

            if(xhr.readyState === 4){
                if(/^(2|3)\d{2}$/.test(xhr.status)){
                    resolve(JSON.parse(xhr.responseText));
                }else{
                    reject(xhr)
                }
            }
        }

        xhr.upload.onprogress = options.progress;
        xhr.send(options.data);
    })
}

function $formatFileName(fileName){
    const {hash,suffix} = $getMd5(fileName)
    name = hash + new Date().getTime();
    return {
        hash: name,
        suffix,
        fileName: `${name}.${suffix}`
    };

}

function $getMd5(fileName){
    let dotIndex = fileName.lastIndexOf('.'),
        name = fileName.substring(0, dotIndex),
        suffix = fileName.substring(dotIndex + 1);

    name = md5(name);
    return {
        hash: name,
        suffix,
        fileName: `${name}.${suffix}`
    };

}