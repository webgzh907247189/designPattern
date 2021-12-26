
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

function buildJSXElement(path){
    // console.log(path, '111');
    // element
    const JSXElement = path.get('openingElement');
    // console.log(JSXElement)
    const eleName = JSXElement.node.name.name;
    const eleStringLiteral = types.stringLiteral(eleName)

    // attrs
    let attrs = []
    for(let item of JSXElement.get('attributes')) {
        // item.node 都是 JSXAttributes
        attrs.push(item.node);
    }

    const children = buildChildren(path);
    const props = attrs.map(converAttribute)

    if(children.length > 0){
        props.push(buildChildrenproperty(children))
    }
    
    const propsObject = types.objectExpression(props);

    const args = [eleStringLiteral, propsObject]
    return call(path, 'jsx', args)
}

function converAttribute(node){
    const val = node.value
    node.name.type = 'Identifier'
    let objectProperty = types.objectProperty(node.name, val)
    return objectProperty
}

function buildChildren(path){
    // console.log(path);
    const node = path.node;
    const ele = []
    for(let i=0; i< node.children.length; i++){
        const item = node.children[i];
        // console.log(item);
        if(types.isJSXText(item)){ // ????
            ele.push(types.stringLiteral(item.value))
        }else {
            // console.log(item)
            // ele.push(getChildNode(item))

            // const eleName = item.openingElement.name.name;
            // const eleStringLiteral = types.stringLiteral(eleName)
            // console.log('eleName', path.get('openingElement').node.name.name);
        }
    }

    // ele.push(types.stringLiteral('222'))
    // console.log(ele ,'ele')
    return ele;
}

function buildChildrenproperty(children){
    let chid
    if(children.length == 1){
        chid = children[0]
    } else {
        chid = types.arrayExpression(children)
    }
    return types.objectProperty(types.identifier('children'), chid)
}

function call(path, name, args){
    const requireExpression = types.callExpression(types.identifier('require'), [ types.stringLiteral('react/jsx-runtime') ]);

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
            types.identifier('_jsxRuntime'), 
            requireExpression
        ) 
    ])
    programPath.unshiftContainer('body', [ variableDeclarator ])
    return getRunTime(args);
}

function getRunTime(args){
    const arg1 = types.numericLiteral(0)
    const arg2 = types.memberExpression(types.identifier('_jsxRuntime'), types.identifier('jsxs'))
    // console.log(arg2);

    const sequenceExpression = types.sequenceExpression([arg1, arg2])
    // 创建一个 callExpression 节点
    return types.callExpression(sequenceExpression, args);
    
}












function getChildNode(node){
    const eleName =  node.openingElement.name.name;
    const eleStringLiteral = types.stringLiteral(eleName)

    return 
}