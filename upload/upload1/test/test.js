// const { throttle } = require('./index')

// setTimeout(() => {
//     throttle(()=>{
//         console.log('3333')
//     },5000)();
// }, 1000);

// (async () => {
//     await import('./index.mjs');
// })();


{
    const money = '12312';
    const numMoney = money * 1;

    function a(ctx,next){
        console.log(ctx,next)
        if (Number.isNaN(ctx.numMoney)) {
            console.log('请输入合法的数字')
            return;
        }
        return next()
    }

    function b(ctx,next){
        console.log(ctx)
        if (ctx.numMoney <= 0) {
            console.log('退款金额必须大于0')
            return;
        }
        return next()
    }

    function c(ctx,next){
        console.log(ctx)
        if (ctx.numMoney >= ctx.xxx) {
            console.log('输入的退款金额，不能超过对应记录的购买会员的金额')
            return;
        }
        return next()
    }

    class App{
        constructor(){
            this.middleware = [];
        }

        use(fn){
            this.middleware.push(fn);
            return this;
        }

        compose(ctx){
            let idx = 0;
            const middleware = this.middleware;
            return dispatch(idx)
           
           function dispatch(idx){
                if(idx >= middleware.length){
                    return true;
                }
                const itemFn = middleware[idx]
                return itemFn(ctx,() => dispatch(idx+1))
            }
        }
    }

    const app = new App()
    app.use(a).use(b).use(c)
    var s = app.compose({
        numMoney: -131,
        xxx: 13
    })
    console.log(s)
}
