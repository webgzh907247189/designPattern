let obj = {
	name: 'test'
}

console.log('执行了') // 多次require，指挥加载一次

exports = module.exports = obj   //正确使用方法

// module.exports = exports = obj  //正确使用方法

// exports = obj //错误使用方法 

// module.exports = obj //正确使用方法