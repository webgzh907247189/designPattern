
module.exports = function ({ types, template }, options) {
	return {
		visitor: {
			// ImportDeclaration(path, state) {
			// 	if( path.get("source").toString().includes('/runtime/helpers/')){
			// 		debugger
			// 	}
				
			// 	console.log(path.get("specifiers").toString(), 'gzh', path.get("source").toString(),)				
			// },

			// VariableDeclarator(astPath, state){
			// 	if(state.filename.endsWith('.vue')){
			// 		// if(astPath.get("callee").toString() === 'setTimeout'){
			// 		// 	const fileRelativePath = './' + path.posix.relative(state.cwd, state.filename)
			// 		// 	// debugger
			// 		// 	console.log('gzh', astPath.parent.toString(), fileRelativePath)		
			// 		// }
			// 		console.log(astPath.get("init").toString(), '??', state.filename)
			// 	}	
				
			// }
			
			MemberExpression(astPath, state){
				// const memberExpressionFnThis = astPath?.get('object')?.get('name')?.toString()
				// const memberExpressionFnName = astPath?.get('property')?.get('name')?.toString()
	
				// console.log(memberExpressionFnThis, 'callExpressionFnNamecallExpressionFnName', memberExpressionFnName)
				// if(callExpressionFnName === '_c'){
					// const sss = astPath?.get('object')?.toString()
					// if(sss === '_vm'){
					// 	console.log('zzz1',  )
					// }
					// console.log(state.file.opts.filename, '??')
				// }

				if(state.file.opts.filename === '/Users/web/Documents/workspace/gzh/gzhLearn/designPattern/vue-router/src/component/about.vue'){
					console.log(astPath.toString())
				}
				
			}
		},
	};
};

