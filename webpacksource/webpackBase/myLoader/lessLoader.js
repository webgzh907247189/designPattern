
let less = require('less')
module.exports = function(source){
    let css;
    // render 其实是同步的方法，看起来是异步的方法
    less.render(source, (err, result)=> {
        css = result.css
    })
    return css;
}

// 传参
// module.exports = function(source){
//     less.render(source, (err, result)=> {
//         this.callback(null, result.css)
//     })
// }