const root = {
    val: "A",
    left: {
        val: "B",
        left: {
            val: "D"
        },
        right: {
            val: "E"
        }
    },
    right: {
        val: "C",
        right: {
            val: "F"
        }
    }
};

function preorder(root){
    if(!root){
        return
    }

    console.log(root.val);
    preorder(root.left);
    preorder(root.right);
}
preorder(root)


console.log('=============');
function inorder(root){
    if(!root){
        return
    }

    inorder(root.left);
    console.log(root.val);
    inorder(root.right);
}
inorder(root)


console.log('=============');
function postorder(root){
    if(!root){
        return
    }

    postorder(root.left);
    postorder(root.right);
    console.log(root.val);
}
postorder(root)




// 二叉树的遍历
// 先序遍历  根结点 -> 左子树 -> 右子树
// 中序遍历  左子树 -> 根结点 -> 右子树
// 后序遍历  左子树 -> 右子树 -> 根结点
// 层次遍历 




// 二叉搜索树
// 是一棵空树
// 是一棵由根结点、左子树、右子树组成的树，同时左子树和右子树都是二叉搜索树，且左子树上所有结点的数据域都小于等于根结点的数据域，右子树上所有结点的数据域都大于等于根结点的数据域

// 查找数据域为某一特定值的结点
// 递归遍历二叉树，若当前遍历到的结点为空，就意味着没找到目标结点，直接返回。
// 若当前遍历到的结点对应的数据域值刚好等于n，则查找成功，返回。
// 若当前遍历到的结点对应的数据域值大于目标值n，则应该在左子树里进一步查找，设置下一步的遍历范围为 root.left 后，继续递归。
// 若当前遍历到的结点对应的数据域值小于目标值n，则应该在右子树里进一步查找，设置下一步的遍历范围为 root.right 后，继续递归。


// 插入新结点
// 根据当前结点值的大小，决定路线应该是向左走还是向右走。如果最后走到了一个空结点处，这就意味着我们没有办法再往深处去搜索了，也就没有了找到目标结点的可能性。


// 删除指定结点
// 结点不存在，定位到了空结点。直接返回即可。
// 需要删除的目标结点没有左孩子也没有右孩子——它是一个叶子结点，删掉它不会对其它结点造成任何影响，直接删除即可。
// 需要删除的目标结点存在左子树，那么就去左子树里寻找小于目标结点值的最大结点，用这个结点覆盖掉目标结点
// 需要删除的目标结点存在右子树，那么就去右子树里寻找大于目标结点值的最小结点，用这个结点覆盖掉目标结点
// 需要删除的目标结点既有左子树、又有右子树，这时就有两种做法了：要么取左子树中值最大的结点，要么取右子树中取值最小的结点。两个结点中任取一个覆盖掉目标结点，都可以维持二叉搜索树的数据有序性




// 平衡二叉树
// 平衡二叉树（又称 AVL Tree）指的是任意结点的左右子树高度差绝对值都不大于1的二叉搜索树。
// 平衡二叉树的出现，是为了降低二叉搜索树的查找时间复杂度。
// 大家知道，对于同样一个遍历序列，二叉搜索树的造型可以有很多种。



// 二叉搜索树是二叉树的特例，平衡二叉树则是二叉搜索树的特例。平衡二叉树是任意结点的左右子树高度差绝对值都不大于1的二叉搜索树。