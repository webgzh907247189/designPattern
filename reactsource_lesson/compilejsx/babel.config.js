module.exports = {
	"presets": ["@babel/preset-react"],
	"plugins": [
		["@babel/plugin-transform-react-jsx", {
			// "pragma": "h1h", // default pragma is React.createElement
			// "runtime": "automatic",  // classic | automatic, defaults to classic
		}]
	]
}