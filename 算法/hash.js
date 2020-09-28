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

/**
 * 滑动窗口来降低时间复杂度
 * 定义一个map数据结构，维护这么一个结构（key,index），key值就是字符，index表示的就是第几个字符。
 * 滑动窗口的话，我们需要维护的就是一个start开始位置，end结束位置。
 * end指针不断向后走，当遇到区间[start,end]相同的字符时，我们就需要重新跟新start指针，并且把此时的答案ans更新即可。
 */
{
    var lengthOfLongestSubstring = function (s) {
        let mapTemp = new Map(),
            max = 0
        const len = s.length
        for (let i = 0, j = 0; j < len; j++) {
            if (mapTemp.has(s[j])) {
                // 窗口的start更新
                i = Math.max(mapTemp.get(s[j]) + 1, i)
                // i = mapTemp.get(s[j]) + 1
            }
            max = Math.max(max, j - i + 1)
            mapTemp.set(s[j], j)
        }
        return max
    }    
    console.log(lengthOfLongestSubstring('abcabcbb'))
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