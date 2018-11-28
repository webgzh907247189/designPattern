/**
 * https://juejin.im/post/5bfd4e9de51d457edf4095c7
 */
{
    let styleList = [
        'color: red',
        'font-size: 16px',
        'background: #fff'
    ]

    let str = 'hello word'
    console.log('%c%s',styleList.join(';'),`${str}`)
}

{
    let styleList = [
        'color: red',
        'font-size: 26px',
        'background: #fff'
    ]

    let styleList2 = [
        'color:green',
        'font-size: 26px'
    ]


    let str = 'hello word'
    console.log('%c%s,%c%s',styleList.join(';'),`${str}`,styleList2.join(';'),'11')
}