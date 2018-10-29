/**
 * jq 重载
 */

function addMethod(obj,name,f){
	let old = obj[name]

	obj[name] = function(){
		if(f.length == arguments.length){
			return f.apply(this,arguments)
		}else{
			return old.apply(this,arguments)
		}
	}

}

var obj = {
	name: ['张三','李四','王二麻']
}

var find = function(){
	return this.name
}

addMethod(obj,'find',find)
obj.find()  //["张三", "李四", "王二麻"]


var find1 = function (name){
	let nameList = this.name
	for(let i=0; i<nameList.length; i++){
		if(nameList[i] == name){
			return `${nameList[i]} 重载测试` 
		}
	}
}

addMethod(obj,'find',find1)
obj.find('李四')  //"李四 重载测试"