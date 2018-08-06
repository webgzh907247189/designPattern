
/**
 * https://segmentfault.com/a/1190000014572815
 * @type {String}
 * vdom
 */

function view() {
  return h("ul", { id: "filmList", className: "list" }, h("li", { className: "main" }, "Detective Chinatown Vol 2"), h("li", null, "Ferdinand"), h("li", null, "Paddington 2"));
}

function flatten(arr) {
  return [].concat(...arr);
}

function h(type, props, ...children) {
  return {
    type,
    props: props || {},
    children: flatten(children)
  };
}

function render(el) {
  el.appendChild(createElement(view(0)));
}

function createElement(node) {
  if (typeof node === 'string') {
    return document.createTextNode(node);
  }

  let { type, props, children } = node;
  const el = document.createElement(type);
  setProps(el, props);

  children.map(createElement).forEach(el.appendChild.bind(el));
  return el;
}

function setProp(target, name, value) {
  if (name === 'className') {
    return target.setAttribute('class', value);
  }
  target.setAttribute(name, value);
}

function setProps(target, props) {
  Object.keys(props).forEach(key => {
    setProp(target, key, props[key]);
  });
}

/**
 * babel-cli和babel-plugin-transform-react-jsx这两个库，前者提供Babel的命令行功能，后者主要帮我们把jsx转化成js。
 *
 * 
 * babel的配置文件中，我们指定transform-react-jsx这个插件将转化后的函数名设置为h。
 * 默认的函数名是React.createElement，我们不依赖react，所以显然换个自己的名字更合适。
 *
 * 
 * h函数接收的参数，第一个参数是node的类型，比如ul,li，第二个参数是node的属性，之后的参数是node的children，假如child又是一个node的话，就会继续调用h函数
 *
 * 
 */
