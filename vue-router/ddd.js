const loadUtils = require("loader-utils");
const path = require("path");

function makeMap(str, expectsLowerCase) {
  var map = Object.create(null);
  var list = str.split(",");
  for (var i = 0; i < list.length; i++) {
    map[list[i]] = true;
  }
  return expectsLowerCase
    ? function(val) {
        return map[val.toLowerCase()];
      }
    : function(val) {
        return map[val];
      };
}

var isHTMLTag = makeMap(
  "html,body,base,head,link,meta,style,title," +
    "address,article,aside,footer,header,h1,h2,h3,h4,h5,h6,hgroup,nav,section," +
    "div,dd,dl,dt,figcaption,figure,picture,hr,img,li,main,ol,p,pre,ul," +
    "a,b,abbr,bdi,bdo,br,cite,code,data,dfn,em,i,kbd,mark,q,rp,rt,rtc,ruby," +
    "s,samp,small,span,strong,sub,sup,time,u,var,wbr,area,audio,map,track,video," +
    "embed,object,param,source,canvas,script,noscript,del,ins," +
    "caption,col,colgroup,table,thead,tbody,td,th,tr," +
    "button,datalist,fieldset,form,input,label,legend,meter,optgroup,option," +
    "output,progress,select,textarea," +
    "details,dialog,menu,menuitem,summary," +
    "content,element,shadow,template,blockquote,iframe,tfoot"
);

const cusVueLoader = function(source) {
  let val = this.value;
  console.log(val, "val");

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

cusVueLoader.pitch = function(remainingRequest, precedingRequest, source) {
  const resourcePath = this.resourcePath;
  const data = this.data;
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
};

module.exports = cusVueLoader;
