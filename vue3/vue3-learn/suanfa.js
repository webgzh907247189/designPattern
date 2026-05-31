// [a, b,   c, d, e,    f, g] 
// [a, b,   e, c, d, h, f, g] 

// c d e 索引: 2, 3, 4
// e c d h 对应的老的列表的索引: 4 2 3 0 (0表示以前不存在的元素)


// 2 3 7 6 8 4 9 11 -> 求最长子序列个数

// 从第一个开始枚举出来最长序列
// 2
// 2 3
// 2 3 7 先暂定这个序列最长
// 2 3 6  (记录 6把7替换了，6记录他之前的是7)
// 2 3 6 8 此时这个序列超过了上个最长的序列了
// 2 3 4 8 (记录 4把6替换了，8记录他之前的是6)
// 2 3 4 8 9
// 2 3 4 8 9 11 (先找个数，后面用每个数值记录的前一个值进行替换)


// 1. 核心找更有 潜力的  2. 找到就替换
// 2 3 7 这个的潜力比下面的潜力更大
// 2 3 8 


const getSequence = (arr) => {
    const result = [0]
    const len = arr.length

    for (let i = 0; i < len; i++) {
        const arri = arr[i];
        

        /**********/
        // newIndexToOldMapIndex[newIndex - s2] = i; // [4, 2, 3, 0]
        // newIndexToOldMapIndex[newIndex - s2] = i + 1; // [4, 2, 3, 0]
        // vue 里面下标为 0 的表示，当前元素没有被 patch 过，需要直接创建当前节点
        /**********/

        let start
        let end
        let midd
        if(arri !== 0){
            // 这里是下标
            let resultLastIndex = result[result.length - 1]

            if(arr[resultLastIndex] < arri){
                result.push(i)
                continue
            }

            start = 0
            end = arr.length - 1

            while(start < end){
                midd = Math.floor((start + end ) / 2)

                if(arr[result[midd]] < arri){
                    start = midd + 1
                }else{
                    end = midd
                }
            }

            if(arri < arr[result[start]]){
                result[start] = i
            }

            // console.log(start, end)
        }

        // 创建一个 前驱节点，进行倒叙追溯。 最后一项肯定没问题

        // result: [2, 3, 1, 5, 6, 8, 7, 9, 4]
        // index:   0, 1, 2, 3, 4, 5, 6, 7, 8

    }

    return result
}

// console.log(getSequence([2, 6, 7, 8, 9, 11]))
console.log(getSequence([2, 3, 1, 5, 6, 8, 7, 9, 4])) // 1 3 4 6 7 9 -> 索引下标 [2, 1, 8, 4, 6, 7]