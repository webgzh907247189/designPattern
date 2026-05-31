const loadUtils = require("loader-utils");
const path = require("path");

const cusVueLoader = function(source) {
  let val = this.value;
  console.log(val, "val", source);

  const resourcePath = this.resourcePath;
  const rootContext = this.rootContext;
  const relativePath = path.posix.relative(rootContext, resourcePath);
  source = source.replace(/<div/g, `<div data-comPath="${relativePath}"`);

  let cb = this.async();
  cb(null, source);
};

// remainingRequest, precedingRequest, data

// a -> b -> c
// remainingRequest  ->  /Users/fer/webpack-loader-demo/loaders/c-loader.js!/Users/fer/webpack-loader-demo/src/data.txt #剩余请求
// precedingRequest  ->  /Users/fer/webpack-loader-demo/loaders/a-loader.js #前置请求
// {} #空的数据对象

// cusVueLoader.pitch = function(remainingRequest, precedingRequest, source) {
//   const resourcePath = this.resourcePath;
//   const data = this.data;
  //   const ss = loadUtils.stringifyRequest(this)
  //   console.log(ss, 'sss')

  // if (resourcePath.indexOf('node_modules') === -1) {
  //   const options = loadUtils.getOptions(this);
  // const context = this.context
  //   const rootContext = this.rootContext;
  //   const relativePath = path.posix.relative(rootContext, resourcePath);

  //   source = source.replace(/<div/, `<div data-comPath="${relativePath}"`);

  //   console.log(source, "source", this.data);
  //   // }

  //   let cb = this.async();
  //   cb(null, source);
  // return ''
// };

module.exports = cusVueLoader;
