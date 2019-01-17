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
    console.log(c); // 拿到下标
}
