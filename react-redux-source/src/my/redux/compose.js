function compose(...fns){
    if(fns.length == 0){
        return args => args
    }

    if(fns.length == 1){
        return (args) => fns[0](args)
    }

    return fns.reduce((a,b)=>{
        return (...args) => a(b(...args))
    })
}

export default compose

{
    const add = x => x + 10;
    const multiply = x => x * 10;

    const pipe = function(){
        const args = [].slice.apply(arguments);
        return function(x) {
          return args.reduce((res, cb) => cb(res), x);
        }
    }
      
    // 参数顺序改为从左往右
    let calculate = pipe(add, multiply);
    let res = calculate(2);
    console.log(res);    // 结果还是120
}

// {
//     function compose(...funcs) {
//         return funcs.reduce((a, b) => (...args) => a(b(...args)));
//     }

//     const otherDummyMiddleware = dispatch => {
//         // 返回一个新的dispatch
//         return ({type}) => {
//           console.log(`type in dummy is ${type}`);
//           return dispatch(type);
//         };
//     };
      
//     // 这个dispatch其实是otherDummyMiddleware执行后返回otherDummyDispatch
//     const typeLogMiddleware = dispatch => {
//         // 返回一个新的dispatch
//         return (type) => {
//           console.log(`type is ${type}`);
//           return dispatch(type);
//         };
//     };

//     const test = dispatch => {
//         // 返回一个新的dispatch
//         return (type) => {
//             console.log('test')
//             return dispatch(type);
//         };
//     };

//     function eat(...args){
//         console.log('11111', args);
//     }
//     const r = compose(otherDummyMiddleware, typeLogMiddleware, test)(eat);
//     console.log(r);
//     r({ type: 'test' })

//     // type in dummy is test
//     // type is test
//     // test
//     // 11111 ['test']
// }


// {
//     const r = action => {
//         console.log(`type in dummy is ${action}`);
//         return (type) => {
//             console.log(`type is ${type}`);
//             return(type) => {
//                 console.log('test')
//                 return eat(type);
//             };
//           };
//     };
    
//     r('test')
// }
