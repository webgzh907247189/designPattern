const code = `
function Com(params) {
    return <div>test</div>
}

function App(params) {
    return <div>
        <Com/>
        <span>123123</span>
    </div>
}
`

const babelCore = require("@babel/core");
let resultCode = babelCore.transformSync(code, {
    plugins: [["@babel/plugin-transform-react-jsx", {
        // "pragma": "h1h", // default pragma is React.createElement
        // "runtime": "automatic", // classic | automatic, defaults to classic
    }]],
});
console.log(resultCode.code);

// 函数名字区分大小写， 大写的话 就是组件，小写被当作 字符串来处理
// React.createElement(Com, null)  ->  React.createElement('Com', null)
// function Com(params) {
//     return /*#__PURE__*/React.createElement("div", null, "test");
// }
// function App(params) {
//     return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(Com, null), /*#__PURE__*/React.createElement("span", null, "123123"));
// }



// 使用 runtime 为 automatic 的效果
// import { jsx as _jsx } from "react/jsx-runtime";
// import { jsxs as _jsxs } from "react/jsx-runtime";
// function Com(params) {
//   return /*#__PURE__*/_jsx("div", {
//     children: "test"
//   });
// }
// function App(params) {
//   return /*#__PURE__*/_jsxs("div", {
//     children: [/*#__PURE__*/_jsx(Com, {}), /*#__PURE__*/_jsx("span", {
//       children: "123123"
//     })]
//   });
// }