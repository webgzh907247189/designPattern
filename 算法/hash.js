// hash 算法 https://juejin.im/post/6874708801208254478
//  两数之和
{
    const nums = [2, 7, 11, 15, 3, 6]; const target = 9
    var twoSum = function(nums, target) {
        const map = new Map()
        // let tmp;
        let result

        nums.some((item,idx) => {
            const val = target - item

            if (map.get(item) !== void 0) {
                result = [map.get(item), idx]
                return true
            } else {
                map.set(val, idx)
            }
        })
        return result
    };

    console.log(twoSum(nums, target)) // [ 0, 1 ]
}

{
    const nums = [2, 7, 11, 15, 3, 23, 6]; const target = 9
    var twoSum = function(nums, target) {
        const map = new Map()
        // let tmp;
        let result = []

        nums.forEach((item,idx) => {
            const val = target - item

            if (map.get(item) !== void 0) {
                result.push([map.get(item), idx]);
            } else {
                map.set(val, idx)
            }
        })
        return result
    };

    console.log(twoSum(nums, target)) // [ [ 0, 1 ], [ 4, 6 ] ]
}




// 给定一个字符串，请你找出其中不含有重复字符的 最长子串 的长度。
// abcabcbb -> abc 3; bbbbb -> b 1
{

}


// 前K个高频单词
{
    const list = ["the", "day", "is", "sunny", "the", "the", "the", "sunny", "is", "is"]; const k = 4
    function getCount(list){
        return list.reduce((result, item) => {
            result[item] = result[item] ? result[item] + 1 : 1;
            return result
        }, Object.create(null))
    }
    console.log(getCount(list))
}