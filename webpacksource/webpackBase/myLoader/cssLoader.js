// body {
//     color: red;
//     background: url('./xxx')
// }

{
    const reg = /url\((.+?)\)/g;
    const str = '123url("./xxx")456';
    const result = reg.exec(str);
    console.log(result, reg.lastIndex);
    // [
    //     'url("./xxx")',
    //     '"./xxx"',
    //     index: 3,
    //     input: '123url("./xxx")456',
    //     groups: undefined
    // ] 15
}
module.exports = function(source){
    let reg = /url\((.+?)\)/g;

    let idx = 0;
    let current
    let arr = ['let list = []']
    while(current = reg.exec(source)){
        let [matchUrl, g] = current

        let last = reg.lastIndex - matchUrl.length

        arr.push(`list.push(${JSON.stringify(source.slice(idx, last))})`)

        idx = reg.lastIndex
        // 把 g 替换成为 requiere 写法
        arr.push(`list.push('url('+require(${g})+')')`)
    }
    arr.push(`list.push(${JSON.stringify(source.slice(idx))})`)
    arr.push(`module.exports = list.join('')`);
    
    return arr.join('');
}