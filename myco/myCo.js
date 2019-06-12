function myCo(fn){
    fn = fn()
    return new Promise((resolve,reject) => {
        onFulfilled()
    
        function onFulfilled(v){
            var ret = fn.next(v)
            console.log(ret,'ret')
            next(ret)
        }

        function next(ret){
            if(!ret.done){
                ret.value.then((v)=>{
                    onFulfilled(v)
                })
            }else{
                return resolve(ret.value)
            }
        }

    })
}

module.exports = myCo