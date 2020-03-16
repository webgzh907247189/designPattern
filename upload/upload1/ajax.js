function $ajax(options){
    options = Object.assign({
        method: 'post',
        url: '',
        data: null,
        headers: {

        }
    },options)

    return new Promise((resolve,reject) => {
        let xhr = new XMLHttpRequest()
        xhr.open(options.method,options.url);
        Object.keys(options.headers).forEach((item) => {
            xhr.setRequestHeader(item,options.headers[item])
        })
        xhr.onreadystatechange = function(){
            if(xhr.readyState === 4){
                if(/^(2|3)\d{2}$/.test(xhr.status)){
                    resolve(JSON.parse(xhr.responseText));
                }else{
                    reject(xhr)
                }
            }
        }
        xhr.send(options.data);
    })
}

function $formatFileName(fileName){
    let dotIndex = fileName.lastIndexOf('.'),
        name = fileName.substring(0, dotIndex),
        suffix = fileName.substring(dotIndex + 1);

        // new Date().getTime() === +new Date();
    name = md5(name) + new Date().getTime();
    return {
        hash: name,
        suffix,
        fileName: `${name}.${suffix}`
    };

}