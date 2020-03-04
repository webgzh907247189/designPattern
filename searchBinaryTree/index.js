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
  * destory()：销毁节点
  */


  const INSERT_RECUSIVE = Symbol('BST#recursiveInsert');
  const SEARCH_RECUSIVE = Symbol('BST#recursiveSearch');

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

        // 二叉树中搜索节点
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