let co = require('co')

{
    function* ge() {
        var result = yield Promise.resolve(true);
        return result;
    }

    let r = ge()
    let type = Object.prototype.toString.call(r)
    let typefn = Object.prototype.toString.call(ge)
    console.log(type, typefn) //[object Generator]     [object GeneratorFunction]

    let a = r.next()
    let b = r.next('参数2')

    console.log(a)
    console.log(b)
}



{
    function* ge() {
        var result = yield Promise.resolve(true);
        let r = yield Promise.resolve(111);
        return r;
    }

    co(ge).then(function (value) {
        console.log(value, 'co');
    }, function (err) {
        console.error(err.stack, 'co error');
    });
}




// {
//     var fn = co.wrap(function* (val) {
//         return yield Promise.resolve(val);
//     });

//     fn(true).then(function (val) {
//         console.log(val,'传参数的gen')
//     });
// }


{
    Promise.prototype.finally = function (callback) {
        let P = this.constructor;
        console.log(Promise.prototype.constructor === Promise) // true
        return this.then(
            value => P.resolve(callback()).then(() => value),
            reason => P.resolve(callback()).then(() => {
                throw reason
            })
        );
    };

    Promise.resolve('1').finally(function(d){
        console.log(d) // undefined
    })
}