/**
 * 重学 TypeScript 系列教程
 *
 * https://mp.weixin.qq.com/s/y6C4R04mpvBmyV80p5WOug
 *
 *
 *
 * https://github.com/semlinker/awesome-typescript
 *
 * https://juejin.cn/post/7009046640308781063
 */
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
// 关键在extends上，如果不用扩展运算符进行返回，并后续覆盖属性的话，函数接收的参数如上述缩写，就会有问题
// 传入的参数 约束为  User 类型(覆盖范围大于 User 类型)， 返回也是 T 类型， 直接返回 User 类型，可能返回的不全
function makeCustomer(u) {
    return __assign(__assign({}, u), { id: u.id, kind: "customer" });
}
// let ss: ReturnMake1 = { id: 1, kind: "1" };
function makeCustomer1() {
    return 11;
    // return {
    //   id: 1,
    //   kind: "customer",
    // };
}
function makeCustomer2() {
    return {
        id: 1,
        kind: "customer",
    };
}
function makeCustomer3(u) {
    // return '11'
    return {
        id: u.id,
        kind: "customer",
    };
}
var s = makeCustomer1(); // 报错 { id: 1, kind: "2", sex: "1" }
// s
// s.kind
makeCustomer({ id: 1, kind: "2", sex: "1", eat: "111" });
