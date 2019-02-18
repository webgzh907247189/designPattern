"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
/**
 * Reflect.apply(func, thisArg, args) 方法等同于 Function.prototype.apply.call(func, thisArg, args)，用于绑定this对象后执行给定函数。
 */
function getString(arr) {
    return Reflect.apply(JSON.stringify, null, arr);
}
getString([{ name: 'sadsad' }]);
// Reflect.apply(JSON.stringify,null, [ [{name: '2132'},{sex: '2132'}] ])   (数组多一个数组包裹)
// "[{"name":"2132"},{"sex":"2132"}]"
