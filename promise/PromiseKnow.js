{
    new Promise((resolve, reject) => {
        throw '?????'
    }).then((ddd) => {
        return ddd
    }).catch((d) => {
        console.log(d)
        throw '222'
    }).catch((d) => {
        console.log(d)
        throw '3333'
    }).catch((d) => {
        console.log(d)
        throw '4444'
    })
    /**
     * ?????
     * 222
     * 3333
     * Promise {<rejected>: "4444"}
     */
}

{
    new Promise(resolve => {
            setTimeout(() => {
                resolve();
            }, 1000)
        })
        .then(() => {
            console.log('start');
            throw new Error('test error')
        })
        .catch(err => {
            console.log('I carch', err);
            return 'zzzz'
        })
        .finally((data) => {
            // 参数无效 & 返回值无效
            console.log('finallyfinally', data)
            return 'gzh'
        })
        .then((s) => {
            // then 接收的值 来自 上面的 catch 返回的值
            console.log(s, 'attive here');
            return '...'
        })
        .then((data) => {
            console.log(data + 'and here');
        })
        .catch(err => {
            console.log('No,I catch', err)
        })

        /**
         * start
         * I carch Error: test error
         * finallyfinally undefined
         * zzzz attive here
         * ... and here
         */
}