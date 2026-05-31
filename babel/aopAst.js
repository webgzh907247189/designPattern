const aopFn = (astPath, template, options) => {
	if(astPath.node.isNew){
		return
	}
	
	const newNodeStrat = template.expression(`console.log("'zzz'")`)()
	console.log(newNodeStrat.toString())
	newNodeStrat.isNew = true

	const newNodeEnd = template.expression(`${options.end}`)()
	newNodeEnd.isNew = true

	const fnBody = astPath.get('body')
	
	fnBody.unshiftContainer('body',newNodeStrat)
	fnBody.pushContainer('body',newNodeEnd)
}

module.exports = function ({ types, template }, options) {
	return {
		visitor: {
			FunctionDeclaration: (astPath, state) => {
				if(state.filename.indexOf('src/utils') !== -1){
					aopFn(astPath, template, options)
				}
			},
			FunctionExpression: (astPath, state) => {
				if(state.filename.indexOf('src/utils') !== -1){
					aopFn(astPath, template, options)
				}
			},
			ArrowFunctionExpression: (astPath, state) => {
				if(state.filename.indexOf('src/utils') !== -1){

					aopFn(astPath, template, options)
				}
			},
		},
	};
};

