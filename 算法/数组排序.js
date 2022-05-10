// 排序 https://www.cnblogs.com/ybygb-geng/p/9355425.html
// chrome v8的 Array.sort 函数实现中（710行），当数组的长度小于等于22时，使用的就是插入排序，大于22使用的是快速排序。

/**
 * 冒泡
 * 
 * 根据冒泡的原理， 后面的应该比前面大， 所以第一轮循环下来，就找到了数组里面最大值了
 * 第一轮循环下来之后， 已经找到数组里面最大的一项了，后续循环从 arr[length - 1] 开始
 */
{
    const arr = [10, 2, 14, 8, 100]
    // 5 + 4 + 3 + 2 + 1 = 15  // 一共循环 15次

    function bubble(arr){
        let temp = null
        for (let index = 0; index < arr.length; index++) {
            for (let j = 0; j < arr.length - index; j++) {
                // 前一项比后一项大
                if(arr[j] > arr[j + 1]){
                    temp = arr[j]
                    arr[j] = arr[j + 1]
                    arr[j + 1] = temp
                }
            } 
        }

        return arr
    }

    console.log(bubble(arr)) // [ 2, 8, 10, 14, 100 ]
}





// 插入排序 // https://segmentfault.com/a/1190000015489767
// 先拿到一项 作为基准 
// 循环 result 的时候 需要倒序 循环，因为 result 已经是排序之后的数组了， 倒序拿最大的进行比较
// 正序循环的话，会进入到下面错误的
// chrome v8的 Array.sort 函数实现中（710行），当数组的长度小于等于22时，使用的就是插入排序，大于22使用的是快速排序。
{
    const arr = [10, 7, 2, 14, 8, 100]

    function sort(arr){
        let result = [arr[0]]
        for (let index = 1; index < arr.length; index++) {
            for (let j = 0; j < result.length; j++) {
                if(arr[index] > result[j]){
                    result.splice(j+1, 0, arr[index])
                    break
                }
            } 
        }

        return result
    }

    // console.log(sort(arr)) // [ 2, 8, 10, 14, 100 ]
}

// 插入排序 // https://segmentfault.com/a/1190000015489767
// 先拿到一项 作为基准 
// 循环 result 的时候 需要倒序 循环，因为 result 已经是排序之后的数组了， 倒序拿最大的进行比较
// 正序循环的话，会进入到下面错误的
// chrome v8的 Array.sort 函数实现中（710行），当数组的长度小于等于22时，使用的就是插入排序 (webpack 插件)，大于22使用的是快速排序。
{
    const arr = [10, 7, 2, 14, 8, 100]

    function sort1(arr){
        let result = [arr[0]]
        for (let index = 1; index < arr.length; index++) {
            for (let j = result.length - 1; j >= 0; j--) {
                if(arr[index] > result[j]){
                    result.splice(j + 1, 0, arr[index])
                    break
                }

                if(j === 0){
                    result.unshift(arr[index])
                }
            } 
        }

        return result
    }

    console.log(sort1(arr)) // [ 2, 7, 8, 10, 14, 100 ]
}





// 快排
// 需要把中间元素删掉 在计算， 不删掉，死循环爆栈
{   
    const arr = [10, 7, 2, 14, 8, 100]
    function quick(arr){
        if(arr.length <= 1) return arr

        let idx = Math.floor(arr.length / 2)
        // console.log(Math.floor(arr.length / 2), 'Math.floor(arr.length / 2)', idx)
        let midd = arr.splice(idx, 1)[0]
        console.log(midd, 'midd',arr)

        let left = []
        let right = []

        for (let index = 0; index < arr.length; index++) {
            if(arr[index] > midd){
                right.push(arr[index])
            }else{
                left.push(arr[index])
            }
        }

        // return quick(left).concat(midd, quick(right))
        return [...quick(left),midd, ...quick(right)]
    }
    console.log(quick(arr)) // [ 2, 8, 10, 14, 100 ]
}