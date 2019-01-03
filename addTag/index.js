let shell = require('shelljs');
let {remain} = JSON.parse(process.env.npm_config_argv)


function composeFn(...args){
	return function(...relayArgs){
		return args.reverse().reduce((result,fn)=>{
			return fn.call(null,result)
		},args.shift().apply(null,relayArgs))	
	}
}


function createTag([tagVersion,tagDes]){
	let {code} = shell.exec(`git tag -a ${tagVersion} -m "${tagDes}"`);
	return code
}

function pushTag(inpiutCode){
	let {code} = !inpiutCode && shell.exec('git push origin --tags')
	return {code,inpiutCode}
}

function outputConsole({code,inpiutCode}){
	shell.echo({
		'0_0': '\033[42;34m tag创建成功 && 成功推送 \033[0m',
		'undefined_128': '\033[46;30m 重复创建 \033[0m'
	}[`${code}_${inpiutCode}`] || '\033[41;30m 创建失败 \033[0m' )
}


let composeResult = composeFn(outputConsole,pushTag,createTag)
composeResult(remain)