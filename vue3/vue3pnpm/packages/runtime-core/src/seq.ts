// 最长递增子序列

// 二分查找 + 贪心算法


// 先求个数
// 去列表中查找 比当前项大的 做替换
// 已经超出列表最大项，直接放列表后面

// case1
// [2, 5, 8, 4, 6, 7, 9, 3] -> [2, 5, 6, 7, 9] (数组的 length 与 过程最后一次一样)

// 过程:
// [2]
// [2, 5]
// [2, 5, 8]
// [2, 4, 8]
// [2, 4, 6]
// [2, 5, 6, 7]
// [2, 5, 6, 7, 9]
// [2, 3, 6, 7, 9]

// 结果: -> [2, 5, 6, 7, 9]



// case2
// [3, 4, 5, 9, 7, 6, 2, 1, 8, 11] -> [3, 4, 5, 6, 8, 11] (数组的 length 与 过程最后一次一样)

// 过程:
// [3]
// [3, 4]
// [3, 4, 5]
// [3, 4, 5, 9]
// [3, 4, 5, 7]
// [3, 4, 5, 6]
// [2, 3, 4, 5]
// [1, 2, 3, 4]
// [1, 2, 3, 4, 8]
// [1, 2, 3, 4, 8, 11]

// 结果: -> [1, 2, 3, 4, 8, 11]


// vue3 中出现0 可以忽略，因为 0代表新增
const getSequence = (list) => {
    const len = list.length
    const result = [0]

    let start
    let end
    let mid
    for (let index = 0; index < len; index++) {
        const item = list[index];
        if(item !== 0){
            const resultLastIdx = result[result.length - 1]

            // 最后一项 与 当前循环到的 这个对比
            if(list[resultLastIdx] < item){
                result.push(index)
                continue;
            }

            start = 0
            end = result.length - 1
            while(start < end){
                // 向下取整
                // mid 就是第一个 比 当前大的值
                mid = (start + end)/2 | 0

                if(list[result[mid]] < item){
                    start = mid + 1
                }else{
                    end = mid
                }
            }

            if(item < list[result[start]]){
                result[start] = index
            }
        }
    }
    return result
}
// console.log(getSequence([1,2,3,4,5]))

//[2, 3, 6, 7, 9] -> idx: [0, 7, 4, 5, 6]
console.log(getSequence([2,5,8,4,6,7,9,3]))