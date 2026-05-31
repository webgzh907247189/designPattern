{
}
{
}
{
}
{
    // 测试用例
    var shouldPass = {}; // 可以正常赋值
    function takeSomeTypeOnly(x) { return x; }
    // 测试用例：
    var x_1 = { prop: 'a' };
    takeSomeTypeOnly(x_1); // 可以正常调用
    var y = { prop: 'a', addditionalProp: 'x' };
}
{
    // const aa: NonEmptyArray<string> = [] // 将出现编译错误
    var bb = ['Hello TS']; // 非空数据，正常使用
}
