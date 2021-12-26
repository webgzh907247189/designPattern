{
    let str = '1234567890'

    const result = str.split('').reverse().reduce((prev,next,index) => {
        // index 从 1 开始
        return `${index % 3 ? next : next + ','}${prev}`;
    })

    console.log(result)
}


// 错误的示范
{
    let str = '1234567890'

    const result = str.split('').reverse().reduce((prev,next,index) => {
        // index 从 1 开始
        return `${index % 3 ? next : next + ','}${prev}`;
    }, '')

    console.log(result)
}


// promise 试题 + koa + express
{

}