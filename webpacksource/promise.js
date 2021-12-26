Promise.resolve()
// then0
.then(() => {
    console.log(0);
    return Promise.resolve(4);
})
// then4
.then((res) => {
    console.log(res)
})


Promise.resolve()
// then1
.then(() => {
    console.log(1);
})
// then2
.then(() => {
    console.log(2);
})
// then3
.then(() => {
    console.log(3);
})
// then5
.then(() => {
    console.log(5);
})
// then6
.then(() =>{
    console.log(6);
})



// {
//     new Promise((resolve,reject) => {
//         console.log('外部promise')
//         resolve()
//     })
//     .then(() => {
//         console.log('外部第一个then')
//         new Promise((resolve,reject) => {
//             console.log('内部promise')
//             resolve()
//         })
//         .then(() => {
//             console.log('内部第一个then')
//             return Promise.resolve()
//         })
//         .then(() => {
//             console.log('内部第二个then')
//         })
//     })
//     .then(() => {
//         console.log('外部第二个then')
//     })
//     .then(() => {
//         console.log('外部第三个then')
//     })
//     .then(() => {
//         console.log('外部第四个then')
//     })		
// }