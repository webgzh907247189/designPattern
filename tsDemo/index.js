"use strict";
/**
 * npm install typescript -g
 * tsc --version
 *
 * tsc --init：它是一个TypeScript项目的配置文件，可以通过读取它来设置TypeScript编译器的编译参数。
 *
 * 运行tsc，它会在当前目录或者是父级目录寻找tsconfig.json文件。
 * 运行 tsc -p ./greeter.ts.当然，这个路径可以是绝对路径，也可以是相对于当前目录的相对路径。
 * 使用tsc -w来启用TypeScript编译器的观测模式，在监测到文件改动之后，它将重新编译。
 *
 *
 *
 * https://juejin.im/post/5c3eca17f265da61461e6707
 */
function greeter(person) {
    return "Hello " + person;
}
var user = "Jane User";
var result = greeter(user);
{
    var bool = void 0;
    bool = false;
}
{
    var arr = void 0; //数组泛型
    arr = [1, 2, 3];
    var arr1 = void 0;
    arr1 = ['1', '2'];
}
{
    /**
     * 元组类型允许表示一个已知元素数量和类型的数组，各元素的类型不必相同。
     */
    var arrList = void 0;
    arrList = ['1', 2];
    // console.log(arrList[1].substr(1)) // error 没有 substr 方法
    // arrList[2] = 'false' //error
}
{
    var Color = void 0;
    (function (Color) {
        Color[Color["Red"] = 0] = "Red";
        Color[Color["Yellow"] = 1] = "Yellow";
        Color[Color["Pink"] = 2] = "Pink";
    })(Color || (Color = {}));
    var c = Color.Pink;
    console.log(c); // 拿到下标 (默认情况下，从0开始为元素编号。你也可以手动的指定成员的编号。)
}
{
    /**
     * 全部手动赋值 (下标)
     */
    var Color = void 0;
    (function (Color) {
        Color[Color["Red"] = 1] = "Red";
        Color[Color["Green"] = 2] = "Green";
        Color[Color["Blue"] = 4] = "Blue";
    })(Color || (Color = {}));
    var c = Color.Green;
}
{
    var Color = void 0;
    (function (Color) {
        Color[Color["Red"] = 2] = "Red";
        Color[Color["Yellow"] = 3] = "Yellow";
        Color[Color["Pink"] = 4] = "Pink";
    })(Color || (Color = {}));
    var name_1 = Color[3];
    console.log(name_1);
}
{
    var Color = void 0;
    (function (Color) {
        Color["Red"] = "r";
        Color["Green"] = "g";
        Color["Blue"] = "b";
    })(Color || (Color = {}));
    var c = Color.Green;
    console.log(c); // g
    var colorName = Color[2];
    console.log(colorName); // undefined
}
{
    var str = void 0;
    str = 22132;
    str = false;
}
{
    var num = void 0;
    var bool = void 0;
    var str = void 0;
    var str1 = void 0;
    // num = null  //error
    // bool = undefined  //error
    // str = null
    str = undefined;
    // str1 = '123' //error
    str1 = null;
}
/**
 *
 * 使用 :void来表示一个函数没有一个返回值
 */
function loginfo(message) {
    console.log(message);
}
loginfo('11');
/**
 * 泛型  (参数类型与返回值类型是相同的)
 */
function test(arg) {
    return arg;
}
test(1); //(类型推论--即编译器会根据传入的参数自动的帮助我们确定T的类型)
test(100); //(传入所有的参数，包含类型参数)
/**
 *  使用泛型变量
 */
function list(arg) {
    return arg;
}
list([123]);
function listTest(arg) {
    return arg;
}
list(['123']);
function listReverse(arg) {
    return arg.reverse();
}
var sample = [1, 2, 3];
var reversed = listReverse(sample);
// reversed[0] = '1' // error
// reversed = ['1', '2']; // Error
reversed = [7, 8, 89];
function listReverseTwo(arg) {
    return arg.reverse();
}
var slist = [1, '2', 3];
var reversedList = listReverseTwo(slist);
// reversedList = [7,8,false] // Error
// reversedList[0] = true     // Error
reversedList = [7, 8, '123'];
{
    /**
     * 联合类型   (用|分隔每个类型)
     */
    var myFavoriteNumber = void 0;
    myFavoriteNumber = 'seven';
    myFavoriteNumber = 7;
    // myFavoriteNumber = true  //error
}
/**
 * error  (length不是string和number的共有属性,所以会报错)
 */
// function getLength(something:string|number):number{
//     return something.length
// }
function getLength(something) {
    return something.toString();
}
{
    /**
     * 联合类型的变量在被赋值的时候，会根据类型推论的规则推断出一个类型
     */
    var myFavoriteNumber = void 0;
    myFavoriteNumber = 'seven';
    console.log(myFavoriteNumber.length);
    myFavoriteNumber = 7;
    // console.log(myFavoriteNumber.length) // error 类型“number”上不存在属性“length”。
}
function format(cmd) {
    var line = '';
    if (Array.isArray(cmd)) {
        line = cmd.join(' ').trim();
    }
    else {
        line = cmd.trim();
    }
}
