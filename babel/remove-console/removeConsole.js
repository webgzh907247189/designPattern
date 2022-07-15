const types = require('@babel/types');

const getType = (type) => (source) => Object.prototype.toString.call(source).slice(8, -1) === type
const isArray = getType('Array')

// console.log(isArray([], 'Array'))


const CONSOLE = 'console'


// const thisEnvFn = path.findParent((f) => {
//     return (f.isFunction() && !f.isArrowFunctionExpression()) || f.isProgram()
// })

const getValNodeListByPath = (list) => {
    return list.reduce((result, item) => {

        // 暂时处理了 literal 和 identifier
        if(types.isLiteral(item)){
            result.push(item.node.value)
        }

        // if(types.isIdentifier(item)){
        //     let s = item.findParent(_ => {
        //         return types.isVariableDeclaration(_) && _.id.name === item 
        //     })
        //     console.log(s.toString(), '????asdas')
        //     result.push(item.node.value)
        // }
        return result
    }, [])
}

const getLowerCase = (val) => {
    return val && val.toLowerCase && val.toLowerCase();
}

module.exports = function(types){
    return {
        name: 'remove-console',
        visitor: {
            CallExpression(path, state){
                let options = state.opts;
                let calleeObjectCode = path.get('callee').get('object').toString()
                let calleePropertyCode = path.get('callee').get('property').toString()

                // 同时设置了 exclude 和 contain， 优先以 contain 为判定条件
                if(options && isArray(options.exclude) && isArray(options.contain)){
                    let arguments = path.get('arguments')

                    const argumentsValList = getValNodeListByPath(arguments)
                    // console.log(argumentsValList, 'argumentsValList???')

                    let containFlag = options.contain.some(_ => {
                        const containItem = getLowerCase(_)
                        return argumentsValList.some(argumentsValItem => getLowerCase(argumentsValItem) === containItem)
                    })

                    
                    const excludeFlag = options.exclude.some(excludeItem => excludeItem === calleePropertyCode) 
                    // console.log(containFlag, 'flag', excludeFlag)

                    let flag = containFlag ? false : !excludeFlag
                    if(calleeObjectCode === CONSOLE && flag){
                        path.remove()
                    }
                    return 
                }

                // 只设置了不删除 console 的关键字
                if(options && isArray(options.contain)){
                    let arguments = path.get('arguments')

                    // argumentsValList 需要完善，因为存在作用域的问题
                    // 可能会出现 let s = 'notremove'; console.log(s, '222')
                    const argumentsValList = getValNodeListByPath(arguments)
                    // console.log(argumentsValList, 'argumentsValList')
                    let flag = options.contain.some(_ => {
                        const containItem = getLowerCase(_)
                        return argumentsValList.some(argumentsValItem => getLowerCase(argumentsValItem) === containItem)
                    })
                    
                    if(flag) return 
                }

                // 只设置了 不删除 console 的exclude
                if(options && isArray(options.exclude)){
                    const flag = options.exclude.some(_ => _ === calleePropertyCode)
                    if(flag) return 
                }
                
                console.log(state.opts, '11122', calleeObjectCode, calleePropertyCode)
                // 只要是 console.xx 就删除
                if(calleeObjectCode === CONSOLE){
                    path.remove()
                }
            }
        }
    }
}