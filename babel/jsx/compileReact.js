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

/**
 * https://zh-hans.reactjs.org/blog/2020/09/22/introducing-the-new-jsx-transform.html
 * 全新的 JSX 转换
 * 
 * 使用全新的转换，你可以单独使用 JSX 而无需引入 React。
 * 根据你的配置，JSX 的编译输出可能会略微改善 bundle 的大小。
 * 它将减少你需要学习 React 概念的数量，以备未来之需。
 */
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