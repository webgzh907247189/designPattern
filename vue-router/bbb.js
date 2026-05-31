module.exports = function (allTypes) {
	return {
		visitor: {
			ImportDeclaration(path, state) {
				if( path.get("source").toString().includes('/runtime/helpers/')){
					debugger
				}
				
				console.log(path.get("specifiers").toString(), 'gzh', path.get("source").toString(),)				
			},
		},
	};
};

