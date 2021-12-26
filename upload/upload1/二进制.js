// https://juejin.im/post/5f01ddfee51d4534c36d8914

/**
 * base64所以每 6 个比特为一个单元，对应某个可打印字符。
 * 3 个字节有 24 个比特，对应于 4 个 base64 单元，即 3 个字节可由 4 个可打印字符来表示
 * 一个字节8个比特
 */


 /**
  * 在 JavaScript 中，有两个函数被分别用来处理解码和编码 base64 字符串：
  * btoa()：该函数能够基于二进制数据 “字符串” 创建一个 base64 编码的 ASCII 字符串。
  * atob()： 该函数能够解码通过 base64 编码的字符串数据。
  * 
  */


// 其中的 a 代表 ASCII，而 b 代表 Blob，即二进制。因此 atob 表示 ASCII 到二进制，对应的是解码操作。
// btoa 表示二进制到 ASCII，对应的是编码操作
{
    const name = 'Semlinker';
    const encodedName = btoa(name);
    console.log(encodedName); // U2VtbGlua2Vy
}

{
    const encodedName = 'U2VtbGlua2Vy';
    const name = atob(encodedName);
    console.log(name); // Semlinker
}





/**
 * Object URL 是一种伪协议，也被称为 Blob URL。
 * 它允许 Blob 或 File 对象用作图像，下载二进制数据链接等的 URL 源。
 * 在浏览器中，我们使用 URL.createObjectURL 方法来创建 Blob URL，
 * 该方法接收一个 Blob 对象，并为其创建一个唯一的 URL，其形式为 blob:<origin>/<uuid>
 * */ 
fetch("https://avatars3.githubusercontent.com/u/4220799")
.then((response) => response.blob())
.then((blob) => {
    const objectURL = URL.createObjectURL(blob);
    image.src = objectURL;
});
// 生成的 blob url
blob:https://example.org/40a5fb5a-d56d-4a33-b4e2-0acf6a8e5f641



/**
 * 浏览器内部为每个通过 URL.createObjectURL 生成的 URL 存储了一个 「URL → Blob」 映射。
 * 因此，此类 URL 较短，但可以访问 Blob。生成的 URL 仅在当前文档打开的状态下才有效。
 * 但如果你访问的 Blob URL 不再存在，则会从浏览器中收到 404 错误。
 */



URL.revokeObjectURL(url)
 // 删除在内存中的引用
 /**
  * 但实际上它也有副作用。
  * 虽然存储了 URL → Blob 的映射，但 Blob 本身仍驻留在内存中，浏览器无法释放它。
  * 映射在文档卸载时自动清除，因此 Blob 对象随后被释放。
  * 但是，如果应用程序寿命很长，那不会很快发生。因此，如果我们创建一个 Blob URL，即使不再需要该 Blob，它也会存在内存中。
  * 
  * 
  * 针对这个问题，我们可以调用 URL.revokeObjectURL(url) 方法，从内部映射中删除引用，
  * 从而允许删除 Blob（如果没有其他引用），并释放内存。
  */










// ArrayBuffer
fetch("https://avatars3.githubusercontent.com/u/4220799")
    .then((response) => response.arrayBuffer())
    .then((buffer) => {
        const blob = new Blob([buffer]);
        const objectURL = URL.createObjectURL(blob);
        image.src = objectURL;
});

/**
 * ArrayBuffer 对象用来表示「通用的、固定长度的」原始二进制数据缓冲区。「
 * ArrayBuffer 不能直接操作，而是要通过类型数组对象 或 DataView 对象来操作」，
 * 它们会将缓冲区中的数据表示为特定的格式，并通过这些格式来读写缓冲区的内容。
 */


 /**
  * ArrayBuffer 简单说是一片内存，但是你不能直接用它。
  * 这就好比你在 C 里面，malloc 一片内存出来，你也会把它转换成 unsigned_int32 或者 int16 这些你需要的实际类型的数组/指针来用。
  * 这就是 JS 里的 TypedArray 的作用，那些 Uint32Array 也好，Int16Array 也好，都是给 ArrayBuffer 提供了一个 “View"
  */


    // FileReader API 和 Fetch API 底层也是支持 ArrayBuffer，这里我们以 FileReader API
    const reader = new FileReader();
    reader.onload = function(e) {
        let arrayBuffer = reader.result;
    }

    reader.readAsArrayBuffer(file);






/**********  ArrayBuffer 类型数组 **********/
// 表示通用的 固定长度的原始二进制数据缓冲区
// 它是一个字节数组
// 不能直接操作ArrayBuffer，要想操作 ArrayBuffer，需要使用 TypedArray 或者 DataView 才能操作 ArrayBuffer



/**********  TypedArray 类型数组 **********/
// Uint8Array 数组类型表示一个 8 位无符号整型数组，创建时内容被初始化为 0
// int16Array.buffer === buffer

// Int8Array  8位二进制有符号整数
// Unit8Array 8位无符号整数

// Int68Array  16位二进制有符号整数
// Unit16Array 16位无符号整数

let buffer = new ArrayBuffer(8)
console.log(buffer.byteLength)  // 8

const int8Array = new Int8Array(buffer)
console.log(int8Array.length)  // 8

const int16Array = new Int16Array(buffer)
console.log(int16Array.length, int16Array.buffer === buffer);  // 4



/**********  DateView 对象 **********/
// dataView.buffer === buffer

{
    let buffer = new ArrayBuffer(2)
    console.log(buffer.byteLength)  // 2

    let dataView = new DataView(buffer)
    dataView.setInt8(0, 1)
    dataView.setInt8(1, 2)
    console.log(dataView.getInt8(0))  // 1
    console.log(dataView.getInt8(1))  // 2
    console.log(dataView.getInt16(0), dataView.buffer === buffer)  // 258
}



/**********  Blob 类文件对象 **********/
{
    const obj = {name: '11'}
    const objStr = JSON.stringify(obj);
    let blob = new Blob([objStr], {type: 'application/json'});
    console.log('blob.size',blob.size)  // 13

    function readBlob(blob, type){
        return new Promise((resolve,reject) => {
            let reader = new FileReader()

            reader.onload = function(event){
                resolve(event.target.result)
            }
            switch(type){
                case 'ArrayBuffer':
                    reader.readAsArrayBuffer(blob)
                    break;
                case 'DataURL':
                    reader.readAsDataURL(blob)
                    break;
                case 'Text':
                    reader.readAsText(blob)
                    break;
            }
        })
    }

    readBlob(blob, 'ArrayBuffer').then((data) => {
        console.log(data); // ArrayBuffer(13)
    })
    readBlob(blob, 'DataURL').then((data) => {
        console.log(data); // data:application/json;base64,eyJuYW1lIjoiMTEifQ==
    })
    readBlob(blob, 'Text').then((data) => {
        console.log(data); // {"name":"11"}
    })
}



/**********  URL.createObjectURL & URL.revokeObjectURL(url) **********/
{
    function download(){
        const obj = {name: '11'}
        const objStr = JSON.stringify(obj);
        let blob = new Blob([objStr], {type: 'application/json'});
        
        let ele = document.createElement('a');
        ele.href = URL.createObjectURL(blob)
        ele.download = 'user.json'
        ele.rel = 'noopener'

        ele.dispatchEvent(new MouseEvent('click'))

        URL.revokeObjectURL(blob); // 用完之后销毁 URL，也会销毁 blob
    }
}