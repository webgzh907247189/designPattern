let neo_async = require('neo-async')

let arr = [1,2,3]
console.time('start111')

neo_async.forEach(arr, (item, done) => {
    setTimeout(() => {
        done()
    }, 1000 * item)
}, () => {
    console.timeEnd('start111')
});


console.time('start222')
function neo_asyncFn(arr, cb, finalCallback){
    let total = arr.length
    const done = () => {
       if(--total == 0) finalCallback()
        
    }
    arr.forEach((item) => {
        cb(item, done)
    })
}
neo_asyncFn(arr, (item, done) => {
    setTimeout(() => {
        done()
    }, 1000 * item)
}, () => {
    console.timeEnd('start222')
});