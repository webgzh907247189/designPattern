function * objToArr(obj){
	for (let key of Object.keys(obj)){
		yield [key,obj[key]]
	}
}

function testTreeShak(){
	let a = 1 + 2 + 3 + 4 + 5
	console.log('测试Tree Shaking,在生产环境的bundle.js中应该没有这个函数',a)
	return a
}

module.exports = { objToArr, testTreeShak }