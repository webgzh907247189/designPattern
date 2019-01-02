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
	let {code} = shell.exec(`git tag -a ${tagVersion} -m ${tagDes}`);
	return code
}

function pushTag(){
	shell.exec('git push origin --tags')
}


let composeResult = composeFn(pushTag,createTag)
composeResult(remain)
