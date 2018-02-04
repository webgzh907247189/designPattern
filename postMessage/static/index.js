/**
 * 实现了父窗口的元素操作子窗口的DOM元素
 * @type {[type]}
 */

let btn = document.getElementById('root')
let oiframe = document.getElementById('iframe')
btn.onclick = function () {
	// oiframe.contentWindow 获取的是iframe中的window，得到了window，再操作其中的DOM元素
	oiframe.contentWindow.document.body.style.background = 'red';
}

window.addEventListener('message',function(e){
    console.log(e.data);        //成功向父window对象发送数据
    console.log(e.origin);      //http://127.0.0.1:3000 所传来数据的域
    console.log(e.source);      //source – 消息源，消息的发送窗口/iframe

    setTimeout(function(){
    	document.body.style.background = 'red';
    },2000)
})



// let pop = window.open('http://localhost:4000/');
// setInterval(()=>{
// 	pop.postMessage('成功向4000端口发送数据','*'); 
// },2000)