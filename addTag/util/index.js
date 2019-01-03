let shell = require('shelljs');
/**
 * composeFn 聚合fn 函数
 * @param  {...function} args  
 */

function composeFn(...args){
	return function(...relayArgs){
		return args.reverse().reduce((result,fn)=>{
			return fn.call(null,result)
		},args.shift().apply(null,relayArgs))	
	}
}


/**
 * console 函数
 */
function outputConsole({code,inpiutCode}){
	shell.echo({
		'0_0': '\033[42;34m tag创建成功 && 成功推送 \033[0m',
	}[`${code}_${inpiutCode}`] || '\033[41;30m 失败 \033[0m' )
}

module.exports = {
	composeFn,
	outputConsole
}