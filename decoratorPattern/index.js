/**
 * 装饰者模式的定义：在不改变对象自身的基础上，在程序运行期间给对象动态地添加方法
 * 装饰者模式适用的场景：原有方法维持不变，在原有方法上再挂载其他方法来满足现有需求；
 * 函数的解耦，将函数拆分成多个可复用的函数，再将拆分出来的函数挂载到某个函数上，实现相同的效果但增强了复用性。
 */
Function.prototype.before = function(beforefn) {
    var self = this;    //保存原函数引用

    return function(){  //返回包含了原函数和新函数的 '代理函数'
        beforefn.apply(this, arguments);    //执行新函数，修正this
        return self.apply(this,arguments);  //执行原函数
    }
}

Function.prototype.after = function(afterfn) {
    var self = this;
    
    return function(){
        var ret = self.apply(this,arguments);
        afterfn.apply(this, arguments);
        return ret;
    }
}

var func = function() {
    console.log('2');
}

//func1和func3为挂载函数
var func1 = function() {
    console.log('1');
}

var func3 = function() {
    console.log('3');
}

func = func.before(func1).after(func3);
/** func为   按照顺序执行,保存之前的引用*/
// function(){
//     var ret = self.apply(this,arguments);
//     afterfn.apply(this, arguments);
//     return ret;
// }

func();










/**
 * AOP
 */
{
    Function.prototype.before = function(fn){
        let that = this
        return function(...relayArgs){
            let result = that.apply(null,relayArgs)
            return fn.call(null,result)
        }
    }

    Function.prototype.after = function(fn){
        let that = this
        return function(...relayArgs){
            let result = fn.apply(null,relayArgs)
            return that.call(null,result)
        }
    }

    let compose = function(...args){
        let lastFn = args.pop()
        let countdownSecondFn = args.pop()

        if(args.length){
            return args.reverse().reduce((result,fn)=>{
                
                // return result.before(fn)
                return fn.after(result)

            },lastFn.before(countdownSecondFn))
        }

        return lastFn.before(countdownSecondFn)
    }

    let greeting = (firstName, lastName) => ` hello, ${firstName} ${lastName}`;
    let toUpper = str => str.toUpperCase();
    let trim = str => str.trim()
    let test = str => `${str} + 1`

    let fns = compose(toUpper, greeting)
    let result = fns('  jack  ', 'smith  ')
    console.log(result)  // HELLO,   JACK   SMITH

    let fnTest = compose(trim, toUpper, greeting)
    let resultTest = fnTest('  jack  ', 'smith  ')
    console.log(resultTest)  // HELLO,   JACK   SMITH
}