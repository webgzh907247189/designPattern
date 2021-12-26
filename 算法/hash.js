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

//  https://juejin.cn/post/6973838889806987295
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
    console.log(lengthOfLongestSubstring('bbbbbb'))
}

{
    // https://zhuanlan.zhihu.com/p/338744177
    function check(str) {
        let arr = [] // 定义一个队列 ,也就是说滑动窗口 
        let max = 0;
        for (let i = 0; i<str.length; i++){   // for循环遍历字符串下标
            let index = arr.indexOf(str[i])     // 定义一个变量用于判断
            if (index !== -1) {
                arr.splice(0, index+1)        // 如果arr数组含有这个元素 那么就删除掉这个元素之前
            } 
            arr.push(str.charAt(i))  // 将元素推入队列之中
            max = Math.max(arr.length, max)     // 比较长度
        }
        return max      
    }
    console.log(check('abcabcbb'))
    console.log(check('bbbbbbb'))
}

{
    function maxLength(arr){
        let maxLen = 0;
        let map = new Map();
        // 用双指针模拟一个滑动窗口，窗口向右滑动
        for(let left = 0, right = 0; right < arr.length; ++right){
            // 遇到重复数字
            if(map.has(arr[right])){
                // 因为有可能遇到的重复数字的位置在left前面，比较当前left的位置与重复数字的位置
                // 如当输入是abcba，因为b重复了，所以left已经移动到了c
                // 当right移动到a时，虽然a重复了，但是left已经移动到a后面了
                left = Math.max(left, map.get(arr[right]) + 1);          
            }
            map.set(arr[right], right);
            maxLen = Math.max(maxLen, right - left + 1);
        }
        return maxLen;
    }
    console.log(maxLength([2, 3, 4, 5]))
    console.log(maxLength([2, 2, 3, 4, 3]))
}









{
    function getMaxList(list, k){
        const q = [] // 存放优先队列的元素下标，为了取值方便
        const result = [] // 结果数组

        for (let i = 0; i < list.length; i++) {
            while (q.length && list[i] >= list[q[q.length - 1]]) {
                q.pop()
            }
          
            // 当前元素下标入栈
            q.push(i)
          
            // 判断当前最大值是否在窗口中，若不在则让其出队
            while (q[0] <= i - k) {
                q.shift()
            }
            // 达到窗口大小时，就向结果添加数据
            if (i >= k - 1) result.push(list[q[0]])
        }

        return result
    }
    console.log(getMaxList([1, 3, -1, -3, 5, 3, 6, 7], 3))
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