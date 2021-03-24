// ?: 匹配不捕获
// var s = /\{\{([^}]+)\}\}/g
const defaultRe = /\{\{((?:.|\r?\n)+?)\}\}/g;
export const util = {
    getValue(vm,expr){
        return expr.split('.').reduce((memo,current) => {
            memo = memo[current]
            return memo;
        },vm)
    },
    compileText(node,vm){
        // 自定义属性， 为了 第二次 更新能找到 之前的 {{}} 表达式
        if(!node.expr){
            node.expr = node.textContent
        }
        // console.log(node.expr)

        node.textContent = node.expr.replace(defaultRe,function(...args){
            return JSON.stringify(util.getValue(vm,args[1]))
        }) 
    }
}
function compile(node,vm){
    let childNodes = node.childNodes

    Array.from(childNodes).forEach(child => {
        if(child.nodeType === 1){ // 1 -> 元素   3 -> 文本
            compile(child,vm) // 递归边缘
        }else if(child.nodeType === 3){
            util.compileText(child,vm)
        }
    });
}

export default compile;