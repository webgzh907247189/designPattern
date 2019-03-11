#!/usr/bin/env node
let shell = require('shelljs');

/**
 * 外部参数
 */
let {remain} = JSON.parse(process.env.npm_config_argv)
let {composeFn,outputConsole} = require('./util/index')

/**
 * create tag 函数
 */
function createTag([tagVersion,tagDes]){
	let {code} = shell.exec(`git tag -a ${tagVersion} -m "${tagDes}"`);
	return code
}

/**
 * push tag 函数
 */
function pushTag(inpiutCode){
	let {code} = !inpiutCode && shell.exec('git push origin --tags')
	return {code,inpiutCode}
}


let composeResult = composeFn(outputConsole,pushTag,createTag)
composeResult(remain)