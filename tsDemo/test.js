"use strict";
/**
 * 泛型
 */
function hello(arg) {
    return arg;
}
var myhello = hello;
myhello('111');
function he1(arg) {
    return arg;
}
var listTest11 = he1(['2', '44']);
var listTest22 = he1(['2', '44']);
/**
 * 泛型
 *
 * 不需要手动的传入的参数的类型（string），因为编译器可以识别到传递了什么参数，并自动决定什么类型最适合它
 */
function test1(args) {
    var arr = [];
    arr.push(args);
    return arr;
}
var arrayFromString = test("beep");
console.log(arrayFromString[0]); // "beep"
console.log(typeof arrayFromString[0]); // String
var arrayFromNumber = test(42);
console.log(arrayFromNumber); // 42
console.log(typeof arrayFromNumber); // number
