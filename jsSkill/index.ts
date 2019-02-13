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
 * 精确到指定位数的小数
 */

{   
    interface r {
        (
            num: number,
            n?: number
        ): string
    }
    let round: r
    round = (num:number,n=2) => {
        return (`${ `${num}e${n}` * 1 }e-${n}`)*1   // 注意，此处的 - 没有空格
        // return `${ `${num}e${n}` * 1 }e-${n}` * 1
        // return `${ `${num}e${n}`*1 }`e-`${n}`  
    }

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

{
    // lodash 的实现 clone 正则
    interface  regDemo{
        (regexp: RegExp): RegExp
    }

    const reFlags = /\w*$/
    let cloneRegExp: regDemo

    cloneRegExp = function (regexp: RegExp) {
        const result = new regexp.constructor(regexp.source, reFlags.exec(regexp))
        result.lastIndex = regexp.lastIndex
        return result
    }

    cloneRegExp(/xyz/gim)
}   