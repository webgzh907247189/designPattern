/**
 * 前面两项分别是
 * node 的执行环境
 * node 的执行文件
 * 
 * 执行参数可以是 node  ./xxx.js a b c d    a,b,c,d 都是参数, 但是默认情况下 加 -- 代表约定的 参数 key
 * 类似于 commander yargs 库
 */
console.log(process.argv)

let args = process.argv.slice(2)

let r = args.reduce((result,item,index,arrList)=>{
    console.log(item)
    if(item.includes('--')){
        result[item.slice(2)] = arrList[index + 1]
    }
    return result
},Object.create(null))

console.log(r) // { color: 'red', name: 'testargs' }