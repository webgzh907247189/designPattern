// https://juejin.im/post/5c611c73f265da2d8f47159b (js小技巧)
/**
 * 数字补0操作
 */
{
    var addZero1 = void 0;
    addZero1 = function (num, len) {
        if (len === void 0) { len = 2; }
        return ("0" + num).slice(-len);
    };
    addZero1(3); // 03
    addZero1(30, 2); // 30
}
{
    function addZero2(num, len) {
        if (len === void 0) { len = 2; }
        return ("" + num).padStart(len, '0');
    }
    addZero2(32, 4); // 0032
}
// https://juejin.im/post/5c6247ebe51d45012c3cc6a7
/**
 * 如何 clone 一个正则
 */
{
    var regexp1 = void 0;
    regexp1 = new RegExp('xyz', 'imgyus');
    // 等价于
    var regexp2 = void 0;
    regexp2 = /xyz/imgyus;
    var source = regexp2.source;
    // => "xyz"
    var flags = regexp2.flags; // (正则对象转化为字符串时，其修饰符排序是按字母排序的)
    // => "gimsuy"
    // lastIndex 表示每次匹配时的开始位置。 使用正则对象的 test 和 exec 方法，而且当修饰符为 g 或 y 时， 对 lastIndex 是有影响的
    var regexp = /\d/g;
    regexp.lastIndex;
    // => 0 
    regexp.test("123");
    // => true
    regexp.lastIndex;
    // => 1
    regexp.test("1");
    // => false
}
{
    var reFlags_1 = /\w*$/;
    var cloneRegExp = void 0;
    cloneRegExp = function (regexp) {
        var result = new regexp.constructor(regexp.source, reFlags_1.exec(regexp));
        result.lastIndex = regexp.lastIndex;
        return result;
    };
    cloneRegExp(/xyz/gim);
}
