/**
 * https://juejin.im/post/5c6bab91f265da2dd94c9f9e
 */
// 防抖 (规定时间内回调函数只能执行一次，如果在规定时间内又触发了该事件，则会重新开始算规定时间)
{
    function debounce(fun, delay = 1000, immediate = true) {
        let timer = null; //保存定时器
        return function (args) {
            let that = this;
            let _args = args;
            if (timer)
                clearTimeout(timer); //不管是否立即执行都需要首先清空定时器
            if (immediate) {
                if (!timer) {
                    fun.call(that, _args);
                } //如果定时器不存在,则说明延时已过,可以立即执行函数
                //不管上一个延时是否完成,都需要重置定时器
                timer = setTimeout(function () {
                    timer = null; //到时间后,定时器自动设为null,不仅方便判断定时器状态还能避免内存泄露
                }, delay);
            }
            else {
                //如果是非立即执行版,则重新设定定时器,并将回调函数放入其中
                timer = setTimeout(function () {
                    fun.call(that, _args);
                }, delay);
            }
        };
    }
    ;
    function b() {
        console.log('111');
    }
    var result1 = debounce(b);
    result1();
    result1();
    result1();
}
