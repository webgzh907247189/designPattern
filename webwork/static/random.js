let count = 0
while(1){
	count ++
	if(count >= 100000){
		break;
	}
	postMessage(JSON.stringify({num: Math.random(),count}))
}



// http://www.css88.com/archives/7724
// https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Atomics