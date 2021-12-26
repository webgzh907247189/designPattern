// https://segmentfault.com/a/1190000009041008

// Closure
const add = []
function a(str){
    debugger
    add.push(() => {
        debugger
        console.log('1111', str);
    })
}

a('13123123');

for(let item of add){
    item('');
}






// ao vo go
function getUid(uid){
    console.log(uid)
}
let uid = 0;
const requestFn = (options, uid) => {
    getUid(uid);
};

function request(options = {}) {
  return requestFn(options, uid++);
}

request()