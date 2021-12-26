// https://juejin.cn/post/7016298598883131423
// promise 中断
// 字典树

{
    async function async1() {
        console.log('async1 start') // 2
        await async2()
        console.log('async1 end') // 7
    }

    async function async2() {
        console.log('async start') // 3
        return new Promise((resolve, reject) => {
            resolve()
            console.log('async2 promise') // 4
        })
    }

    console.log('script start') // 1
    setTimeout(() => {
        console.log('setTimeout') // 10
    }, 0);

    async1()

    new Promise((resolve) => {
        console.log('promise1') // 5
        resolve()
    }).then(() => {
        console.log('promise2') // 8
    }).then(() => {
        console.log('promise3') // 9
    })
    console.log('script end') // 6
    // 浏览器的执行顺序     自己理解的顺序
    // script start       script start
    // async1 start       async1 start
    // async start        async start
    // async2 promise     async2 promise
    // promise1           promise1
    // script end         script end
    // promise2           async1 end
    // promise3           promise2
    // async1 end         promise3
    // setTimeout         setTimeout
}



{
    // 第一种
    const p = new Promise((resolve, reject) => {
        resolve()
    }).then(() => console.log(1)).then(() => console.log(2))

    // 第二种
    const p = new Promise((resolve, reject) => {
        resolve()
    })
    p.then(() => console.log(1))
    p.then(() => console.log(2))

}



// 6
{
    async function async1() {
        console.log(1); // 2
        await async2();
        console.log(2); //7
    }
    async function async2() {
        console.log(3); // 3
    }
    console.log(4); // 1
    setTimeout(function () {
        console.log(5);// 8
    });
    async1()
    new Promise(function (resolve, reject) {
        console.log(6); // 4
        resolve();
    }).then(function () {
        console.log(7);// 6
    });
    console.log(8); // 5

    // 浏览器的执行顺序     自己理解的顺序
    // 4，1，3，6，8    2，7    5
    // 4，1，3，6，8    7，2    5
}

// 5
{
    new Promise((resolve, reject) => {
        console.log(1) // 1
        resolve()
    }).then(() => {
        console.log(2) // 3
        new Promise((resolve, reject) => {
            console.log(3) // 4
            resolve()
        }).then(() => {
            console.log(4) // 7
        }).then(() => {
            console.log(5) // 8
        })
    }).then(() => {
        console.log(6) // 5
    })
    new Promise((resolve, reject) => {
        console.log(7) // 2
        resolve()
    }).then(() => {
        console.log(8) // 6
    })
    //  1 7 2 3 8 4 6 5
    //  1 7 2 3 6 8 4 5
}

// 3
{
    new Promise((resolve, reject) => {
        console.log(1)
        resolve()
    }).then(() => {
        console.log(2)
        new Promise((resolve, reject) => {
            console.log(3)
            resolve('111')
        }).then((d) => {
            console.log(4, d)
        }).then((d) => {
            console.log(5, d)
        })
    }).then(() => {
        console.log(6)
    })
    .then(() => {
        console.log(9)
    })

    // 1 2 3 4 6 5
    // 1 2 3 6 4 5
}