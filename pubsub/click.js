let btn = document.getElementById('btn')
let count = 0;

btn.onclick = function () {
	let num = count++
	Event.trigger('add',num)
	Event.trigger('eat',num)
}