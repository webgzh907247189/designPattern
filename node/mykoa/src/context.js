/**
 * ctx 主要是代理的功能
 */

let request = require('./request')
let context = {

}

function getValue(target,key){
    context.__defineGetter__ (key,function(){
        return this[target][key]
    })
}
function setValue(target,key,value){
    context.__defineSetter__ (key,function(value){
        return this[target][key] = value
    })
}

getValue('request','method')
getValue('response','body')


setValue('response','body')

module.exports = context