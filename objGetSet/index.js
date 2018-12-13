/**
 * 携程的意思是会加速访问
 */
{
    let obj = {
        _a: 'aa',
        get a(){
            return this._a
        },
        set a(val){
            this._a = val
        }
    }   
    console.log(obj.a) // 'aa'
    obj.a = '??/'
    console.log(obj)  //{_a: 'aa', a: 'aa'}
}


{
    let obj = {
        a: 'aa',
        get a(){
            return '12321'
        }
    }   
    console.log(obj.a) // '12321'
    obj.a = '??/'
    console.log(obj)  //{a: "12321", get a: ƒ a()}
}










/**
 * https://juejin.im/post/5bfbbe2df265da61407e95a3
 */


{
    let str = 'abc';

    for (var i in str) {
        console.log(str[i]);
    }
    /**
     * a
     * b
     * c
     */
}


{
    let arr = ['a','b','c'] ;
    arr.forEach(function(value, index, arr) {
        if (index === 1) {
            break;
        } else {
            console.log(value);
        }
    });
    /**
     * 报错
     * 在函数内用break让函数结束？？？   所以报错
     */
}










{
    let obj = {a: 11,b: 22}

    let o = {...obj,get a(){
        throw new Error()
    }}
    
    console.log(o)

    // {
    //     a: [Exception: Error at Object.get a [as a] (<anonymous>:5:15) at Object.remoteFunction (<anonymous>:2:14)],
    //     b: 22
    // }
}


{
    let obj = {a: 11,b: 22}

    let o = {...obj,...{get a(){
        throw new Error()
    }}}

    /**
     * 报错
     */
}