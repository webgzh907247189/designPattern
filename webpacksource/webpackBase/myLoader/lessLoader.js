
let less = require('less')
module.exports = function aa(source){
    let css;
    // render 其实是同步的方法，看起来是异步的方法
    less.render(source, (err, result)=> {
        css = result.css
    })
    return css;
}

// 传参
// module.exports = function(source){
//     const callback = this.async()
//     less.render(source, (err, result)=> {
//         callback(null, result.css)
//     })
// }


// console.log(module.exports(`
// @color: red;
// body {
//     background-color: @color
// }
// `))