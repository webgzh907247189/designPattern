const walk = require("./walk");
const Scope = require('./scope');;

function analyse(ast, magicStringOfAst, module){
    // 根 作用域
    let rootScope = new Scope();

    ast.body.forEach(statement => {
        
        Object.defineProperties(statement, {
            // 给 statement 添加一个key，值为 这个语法树节点在源码中的位置
            _source: {
                value: magicStringOfAst.snip(statement.start, statement.end)
            },

            // 当前 statement 语法树节点声明了那些变量
            _defines: {

            },

            // 当前 statement 依赖外部的变量 (外部变量)
            _dependsOn: {

            },

            // 当前 statement 是否放置在结果中，是否会出现打包结果中
            _included: {

            }
        })

        // 如何知道某个变量有没有在当前模块内定义的？
        // 扫描整个模块，找到所有定义的变量
        walk(statement, { 
            enter(node){
                let newScope;
                switch(node.type){
                    case 'FunctionDeclaration':
                        const names = node.params.map(_ => _.name)
                        newScope = new Scope({ name: node.id.name, parent: rootScope, params: names });
                        addToScope(node.id.name, statement)
                        break;
                    case 'VariableDeclarator':
                        node.declarations.forEach((declaration)=>{
                            addToScope(declaration.id.name, statement)
                        })
                        break;
                }

                // 如果创建了新的作用域，那么此作用域会变成当前新的作用域 (作用域多了一层)
                if(newScope){
                    Object.defineProperty(node, '_scope', { value: newScope })
                    rootScope = newScope
                }
            }, 
            leave(node){
                // 离开的时候退出 当前作用域, 退到父作用域
                if(Object.hasOwnProperty(node, '_scope')){
                    rootScope = rootScope.parent
                }
            } 
        })
        // 作用域链构建完成之后，在遍历一次，找出本模块定义了依赖了哪些外部变量
        ast.body.forEach((statement) => {
            walk(statement, { 
                enter(node){
                    // 找节点依赖的哪些 外部 变量
                    if(node.type === 'Identifier'){
                        let currentScope = node._scope || rootScope;
                        let definingScope = currentScope.findDefiningScope(node.id.name)
                        if(!definingScope){
                            // (外部变量)
                            statement._dependsOn[node.id.name] = true
                        }
                    }
                },
                leave(){

                }
            })
        })
    });

    function addToScope(name, statement){
        // 往作用域添加变量
        rootScope.add(name)

        // 没有父作用域才进来
        if(!rootScope.parent){
            // 模块内的顶级变量
            statement._defines[name] = true
        }
    }
}
module.exports = analyse