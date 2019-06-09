let co = require('co')

// {
//     function *ge() {
//         var result = yield Promise.resolve(true);
//         return result;
//     }

//     let r = ge()
//     let a = r.next()
//     let b = r.next('参数2')

//     console.log(a)
//     console.log(b)
// }



{
    function *ge() {
        var result = yield Promise.resolve(true);
        let r = yield Promise.resolve(111);
        return r;
    }

    co(ge).then(function (value) {
        console.log(value,'co');
    }, function (err) {
        console.error(err.stack,'co error');
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


