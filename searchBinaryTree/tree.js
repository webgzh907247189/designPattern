const INSERT_RECUSIVE = Symbol('BST#recursiveInsert');

// https://mp.weixin.qq.com/s?__biz=MjM5NzYxNTQwMQ==&mid=2450975777&idx=1&sn=2f49ab81221492c01d836459008de544

class SearchTree {
    constructor(){
        this.root = null; // 初始化根节点
        this.count = 0; // 记录二叉搜索的节点数量

        this.Node = function(value){
            return {
                value, // 节点值
                count: 1, // 节点数量，允许节点重复
                left: null, // 左侧子节点
                right: null, // 右侧子节点
            }
        };
    }

    // 二叉搜索树插入元素
    insert(value){
        this.root = this[INSERT_RECUSIVE](this.root, value);
    }

    [INSERT_RECUSIVE](node, value) {
         //  如果当前节点为空，创建一个新节点（递归到底）
        if(node === null){
            this.count ++;
            return new this.Node(value)
        }

        if(value === node.value){
            node.count++
        }else if(value < node.value){ // 左侧插入
            node.left = this[INSERT_RECUSIVE](node.left, value);
        }else if(value > node.value){ // 右侧插入
            node.right = this[INSERT_RECUSIVE](node.right, value);
        }

        return node
    }

    // 先序遍历
    preOrderTraverse(){
        const root = this.root;
        const result = [];
        if(!root){
            return result;
        }

        const stack = [root];

        while(stack.length){
            const item = stack.shift();
            result.push(item.value);

            if(item.right){
                stack.unshift(item.right)
            }

            if(item.left){
                stack.unshift(item.left)
            }
        }
        return result;
    }

    // 会污染之前的树的每一项
    inOrderTraverse(){
        const root = this.root;
        const result = [];
        if(!root){
            return result;
        }

        const stack = [root];

        while(stack.length){
            const item = stack.shift();

            if(!item.visit){
              
                if(item.right){
                    stack.unshift(item.right)
                }

                item.visit = true;
                stack.unshift(item);

                if(item.left){
                    stack.unshift(item.left)
                }
            }else{
                result.push(item.value);
            }
        }
        return result;
    }

    // 会污染之前的树的每一项
    postOrderTraverse(){
        const root = this.root;
        const result = [];
        if(!root){
            return result;
        }

        const stack = [root];

        while(stack.length){
            const item = stack.shift();

            if(!item.visit1){
                item.visit1 = true;
                stack.unshift(item);

                if(item.right){
                    stack.unshift(item.right)
                }

                if(item.left){
                    stack.unshift(item.left)
                }
            }else{
                result.push(item.value);
            }
        }
        return result;
    }

    // 层序遍历 -> 广度优先搜索
    levelOrder(){
        const root = this.root;
        const result = [];
        if(!root){
            return result;
        }

        let stack = [root];

        while(stack.length) {
            const temp = [];
            for(let i = 0; i < stack.length; i++){
                result.push(stack[i].value);

                if(stack[i].left){
                    temp.push(stack[i].left)
                }

                if(stack[i].right){
                    temp.push(stack[i].right)
                }
    
            }
            stack = temp;
        }
        return result;
    }

    // 树的最大深度  叶子节点是指没有子节点的节点
    maxDepth(){
        const root = this.root;
        let result = 0;

        function deep(root,levelNow){
            if(!root){
                return levelNow;
            }

            // 左右节点都没有，才算找结束
            if(!root.left && !root.right){
                return Math.max(result,levelNow)
            }

            if(root.left){
                return deep(root.left,levelNow + 1);
            }

            if(root.right){
                return deep(root.right,levelNow + 1);
            }
        }
        return deep(root,1);
    }

    // 叶子节点是指没有子节点的节点
    hasPathSum(number){
        const root = this.root;
        let flag = false;

        function getSum(root,sum){
            if(!root){
                return false;
            }

            // 左右节点都没有，才算找结束
            if(!root.left && !root.right){
                const val = sum + root.value;
                if(number === val){
                    flag = true;
                }
            }else{
                getSum(root.left, root.value + sum);
                getSum(root.right, root.value + sum);
            }
        }
        getSum(root,0);

        return flag;
    }
}
const searchTree = new SearchTree();

searchTree.insert(30);
searchTree.insert(25);
searchTree.insert(36);
searchTree.insert(20);
searchTree.insert(28);
searchTree.insert(32);
searchTree.insert(40);

console.dir(searchTree, { depth: 4 })


console.log(searchTree.preOrderTraverse());  // [30, 25, 20, 28, 36, 32, 40]
console.log(searchTree.inOrderTraverse()); // [20, 25, 28, 30, 32, 36, 40]
console.log(searchTree.postOrderTraverse()); // [20, 28, 25, 32, 40, 36, 30]
console.log(searchTree.levelOrder());  // [30, 25, 36, 20, 28, 32, 40]

console.log(searchTree.maxDepth());  // 3
console.log(searchTree.hasPathSum(98));
