// https://juejin.im/post/5c611c73f265da2d8f47159b (js小技巧)
/**
 * 代码复用 (组件)
 */
{
    var schema = {
        name: {
            required: true
        },
        sex: {
            required: true
        }
    };
    var validate = void 0;
    validate = function (schema, val) {
        for (var _i = 0, _a = Object.keys(schema); _i < _a.length; _i++) {
            var item = _a[_i];
            if (schema[item]['required']) {
                if (!val[item]) {
                    return false;
                }
            }
        }
        return true;
    };
    var result1 = validate(schema, { name: 'xx', sex: 'zz' });
    var result2 = validate(schema, { sex: 'xx' });
    var result3 = validate(schema, { sex1: 'xx' });
    console.log(result1 + ",result1," + result2 + ",result2," + result3 + ",result3");
}
/**
 * 校验规则 (传入的每个字段进行校验)
 *
 * 当有一个校验失败，此字段不在校验，进行下一个字段校验
 */
{
    var schema = {
        name: [
            { required: true, message: '姓名必填1' },
            {
                rule: function (data) {
                    // console.log(data,'data')
                    return false;
                },
                message: '姓名校验2'
            }
        ],
        sex: [
            { required: true, message: '性别必填1' },
            { rule: /^\d{2}$/, message: '性别校验2' },
            {
                rule: function (data) {
                    // console.log(data,'data')
                    return true;
                },
                message: '姓名校验3'
            }
        ]
    };
    var validate = void 0;
    validate = function (schema, val) {
        return Object.keys(schema).reduce(function (resultList, item) {
            var validateResult = schema[item].find(function (validateItem) {
                var ruleType = Object.prototype.toString.call(validateItem.rule).slice(8, -1);
                if (validateItem['required']) {
                    if (!val[item]) {
                        return validateItem;
                    }
                }
                if (ruleType === 'RegExp') {
                    return validateItem.rule.test(val[item]) ? undefined : validateItem;
                }
                if (ruleType === 'Function') {
                    // Reflect.apply(validateItem.rule,null,[val])
                    return validateItem.rule.apply(null, [val]) ? undefined : validateItem;
                }
            });
            if (validateResult) {
                resultList.push(validateResult);
            }
            return resultList;
        }, []);
    };
    var result1 = validate(schema, { name: 'xx', sex: 'zz' });
    var result2 = validate(schema, { sex: '12' });
    var result3 = validate(schema, { sex1: '2' });
    console.log(result1, 'result1', result2, 'result2', result3, 'result3');
    // result1 [{rule: ƒ, message: "姓名校验2"},{rule: /^\d{2}$/, message: "性别校验2"}]
    // result2 [{required: true, message: "姓名必填1"}]
    // result3 [{required: true, message: "姓名必填1"},{required: true, message: "性别必填1"}]
}
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
/**
 * 精确到指定位数的小数 (注意 as any 部分)
 *
 * 第二个函数适合多种情况 (字符串取指定位数的小数)
 */
{
    var round = void 0;
    round = function (num, n) {
        if (n === void 0) { n = 2; }
        return (Math.round(num + "e" + n) + "e-" + n) * 1; // 注意，此处的  e- 没有空格
    };
}
{
    var round = void 0;
    round = function (num, n) {
        if (n === void 0) { n = 2; }
        return (Math.round(parseFloat(num) + "e" + n) + "e-" + n) * 1; // 注意，此处的  e- 没有空格
    };
    //round('1.23123sadsad',2) =>  1.23
}
/**
 * 判断奇偶数
 */
{
    var num = 3;
    !!(num & 1); // true
    !!(num % 2); // true
}
/**
 * 取整 (不涉及四舍五入)
 */
{
    1.3 | 0 // 1 
        - 1.3 | 0; // -1
}
/**
 *  双位运算符 ~~ (针对负数存在问题)
 */
{
    Math.floor(4.9) === 4; //true
    // 简写为：
    ~~4.9 === 4; //true
    //对正数来说 ~~ 运算结果与 Math.floor( ) 运算结果相同，而对于负数来说不相同
    ~~4.5; // 4
    Math.floor(4.5); // 4
    ~~-4.5; // -4
    Math.floor(-4.5); // -5
}
{
    parseFloat('1.213asdsa'); // 1.213 (取数字部分)
    parseFloat(-4.5); //-4.5
}
/**
 * 使用Boolean过滤数组中的所有假值
 */
{
    var source = [0, 1, false, 2, '', 3, 'a', 'e' * 23, NaN, 's', 34, function () {
            return 1;
        }];
    function compact(arr) {
        return arr.filter(Boolean);
    }
    var result = compact(source);
    console.log(result); // [1, 2, 3, "a", "s", 34, ƒ]
}
/**
 *  object强制转化为string
 */
{
    // 字符串+Object 的方式来转化对象为字符串(实际上是调用 .toString() 方法)
    'the Math object:' + Math; // "the Math object:[object Math]"
    'the JSON object:' + JSON; // "the JSON object:[object JSON]"
    //可以覆盖对象的toString和valueOf方法来自定义对象的类型转换
    2 * { valueOf: function () { return '3'; } }; // 6
    'J' + { toString: function () { return 'S'; } }; // "JS"
    /**
     * 当+用在连接字符串时，当一个对象既有toString方法又有valueOf方法时候，
     * JS通过盲目使用valueOf方法来解决这种含糊。
     *
     * 对象通过valueOf方法强制转换为数字，通过toString方法强制转换为字符串
     */
    '' + { toString: function () { return 'S'; }, valueOf: function () { return 'J'; } }; // J
}
/**
 *  string强制转换为数字
 */
{
    // 用*1来转化为数字(实际上是调用.valueOf方法) 然后使用Number.isNaN来判断是否为NaN，或者使用 a !== a 来判断是否为NaN，因为 NaN !== NaN
    // Object.is(NaN,NaN)  -> true
    '32' * 1; // 32
    'ds' * 1; // NaN
    null * 1; // 0
    undefined * 1; // NaN
    1 * { valueOf: function () { return '3'; } } // 3
        // 也可以使用+来转化字符串为数字
        + '123' // 123
        + 'ds' // NaN
        + '' // 0
        + null // 0
        + undefined // NaN
        + { valueOf: function () { return '3'; } }; // 3
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
