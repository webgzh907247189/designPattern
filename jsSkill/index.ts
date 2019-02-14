// https://juejin.im/post/5c611c73f265da2d8f47159b (js小技巧)


/**
 * 数字补0操作
 */
{
    interface funcDemo{
        (num: Number,len?: Number): string
    }

    let addZero1: funcDemo
    addZero1 = function (num: Number, len:Number = 2) {
        return (`0${num}`).slice(-len)
    }

    addZero1(3)     // 03
    addZero1(30,2)  // 30
}

{
    function addZero2 (num: Number, len: Number = 2): string {
        return ((`${num}`) as any).padStart(len , '0')
    }

    addZero2(32,4)  // 0032
}



/**
 * 精确到指定位数的小数 (注意 as any 部分)
 */

{   
    interface r {
        (
            num: number,
            n?: number
        ): number
    }
    let round: r
    round = (num:number,n=2) => {
        return `${Math.round(`${num}e${n}` as any)}e-${n}` as any * 1 // 注意，此处的  e- 没有空格
    }
}






/**
 * 判断奇偶数 
 */
{
    const num = 3;
    !!(num & 1)					// true
    !!(num % 2)					// true
}

/**
 * 取整 (不涉及四舍五入)
 */
{
    1.3 | 0   // 1 
    -1.3| 0   // -1
}

/**
 *  双位运算符 ~~ (针对负数存在问题)
 */
{
    Math.floor(4.9) === 4      //true
    // 简写为：
    ~~4.9 === 4      //true

    //对正数来说 ~~ 运算结果与 Math.floor( ) 运算结果相同，而对于负数来说不相同
    ~~4.5            // 4
    Math.floor(4.5)        // 4

    ~~-4.5        // -4
    Math.floor(-4.5)        // -5
}










/**
 * 使用Boolean过滤数组中的所有假值
 */
{   
    let source: Array<any> = [0, 1, false, 2, '', 3, 'a', 'e' as any * 23, NaN, 's', 34, ()=>{
        return 1
    }]

    function compact<T>(arr: T[]): T[]{
        return arr.filter(Boolean)
    }

    let result: Array<any> = compact(source)
    console.log(result) // [1, 2, 3, "a", "s", 34, ƒ]
}

/**
 *  object强制转化为string
 */
{
    // 字符串+Object 的方式来转化对象为字符串(实际上是调用 .toString() 方法)
    'the Math object:' + Math                // "the Math object:[object Math]"
    'the JSON object:' + JSON              // "the JSON object:[object JSON]"

    //可以覆盖对象的toString和valueOf方法来自定义对象的类型转换
    2  * ({ valueOf: ()=>'3' } as any)                // 6
    'J' + { toString: ()=>'S' }                // "JS"
    

    /**
     * 当+用在连接字符串时，当一个对象既有toString方法又有valueOf方法时候，
     * JS通过盲目使用valueOf方法来解决这种含糊。 
     * 
     * 对象通过valueOf方法强制转换为数字，通过toString方法强制转换为字符串
     */
    '' + {toString:()=>'S',valueOf:()=>'J'}                // J
}

/**
 *  string强制转换为数字
 */
{
    // 用*1来转化为数字(实际上是调用.valueOf方法) 然后使用Number.isNaN来判断是否为NaN，或者使用 a !== a 来判断是否为NaN，因为 NaN !== NaN
    // Object.is(NaN,NaN)  -> true
    '32' as any * 1                    // 32
    'ds' as any * 1                    // NaN
    null as any * 1                    // 0
    undefined as any * 1               // NaN
    1  * ({ valueOf: ()=>'3' } as any)       // 3

    // 也可以使用+来转化字符串为数字
    + '123'                   // 123
    + 'ds'                    // NaN
    + ''                      // 0
    + null                    // 0
    + undefined               // NaN
    + { valueOf: ()=>'3' }    // 3
}










// https://juejin.im/post/5c6247ebe51d45012c3cc6a7

/**
 * 如何 clone 一个正则 
 */
{
    let regexp1: RegExp 
    regexp1 = new RegExp('xyz', 'imgyus');
    // 等价于
    let regexp2: RegExp 
    regexp2 = /xyz/imgyus;



    let source = regexp2.source
    // => "xyz"

    let flags = (regexp2 as any).flags  // (正则对象转化为字符串时，其修饰符排序是按字母排序的)
    // => "gimsuy"




    // lastIndex 表示每次匹配时的开始位置。 使用正则对象的 test 和 exec 方法，而且当修饰符为 g 或 y 时， 对 lastIndex 是有影响的
    let regexp = /\d/g;

    regexp.lastIndex
    // => 0 
    regexp.test("123")
    // => true

    regexp.lastIndex
    // => 1
    regexp.test("1")
    // => false
}

// {
//     // lodash 的实现 clone 正则
//     interface  regDemo{
//         (regexp: RegExp): RegExp
//     }

//     const reFlags = /\w*$/
//     let cloneRegExp: regDemo

//     cloneRegExp = function (regexp: RegExp) {
//         const result = new regexp.constructor(regexp.source, reFlags.exec(regexp))
//         result.lastIndex = regexp.lastIndex
//         return result
//     }

//     cloneRegExp(/xyz/gim)
// }   