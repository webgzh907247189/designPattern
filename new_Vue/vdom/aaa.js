// // 价格由低到高排序，价格相等时，按评分由高到低排序
let obj= {
    hotels: [{
        id: 1,
        price: 100,
        score: 80
    }, {
        id: 2,
        price: 70,
        score: 90, 
    }, {
        id: 3,
        price: 70,
        score: 95
    }]
}

function sort(list){
    var temp = null;
    for(let i=0; i< list.length - 1; i++){
        for(let j=0; j< list.length - 1 - i; j++){
            console.log(list[j + 1], 'list[j]');
            if(list[j].price > list[j + 1].price){
                temp = list[j]
                list[j] = list[j+1]
                list[j+1] = temp
            }

            if(list[j].price === list[j + 1].price && list[j].score < list[j + 1].score){
                temp = list[j]
                list[j] = list[j+1]
                list[j+1] = temp
            }

        }
    }
    return list

    // return list.sort((item1, item2) => {
    //     if(item1.price === item2.price ){
    //         return item2.score - item1.score
    //     }
    //     return item1.price - item2.price
    // })
}
console.log(sort(obj.hotels)) // [10, 2, 14, 8, 100]



// [1, 2, 3, [4, 5, [6]]] => [1, 2, 3, 4, 5, 6] 
// function flttern(list, ){
//     return list.reduce((result, item) => {
//         if(Array.isArray(item)) {
//             return [...result, ...flttern(item)]
//         }
//         result.push(item)
//         return result
//     }, [])
// }
// var list = [1, 2, 3, [4, 5, [6]]]
// console.log(flttern(list))