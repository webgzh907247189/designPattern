Event.listen('add',(count)=>{
	let showcount = document.getElementById('showcount')
	showcount.innerHTML = count
})



function show(count) {
	let eat = document.getElementById('eat')
	eat.innerHTML = count
}
function show1(count) {
	let show1 = document.getElementById('show1')
	show1.innerHTML = count
}
Event.listen('eat',show)
Event.listen('eat',show1)

Event.removeListener('eat',show)
// Event.removeListener('eat',show1)