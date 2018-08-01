
/**
 * https://segmentfault.com/a/1190000014572815
 * @type {String}
 *
 * 异步compose 结合题目 + 异步arr
 * vdom
 * 
 * arr  https://juejin.im/post/5b5a9451f265da0f6a036346#heading-0
 */
return h("ul",
    { id: "filmList", className: "list" },
    h("li",{ className: "main" },"Detective Chinatown Vol 2"),
    h("li",null,"Ferdinand"),
    h("li",null,"Paddington 2")
);

//第一个参数是node的类型，比如ul,li，第二个参数是node的属性，之后的参数是node的children，假如child又是一个node的话，就会继续调用h函数