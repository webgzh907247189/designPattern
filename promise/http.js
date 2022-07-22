{
    let s = new Promise((r, j) => {
        r('???')
    }).then(() => {
        console.log('11')
        return Promise.reject('sssss')
    }, () => {

        console.log('22')
    })

    s.then(() => {
        console.log('33')
        
    }).catch(() => {

        console.log('44')
    })
    // 11 44
}


{
    let s = new Promise((r, j) => {
        r('???')
    }).then(() => {
        console.log('11')
        return Promise.reject('sssss')
    }).catch(() => {
    
        console.log('22')
    })
    
    s.then(() => {
        console.log('33')
        
    }).catch(() => {
    
        console.log('44')
    })
    // 11 22 33
}