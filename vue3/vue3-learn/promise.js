// const fn = (s) =>
//   new Promise((resolve, reject) => {
//     if (typeof s === "number") {
//       resolve();
//     } else {
//       reject();
//     }
//   })
//     .then((res) => {
//       console.log("参数是一个number");
//       return res;
//     })
//     .then(
//       (res) => console.log("start" + res),
//       (res) => console.log("end" + res)
//     );
// fn("1");
// fn(1);
// 注意 then 是交替执行的

// 参数是一个number
// endundefined
// startundefined




// https://www.cnblogs.com/echolun/p/15890147.html
Promise.resolve().then(() => {
    console.log(0);

    // 这里相当于产生 2 个 then 任务
    return Promise.resolve(4);
}).then((res) => {
    console.log(res)
})

Promise.resolve().then(() => {
    console.log(1);
}).then(() => {
    console.log(2);
}).then(() => {
    console.log(3);
}).then(() => {
    console.log(5);
}).then(() =>{
    console.log(6);
})

// 输出为0 1 2 3 4 5 6
