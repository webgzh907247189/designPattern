// 去重

/** 双层 for 循环
 * 思想: 双重 for 循环是比较笨拙的方法，它实现的原理很简单：先定义一个包含原始数组第一个元素的数组，
 * 然后遍历原始数组，将原始数组中的每个元素与新数组中的每个元素进行比对，如果不重复则添加到新数组中，
 * 最后返回新数组；因为它的时间复杂度是O(n^2)，如果数组长度很大，效率会很低
 */

var arr = [1,'2',2,'a','c','a',{},NaN,{},NaN]
function distinct(arr) {
    for (let i=0, len=arr.length; i<len; i++) {
        for (let j=i+1; j<len; j++) {
            if (arr[i] == arr[j]) {
                arr.splice(j, 1);
                // splice 会改变数组长度，所以要将数组长度 len 和下标 j 减一
                len--;
                j--;
            }
        }
    }
    return arr;
}
//distinct(arr) ->  [1, "2", "a", "c", {}, NaN, {}, NaN]



/**
 * 利用indexOf检测元素在数组中第一次出现的位置是否和元素现在的位置相等，如果不等则说明该元素是重复元素
 *  ******  arr.indexOf(NaN) == -1 恒成立 ******
 *  ******  NaN 被忽略了因为恒等于 -1 ******
 */
function distinct(a) {
    let arr = a //.concat(b);
    return arr.filter((item, index)=> {
        return arr.indexOf(item) === index
    })
}
// distinct(arr) ->  [1, "2",2, "a", "c", {}, {}]




/**
 * ES6 中的 Set 去重
 */
function distinct(array) {
    return Array.from(new Set(array));
}
// distinct(arr) -> [1, "2", 2, "a", "c", {}, NaN, {}]



/**
 * Object 键值对
 * 利用一个空的 Object 对象，我们把数组的值存成 Object 的 key 值，比如 Object[value1] = true，
 * 在判断另一个值的时候，如果 Object[value2]存在的话，就说明该值是重复的,
 * 但是最后请注意这里obj[typeof item + item] = true没有直接使用obj[item],
 * 是因为 123 和 '123' 是不同的，直接使用前面的方法会判断为同一个值，因为对象的键值只能是字符串，
 * 所以我们可以使用 typeof item + item 拼成字符串作为 key 值来避免这个问题。
 */
function distinct(array) {
    let obj = {}; //Object.create(null);
    return array.filter((item)=>{
        return obj.hasOwnProperty(typeof item + item) ? false : (obj[typeof item + item] = true)
    })
};
// distinct(arr) -> [1, "2", 2, "a", "c", {}, NaN]



/**
 * Array.sort() 加一行遍历冒泡(相邻元素去重)
 * 调用了数组的排序方法 sort()，V8引擎 的 sort() 方法在数组长度小于等于10的情况下，会使用插入排序，
 * 大于10的情况下会使用快速排序(sort函数在我之前高阶函数那篇文章有详细讲解【JS必知必会】高阶函数详解与实战)。
 * 然后根据排序后的结果进行遍历及相邻元素比对(其实就是一行冒泡排序比较)，如果相等则跳过该元素，直到遍历结束。
 */
function distinct(array) {
    var res = [];
    var sortedArray = array.concat().sort();
    var seen;
    for (var i = 0, len = sortedArray.length; i < len; i++) {
        // 如果是第一个元素或者相邻的元素不相同
        if (!i || seen !== sortedArray[i]) {
            res.push(sortedArray[i])
        }
        // 保存这一次的值
        seen = sortedArray[i];
    }
    return res;
}
// distinct(arr) -> [1, "2", 2, NaN, NaN, {}, {}, "a", "c"]




/**
 * 计算耗费时间
 * 双重 for 循环 >  Array.filter()加 indexOf  > Array.sort() 加一行遍历冒泡 > ES6中的Set去重 > Object 键值对去重复
 * 
 * 考虑这个数组中是否有null、undefined、NaN、对象如果二者都出现，上面的所有数组去重方法并不是都是适用哦
 * 
 * console.log(NaN === NaN); // false, indexOf 底层使用的是 === 进行判断，所以使用 indexOf 查找不到 NaN 元素
 * ******  arr.indexOf(NaN) == -1 恒成立 ******
 * 
 * 
 * Set可以去重NaN类型， Set内部认为尽管 NaN === NaN 为 false，但是这两个元素是重复的。
 * 
 * 
 * 补充一个误区，有的小伙伴会认为 Array.filter()加 indexOf 这种方式时间复杂度为 O(n) ,
 * 其实不是这样，我觉得也是O(n^2)。因为 indexOf 函数，源码其实它也是进行 for 循环遍历的
 * 
 * 
 * 所有数组去重方式，应该 Object 对象去重复的方式是时间复杂度是最低的，除了一次遍历时间复杂度为O(n) 后，
 * 查找到重复数据的时间复杂度是O(1)，类似散列表，大家也可以使用 ES6 中的 Map 尝试实现一下
 */

let str1 = '123';
let str2 = new String('123');

console.log(str1 == str2); // true
console.log(str1 === str2); // false




console.log(add(1))
console.log(add(1)(2))
console.log(add(1)(2)(3))

function add(a) {
    function sum(b) {
        a = a+b
        return sum
    }

    sum.toString = function () {
        return a
    }

    return sum
}

{
    console.log(add(1)())        // 1
    console.log(add(1)(2)())     // 3
    console.log(add(1)(2)(3)())  // 6

    function add(a) {
        let argsArr = [a]
        function s(...args) {
            if(args.length){
                argsArr = [...argsArr, ...args]
                return s
            }else {
                return argsArr.reduce((result,item)=>{
                    result += item;
                    return result
                },0)
            }
        }

        return s;
    }
}









var aa = [{id:1, parentId: 0}, {id:113, parentId:2},{id:'zzz', parentId:2},{id:'ffff', parentId:3},{id:2, parentId:1},{id:3, parentId:1}];

var a = aa.sort((aaa,bbb)=> aaa.parentId-bbb.parentId);

function zz(arr){
    return arr.reduce((result,item)=>{
        item.parentId === 0 ? result.push({...item,children: []}) : getArr(result,item);
        return result;
    },[])
}

function getArr(result,item){
    return result.find(i => {
        if(item.parentId === i.id){
            return  i.children.push({...item,children: []})
        }else {
            getArr(i.children,item)
        }
    })
};
zz(a)



{
    var list = [
        {id:1, parentId: 0}, 
        {id:113, parentId:2},
        {id:'zzz', parentId:2},
        {id:'ffff', parentId:3},
        {id:2, parentId:1},
        {id:3, parentId:1}
    ];

    function listToTree(data) {
        const obj = Object.create(null)
        return data.reduce((result,item) => {
            const id = item['id']
            obj[id] = obj[id] || [];
            item['children'] = obj[id]

            const parentId = item['parentId']

            if (parentId !== 0) {
                obj[parentId] = obj[parentId] || [];
                obj[parentId].push(item)
            } else {
                result.push(item)
            }

            return result
        },[])
    }

    var resultList = listToTree(list)
    console.log(resultList)
}