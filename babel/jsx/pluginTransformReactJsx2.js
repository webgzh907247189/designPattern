
const pluginSyntaxJsx = require('@babel/plugin-syntax-jsx').default;
const types = require('@babel/types');


module.exports = {
    // 不认识jsx， 继承 一下jsx
    inherits: pluginSyntaxJsx,
    visitor: {
        // babel 遍历语法树的时候，，发现当前节点的类型和 JSXElement 一样，就会进入此函数
        JSXElement(path, state){
            // 用新的节点替换掉老的节点
            let callExpression = buildJSXElement(path)
            path.replaceWith(callExpression);
        }
    }
}

function call(path, name){
    const requireExpression = types.callExpression(types.identifier('require'), [ types.stringLiteral('react') ]);

    // 从当前路径向上查找，找到 Program 路径
    const programPath = path.find(p => p.isProgram())
    const programScope = programPath.scope;
    const localName = programScope.generateUidIdentifier(name) // 产生一个不和当前作用域一样名字，避免产生冲突
    // console.log(localName);

    const importSpecifiers = types.importSpecifier(localName, types.identifier(name))
    const specifiers = [importSpecifiers]
    const importDeclaration = types.importDeclaration(specifiers, types.stringLiteral('react/jsx-runtime'))
    // console.log(importDeclaration);

    const variableDeclarator = types.variableDeclaration('var', [ 
        types.variableDeclarator(
            types.identifier('React'), 
            requireExpression
        ) 
    ])
    programPath.unshiftContainer('body', [ variableDeclarator ])
}


function buildJSXElement(path){
    const JSXElement = path.get('openingElement');
    call(path, 'jsx')
    const node = JSXElement.node
    return getChildNode(node, path)
}

function getChildNode(node, path){
    const eleName = node.name.name;
    const eleStringLiteral = types.stringLiteral(eleName)

    // attrs
    let attrs = []
    for(let item of node.attributes) {
        // item.node 都是 JSXAttributes
        attrs.push(item);
    }

    const props = attrs.map(converAttribute)

    const children = buildChildren(path);
    
    const propsObject = types.objectExpression(props);

    const args = [eleStringLiteral, propsObject, ...children]
    return getRunTime(args);
}

function getRunTime(args){
    const arg1 = types.memberExpression(types.identifier('React'), types.identifier('createElement'))
    // 创建一个 callExpression 节点
    return types.callExpression(arg1, args);  
}

function converAttribute(node){
    const val = node.value
    node.name.type = 'Identifier'
    let objectProperty = types.objectProperty(node.name, val)
    return objectProperty
}

function buildChildren(path){
    const node = path.node;
    const ele = []
    for(let i=0; i< node.children.length; i++){
        const item = node.children[i];

        if(types.isJSXText(item)){ 
            ele.push(types.stringLiteral(item.value))
        }else if(types.isJSXElement(item)){     
            const childPath = path.get(`children.${i}`);

            ele.push(getChildNode(item.openingElement, childPath))
        }
    }
    return ele;
}