
return h("ul",
    { id: "filmList", className: "list" },
    h("li",{ className: "main" },"Detective Chinatown Vol 2"),
    h("li",null,"Ferdinand"),
    h("li",null,"Paddington 2")
);

//第一个参数是node的类型，比如ul,li，第二个参数是node的属性，之后的参数是node的children，假如child又是一个node的话，就会继续调用h函数