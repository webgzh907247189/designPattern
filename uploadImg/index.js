/**
 * https://blog.csdn.net/qq_39258552/article/details/84133770
 * 
 * createObjectURL是同步执行（立即的） 
 * URL.createObjectURL(blob)可以获取当前文件的一个内存URL
 * createObjectURL返回一段带hash的url，并且一直存储在内存中，直到document触发了unload事件（例如：document close）
 * 或者执行revokeObjectURL来释放。
 * 
 * FileReader.readAsDataURL是异步执行（过一段时间）可以获取一段data:base64的字符串 
 * FileReader.readAsDataURL则返回包含很多字符的base64，并会比blob url消耗更多内存，
 * 但是在不用的时候会自动从内存中清除（通过垃圾回收机制）
 */

/**
 *   https://www.cnblogs.com/qinmengjiao123-123/p/5603057.html
 **/
function composeFn(...args){
    return args.reverse().reduce((result,fn)=>{
        return (...relayArgs)=>{
            return fn.call(null,result.apply(null,relayArgs))
        }
    },args.shift())
}



/**
 * https://www.kancloud.cn/xiaoxiaoqc/web/188133
 */
function createXhr(imgSrc,cb){
    let xhr = new XMLHttpRequest();
    xhr.open('GET', imgSrc, true);
    xhr.responseType = 'arraybuffer';

    xhr.onload = function() {
        if (xhr.status == 200) {
            cb(xhr)
        }
    }
    xhr.send();
}


function createBse64(xhr){
    let uInt8Array = new Uint8Array(xhr.response);
    let i = uInt8Array.length;
    let binaryString = new Array(i);
    while (i--) {
      binaryString[i] = String.fromCharCode(uInt8Array[i]);
    }
    let data = binaryString.join('');
    return window.btoa(data);
}

function getBase64(base64,outputFormat){
    let dataUrl = `data: ${outputFormat || "image/png"};base64,${base64}`;
    return dataUrl
}




function getDataURL(canvas){
    return canvas.toDataURL()
}

// Blob这个构造器的参数比较诡异，第一个参数是一组数据，所以必须是数组，即使只有一个字符串也必须用数组装起来。
// 第二个参数是对这一Blob对象的配置属性，目前也只有一个type也就是相关的MIME需要设置，使用key-value的方式也许是为了今后的扩展。
// 对于Blob对象，我们可以创建出一个URL来访问它。使用URL对象的 createObjectURL 方法。
function dataURLtoBlob(dataurl) {
    let [type,content] = dataurl.split(',')
    let mime = type.match(/:(.*?);/)[1]

    let bstr = atob(content)
    let length = bstr.length
    let u8arr = new Uint8Array(length)
    while (length--) {
        u8arr[length] = bstr.charCodeAt(length);
    }
    return new Blob([u8arr], { type: mime });
}

function getBlob(blob){
    return window.URL.createObjectURL(blob)
}
 
function getDownImg(url,name= 'code.jpeg'){
    let link = document.createElement("a");
    link.style.display = "none";
    link.href = url;
    link.setAttribute('download',name);
    document.body.appendChild(link);
    link.click();
    window.URL.revokeObjectURL(url);
}

function getResultDownImg(name){
    return function(url){
        getDownImg(url,name)
    }
}
let resultImg = getResultDownImg('下载图片')

// dom 不带存在跨域的图片
let composeResult = composeFn(resultImg,getBlob,dataURLtoBlob,getDataURL)
let composeResultQrCode = composeFn(resultImg,getBlob,dataURLtoBlob)


{	
	let src = 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAgAAAQABAAD/2wBDAAgGBgcGBQgHBwcJCQgKDBQNDAsLDBkSEw8UHRofHh0aHBwgJC4nICIsIxwcKDcpLDAxNDQ0Hyc5PTgyPC4zNDL/2wBDAQkJCQwLDBgNDRgyIRwhMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjL/wAARCAAYAEgDASIAAhEBAxEB/8QAHwAAAQUBAQEBAQEAAAAAAAAAAAECAwQFBgcICQoL/8QAtRAAAgEDAwIEAwUFBAQAAAF9AQIDAAQRBRIhMUEGE1FhByJxFDKBkaEII0KxwRVS0fAkM2JyggkKFhcYGRolJicoKSo0NTY3ODk6Q0RFRkdISUpTVFVWV1hZWmNkZWZnaGlqc3R1dnd4eXqDhIWGh4iJipKTlJWWl5iZmqKjpKWmp6ipqrKztLW2t7i5usLDxMXGx8jJytLT1NXW19jZ2uHi4+Tl5ufo6erx8vP09fb3+Pn6/8QAHwEAAwEBAQEBAQEBAQAAAAAAAAECAwQFBgcICQoL/8QAtREAAgECBAQDBAcFBAQAAQJ3AAECAxEEBSExBhJBUQdhcRMiMoEIFEKRobHBCSMzUvAVYnLRChYkNOEl8RcYGRomJygpKjU2Nzg5OkNERUZHSElKU1RVVldYWVpjZGVmZ2hpanN0dXZ3eHl6goOEhYaHiImKkpOUlZaXmJmaoqOkpaanqKmqsrO0tba3uLm6wsPExcbHyMnK0tPU1dbX2Nna4uPk5ebn6Onq8vP09fb3+Pn6/9oADAMBAAIRAxEAPwD353WNGd2CqoyWJwAPWvJ9L+LV7rfxZsPDtjaWo0K7SRo7l1YzShEkO8fNhVLJwCuSvPcV13xD0PXvEXhc6XoFzZwSzTKLn7W7okkGDuTKAsMnaDjHGea8e1KDxta/HHw1btF4Zi1uPTSlkkAnFmsIWcYYffyBvxjj7vvQB7p4k8U6N4R06O/1y8+yWskohV/KeTLkEgYQE9FP5VU07x94W1bW7jR7HWrea+twxkjAYDC/ewxG1sd8E1wX7R3/ACTzT/8AsKx/+ipai1i2gsv2mfCFvawpDCmkMqpGuAAEuQBj6AflQB1HxA8dXPhvRItW0KXS9QjgmX7bbs++Qwk4LJtYYI9weue1R3fxMgutf0Ww8Pob2K6hN5duttJI6w4+RUVcfOx4yeFAJNbuqazBqa3Wj2Ft/aLOrQ3O1d8SAjDKxyATgngsBwec8HzP9nrS/tPg7Urvz2hL35hkMS7ZHVY0IUv1CjecBcHJPNAHos/iux08ve6xdXNsIomlFqlrNhEA5Zzsy3fnhR7kZrkrHx38QfFsR1Hwp4a06HSGYiCXU3ffMAcbhtIA6e/1NdJ8RfDs9/8ADTW9M0O2/wBLmjVwifflKurMCerMVUjnk5rzVvitFpfwosdD0E3Vl4stIYbX7K1kzOpTAd8MpU5APB5+bpQB7T4fu9XvNKifXNMWw1AZEsccqyRk5OCpBJxgA84xnHNFWdJF2NGsRfyGS8+zx+e5UKWk2jccAADnPAAooAuUUUUANdxHGzkMQoJIVST+AHJrO+z3Wqc3ga2tD0tlb55B/wBNGHQf7I/EnJFFFAF+CCG1gSC3ijhhQYWONQqqPYDpUlFFABRRRQAUUUUAf//Z'
	// composeResultQrCode(src)	
}


// dom 带存在跨域的图片
{
	html2canvas(document.getElementById('root'),{
		height: '440',
        width: '550',
        useCORS: true, 
		onrendered: function(canvas) {
	        composeResult(canvas)
	    }
	})
}
//下载图片
{
    let donwnImg = document.getElementById('donwnImg');
    donwnImg.onclick = function(){
        createXhr('http://cdn2.jianshu.io/assets/default_avatar/14-0651acff782e7a18653d7530d6b27661.jpg',(xhr)=>{
            composeFn(resultImg,getBlob,dataURLtoBlob,getBase64,createBse64)(xhr)
        })
    }
}

// 下载图片
{
    let donwnImg = document.getElementById('donwnImg');
    donwnImg.onclick = function(){
        fetch('http://cdn2.jianshu.io/assets/default_avatar/14-0651acff782e7a18653d7530d6b27661.jpg').then(res => res.blob()).then((blob)=>{
            let url = window.URL.createObjectURL(blob)
            let link = document.createElement("a");
            link.style.display = "none";
            link.href = url;
            link.setAttribute('download','下载.jpeg');
            document.body.appendChild(link);
            link.click();
            window.URL.revokeObjectURL(url);
        })
    }
}



/**
 * compose 传递参数的问题
 */
{
    function composeFn(...args){
        return args.reverse().reduce((result,fn)=>{
            return (...relayArgs)=>{
                return fn.call(null,result.apply(null,relayArgs))
            }
        },args.shift())
    }
    
    function a(){
      return '1111'
    }

    function b(str){
      return `${str}zzzzz${str}`
    }
    
    function c(fn,obj){
        return function(){
            let r = fn(...arguments)
            
            return 'ssssssss' + r + 'obj.name' + obj.name
        }
    }
    
    var d = c(b,{name: 'xxx'})
    var result =  composeFn(d,a)
    result()
}




{
    let paramsString = "https://juejin.im/post/5d08d3d3f265da1b7e103a4d#heading-43?q=URLUtils.searchParams&topic=api"
    let searchParams = new URLSearchParams(paramsString);

    for (let p of searchParams) {
        console.log(p);
    }

    console.log(searchParams.has("topic") === true); // true
    console.log(searchParams.get("topic") === "api"); // true
    console.log(searchParams.getAll("topic")); // ["api"]
    console.log(searchParams.get("foo") === ""); // false

    searchParams.append("topic", "webdev");
    console.log(searchParams.toString()); // "q=URLUtils.searchParams&topic=api&topic=webdev"

    searchParams.set("topic", "More webdev");
    console.log(searchParams.toString()); // "q=URLUtils.searchParams&topic=More+webdev"

    searchParams.delete("topic");
    console.log(searchParams.toString()); // "q=URLUtils.searchParams"
}


{
    // base64
    // http://verymuch.site/2017/12/14/Data-URL%E7%AE%80%E4%BB%8B%E4%B8%8E%E4%BD%BF%E7%94%A8/
    // http://verymuch.site/2019/06/17/base64%E5%8E%9F%E7%90%86%E6%B5%85%E6%9E%90/#more?nsukey=9AyW%2F12%2B719qV588x%2FM7G6ujshMi7T5LJVvxw3VrGapKECR9OQD2Am7LY%2B5yBNJda5nXLS9A06Tgj6PoYFi8dpVNN%2FFUJZVNaGkkrAf1L13tB8g1sr%2FrkK3ot7S0UTMENmv4ZAUiBHPJ7kQK%2B5SNOSBJR47oPxhU%2FAvc51xjNSO%2BGJ4nTpS17iUFowOhfr%2BH


    // Blob 对象表示一个不可变、原始数据的类文件对象。Blob 表示的不一定是JavaScript原生格式的数据。File 接口基于Blob，继承了 blob 的功能并将其扩展使其支持用户系统上的文件。
    // URL.createObjectURL() 静态方法会创建一个 DOMString，其中包含一个表示参数中给出的对象的URL。这个 URL 的生命周期和创建它的窗口中的 document 绑定。这个新的URL 对象表示指定的 File 对象或 Blob 对象。
}


// async 捕获错误
{
    (async () => {
        const fetchData = () => {
            return new Promise((resolve, reject) => {
                setTimeout(() => {
                    resolve('fetch data is me')
                }, 1000)
            })
        }
    
        // 抽离成公共方法
        const awaitWrap = (promise) => {
            return promise
                .then(data => [null, data])
                .catch(err => [err, null])
        }
    
        const [err, data] = await awaitWrap(fetchData())
        console.log('err', err)
        console.log('data', data)
        // err null
        // data fetch data is me
    })()
}