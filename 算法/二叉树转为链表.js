// https://leetcode.cn/problems/flatten-binary-tree-to-linked-list/
// 二叉树转为链表

//              1
//     2                   5
// 3       4       null        6

//          1
//   null           2
//            null         3
//                    null      4
//                          null    5
//                              null    6   

//  先序 1 -> 2 -> 3 -> 4 -> 5 -> 6
//  后序 3 -> 4 -> 2 -> null -> 6 -> 5 -> 1


// 第一次执行
//              1
//     2                   5
// null       3       null        6
//          x   4

// 第二次执行过程
//              1
//     2                 2      
// null       3    null      3     
//          x   4          x    4  
// 第二次执行过程
//              1
//     2                 2      
// null       3    null      3     
//          x   4          x    4  
//                            x   5
//                               x  6


function TreeNode(val, left, right) {
    this.value = (val === undefined ? 0 : val)
    this.left = (left === undefined ? null : left)
    this.right = (right === undefined ? null : right)
}

let id3 = new TreeNode(3)
let id4 = new TreeNode(4)
let id2 = new TreeNode(2, id3, id4)


let id6 = new TreeNode(6)
let id5 = new TreeNode(5, null, id6)

let id1 = new TreeNode(1, id2, id5)

// console.log(id1);


// 深度先序遍历
function tree2List(tree) {
    // console.log(tree.value)

    if (tree.left) {
        tree2List(tree.left)
    }

    if (tree.right) {
        tree2List(tree.right)
    }
    console.log(tree.value)

    if (tree.left) {
        let left = tree.left
        let right = tree.right
        tree.right = left;
        while (left.right) {
            left = left.right;
        }
        left.right = right;
        tree.left = null;
    }
}

tree2List(id1)
console.log(JSON.stringify(id1));

