function add(a,b){
    return Promise.resolve(a + b)
}

function sum(arr){
    return arr.reduce((result, item) => {
        return result.then((data) => add(data, item))
    }, Promise.resolve(0))
}

const list = [1,2,3,4,5]

sum(list).then((r) => {
    console.log(r, 'result')
})




function chunk(list, size){
    const l = [];
    for (let idx = 0; idx < list.length; idx++) {
        const index = Math.floor(idx / size)

        l[index] = l[index] ? l[index] : []
        l[index].push(list[idx])
    }
    return l;
}
console.log(chunk(list, 2))

function chunk2(list, size){
    const l = [];
    for (let idx = 0; idx < list.length; idx = idx + size) {
        l.push(list.slice(idx,idx+size))
    }
    return l;
}
console.log(chunk2(list, 2))




