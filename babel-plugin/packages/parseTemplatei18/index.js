module.exports = function ({ types }) {
    return {
        visitor: {
            CallExpression(path, state) {
                let options = state.opts;
                let calleeObjectCode = path.get('callee').toString()
                if (types.isMemberExpression(path.node.callee) && calleeObjectCode === options.calleeSourceCode ) {
                    const newNode = types.identifier(options.calleeTargetCode)
                    path.get("callee").get('object').replaceWith(newNode)
                }
            }

        }
    }
}