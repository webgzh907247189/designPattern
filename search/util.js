/**
 * 数组扁平化
 * @type {Array}
 */
	let arrList = [{id: 1,name: '1111'},{id: 2,name: '2222'}]
	let mapObject = arrList.reduce((result,item)=>{
		result[item.id] = item
		return result
	},Object.create(null))
	console.log(mapObject)
	/**
	 * 	{
	 *  	1: {id: 1, name: "1111"},
	 *  	2: {id: 2, name: "2222"}
	 *  }
	 */
}






