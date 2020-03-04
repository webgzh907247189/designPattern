/**
 * 二叉树在计算机科学中应用很广泛，学习它有助于让我们写出高效的插入、删除、搜索节点算法。
 * 二叉树的节点定义：一个节点最多只有两个节点，分别为左侧节点、右侧节点。
 * 
 * 二叉搜索树是二叉树中的一种，在二叉搜索树中每个父节点的键值要大于左边子节点小于右边子节点。
 */

 /**
  * https://mp.weixin.qq.com/s/PpR1Lvg8pk3dRWHmVtaBYw
  * https://juejin.im/post/5bec223f5188250c102116b5
  * 
  * constructor()：构造函数，初始化一个二叉搜索树
  * insert(value)：二叉树中查找一个节点，如果存在返回 true 否则返回 false
  * preOrderTraverse(cb)：先序遍历或称前序遍历
  * inOrderTraverse(cb)：中序遍历
  * postOrderTraverse(cb)：后序遍历
  * minNodeValue()：最小节点值
  * maxNodeValue()：最大节点值
  * removeNode(value)：移除节点
  * destroy()：销毁节点
  */


  const INSERT_RECUSIVE = Symbol('BST#recursiveInsert');
  const SEARCH_RECUSIVE = Symbol('BST#recursiveSearch');
  const PRE_ORDER_TRAVERSE_RECUSIVE = Symbol('BST#preOrderTraverseRecusive');
  const IN_ORDER_TRAVERSE_RECUSIVE = Symbol('BST#in_order_traverse_recusive');
  const POST_ORDER_TRAVERSE_RECUSIVE = Symbol('BST#post_order_traverse_recusive');
  const DESTORY_RECUSIVE = Symbol('BST#destory_recusive');
  const REMOVE_NODE_RECUSIVE = Symbol('BST#remove_node_recusive');

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

            this.CopyNode = function(node) {
                return {
                    value: node.value,
                    count: node.count,
                    left: node.left,
                    right: node.right,
                }
            }
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

        // 二叉树中搜索节点有没有
        search(value) {
            return this[SEARCH_RECUSIVE](this.root, value);
        }

        [SEARCH_RECUSIVE](node, value) {
            // 先判断传入的 node 是否为 null，如果为 null 就表示查找失败，返回 false
            if(node === null){
                return false;
            }else if(value === node.value){ // 已经找到了节点，返回 true
                return true;
            }else if(value < node.value){ // 表示要找的节点，比当前节点小，在左侧节点继续查找
                return this[SEARCH_RECUSIVE](node.left,value)
            }else if(value > node.value){
                return this[SEARCH_RECUSIVE](node.right,value)
            }
        }

        // 先序遍历 -> 优先于后代节点的顺序访问每个节点
        preOrderTraverse(cb) {
            return this[PRE_ORDER_TRAVERSE_RECUSIVE](this.root, cb);
        }

        [PRE_ORDER_TRAVERSE_RECUSIVE](node,cb){
            if(node !== null){
                cb(node.value)
                this[PRE_ORDER_TRAVERSE_RECUSIVE](node.left,cb)
                this[PRE_ORDER_TRAVERSE_RECUSIVE](node.right,cb)
            }
        }

        // 中序遍历 -> 中序遍历，先访问左侧节点，直到为最小节点访问到树的最底端，将当前节点的 value 取出来，在访问右侧节点，适用于从小到大排序
        // 结果是一个从小到大的顺序排
        inOrderTraverse(cb){
            this[IN_ORDER_TRAVERSE_RECUSIVE](this.root,cb)
        }

        [IN_ORDER_TRAVERSE_RECUSIVE](node,cb){
            if(node !== null){
                this[IN_ORDER_TRAVERSE_RECUSIVE](node.left,cb)
                cb(node.value)
                this[IN_ORDER_TRAVERSE_RECUSIVE](node.right,cb)
            }
        }

        // 后序遍历 -> 先访问节点的子节点，再访问节点本身，也就是当节点的左右节点都为 null 时才取节点本身
        // 后序遍历一个应用场景适合对目录进行遍历计算，还适合做析构函数，从后序节点开始删除
        postOrderTraverse(cb){
            this[POST_ORDER_TRAVERSE_RECUSIVE](this.root,cb)
        }

        [POST_ORDER_TRAVERSE_RECUSIVE](node,cb){
            if(node !== null){
                this[POST_ORDER_TRAVERSE_RECUSIVE](node.left,cb)
                this[POST_ORDER_TRAVERSE_RECUSIVE](node.right,cb)
                cb(node.value)
            }
        }

        // 利用后序遍历的方式，逐渐将每个节点进行释放
        destroy(){
            this.root = this[DESTORY_RECUSIVE](this.root);
        }

        [DESTORY_RECUSIVE](node) {
            if(node !== null){
                this[DESTORY_RECUSIVE](node.left)
                this[DESTORY_RECUSIVE](node.right)

                node = null;
                this.count--;
                return node;
            }
        }


        // 一个父亲节点大于自己的左侧节点和小于自己的右侧节点，根据这一规则可以很容易的求出最小最大值
        // 求二叉树中最小节点值
        minNodeValue(){
            const minNode = this.minNode(this.root);
            return minNode ? minNode.value : null;
        }

        minNode(node){
            while(node && node.left){
                node = node.left;
            }
            return node;
        }

        maxNode(){
            let node = this.root;
            while(node && node.right){
                node = node.right;
            }
            return node;
        }

        // 删除节点
        removeNode(){
            this.root = this[REMOVE_NODE_RECUSIVE](this.root, value);
        }

        [REMOVE_NODE_RECUSIVE](node, value) {

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


console.log(searchTree.search(20)); // true
console.log(searchTree.search(10)); // false

searchTree.preOrderTraverse(function(val){
    console.log(val);
}) // 30 25 20 28 36 32 40

searchTree.inOrderTraverse(function(val){
    console.log(val);
}) // 20 25 28 30 32 36 40

searchTree.postOrderTraverse(function(val){
    console.log(val);
}) // 20 28 25 32 40 36 30


// searchTree.destroy()
// console.log(searchTree, '释放节点了')


console.log(searchTree.minNodeValue()); // 20
console.log(searchTree.maxNode()) // { value: 40, count: 1, left: null, right: null }


