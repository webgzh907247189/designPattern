/**
 * https://juejin.cn/post/6993445070611415070
 */

//  寄生式组合继承
function inheritPrototype(subType, superType) {
    let prototype = Object(superType.prototype); // 创建对象
    prototype.constructor = subType; // 增强对象
    subType.prototype = prototype; // 赋值对象
}


function SuperType(name) {
    this.name = name;
    this.colors = ["red", "blue", "green"];
}
SuperType.prototype.sayName = function () {
    console.log(this.name);
};

function SubType(name, age) {
    SuperType.call(this, name);
    this.age = age;
}
inheritPrototype(SubType, SuperType);
SubType.prototype.sayAge = function () {
    console.log(this.age);
};




// Sub.prototype = Object.create(Super.prototype);
// Sub.prototype.constructor = Sub;
// Sub.cid = cid++;