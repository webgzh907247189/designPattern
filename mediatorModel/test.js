{
	let obj = {name: '11',sex: '男',a: {b: 11}}
	let o = {...obj,className: '一年级'}
	obj.a.b = 22
	console.log(o,'??',obj)
	//{name: "11", sex: "男", a: {b: 22}, className: "一年级"}
	//{name: "11", sex: "男", a: {b: 22}}
}

/** babel转换后的 */

var _extends = Object.assign || function (target) { 
	for (var i = 1; i < arguments.length; i++) { 
		var source = arguments[i]; 
		for (var key in source) { 
			if (Object.prototype.hasOwnProperty.call(source, key)) { 
				target[key] = source[key];
			} 
		} 
	} 
	return target; 
};

{
	var obj = { name: '11', sex: '男', a: { b: 11 } };
	var o = _extends({}, obj, { className: '一年级' });
	obj.a.b = 22;
	console.log(o, '??', obj);
	//{name: "11", sex: "男", a: {b: 22}, className: "一年级"}
	//{name: "11", sex: "男", a: {b: 22}}
}



{
	let obj = {
		name: '11',
		sex: '男',
		a: {b: 11},
		*[Symbol.iterator]() {
	      	for(let item of Object.keys(obj)){
				yield obj[item]
			}
	    }
	}
	console.log(...obj) // 11  男  {b: 11}
}


