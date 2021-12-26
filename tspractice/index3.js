/**
 * https://gitee.com/martsforever-study/typescript-practice/blob/master/exercises/part_03.md
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
{
}
{
}
{
}
{
}
{
    var a = __assign({}, {});
    console.log(a.el.scrollTop, a.age.toFixed(0), a.flag.valueOf());
    // console.log(a.el.charAt(0))     // error
}
{
}
{
}
{
}
{
    // 实现类型Connect，要求 Connect<Module> 的结果为上面的 Result
    // 只要函数类型的属性；
    // 如果函数是异步函数，要求自动解析出来Promise中的类型；
}
{
    function Component(props) {
        return />;
    }
    var a = id;
    "abc";
    info /  >
    ; //correct
    var b = id;
    "abc";
    success /  >
    ; //correct
    var c = id;
    "abc" /  >
    ; //wrong
    var d = id;
    "abc";
    info;
    success /  >
    ; //wrong
    // 组件Component所接收的属性，有且只有一个 "info" | "success" | "warning" | "error" 中的值；
}
{
    // {a: string} & {b: string} & {c: string}
}
{
}
{
}
