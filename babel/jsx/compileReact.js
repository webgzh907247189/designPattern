const jsx = '<h1 id="title"><span id="spanid"><div id="divid">div</div>hello</span>world</h1>'

// react 17 之前    runtime: 'classic'  pragma: 'createElement'
// /*#__PURE__*/
// React.createElement("h1", {
//     id: "title"
//   }, /*#__PURE__*/React.createElement("span", null, "hello"), "world");



// // react 17 之后    runtime: 'automatic',  追加 pragma: 'createElement' 报错
// var _jsxRuntime = require("react/jsx-runtime");
// /*#__PURE__*/
// (0, _jsxRuntime.jsxs)("h1", {
//   id: "title",
//   children: [/*#__PURE__*/(0, _jsxRuntime.jsx)("span", {
//     children: "hello"
//   }), "world"]
// });


const babelCore = require('@babel/core');
const pluginTransformReactJsx = require('./pluginTransformReactJsx2.js');

const code = babelCore.transformSync(jsx, {
    plugins: [[pluginTransformReactJsx, { runtime: 'classic' }]] // default pragma is React.createElement
    // plugins: [['@babel/plugin-transform-react-jsx', { runtime: 'classic' }]], // pragma: 'shuxinCreateEle'
})
console.log(code.code);

// var _jsxRuntime = require("react/jsx-runtime");
// (0, _jsxRuntime.jsxs)("h1", {
//   id: "title",
//   children: "world"
// });


// /*#__PURE__*/
// React.createElement("h1", {
//     id: "title"
//   }, /*#__PURE__*/React.createElement("span", {
//         id: "spanid"
//     }, /*#__PURE__*/React.createElement("div", {id: "divid"}, "div"),
//    "hello"), "world");