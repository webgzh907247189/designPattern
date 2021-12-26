class ListNode {
    constructor(val){
        // this.val = val ??= val;
        this.val = val ? val : null;
        this.next = null;
    }
}

/**
 * 快慢指针——删除链表的倒数第 N 个结点
 * 给定一个链表: 1->2->3->4->5, 和 n = 1.   当删除了倒数第二个结点后，链表变为 1->2->3->5.
 * 
 * 倒数第 N 个” 咱们完全可以转换为“正数第 len - n + 1"个
 */
const removeNthFromEnd1 = function(head, n) {
     // 初始化 dummy 结点
     const dummy = new ListNode()
     // dummy指向头结点
     dummy.next = head
     // 初始化快慢指针，均指向dummy
     let fast = dummy
     let slow = dummy

     while(n !== 0){
        fast = fast.next
        n --
     }

    // 快慢指针一起走
    while(fast.next){
        fast = fast.next
        slow = slow.next
    }

    slow.next = slow.next.next
    return dummy.next
}

/**
 * 遍历两次，第一次求得 链表的长度，第二次求 len - n + 1
 */
const removeNthFromEnd2 = function(head, n) {
    let count = 0;
    let idx = 0;
    let cur = head
    while(cur){
        count += 1;
        cur = cur.next
    }

    cur = head
    const findidx = count - n + 1;

    // do 
    // if(findidx === 1){
    //     return cur.next
    // }

    while(cur){
        if(idx === findidx - 1){
            cur.next = cur.next.next
        }else {
            cur = cur.next
        }
        idx += 1;
    }

    return head
}
{

    const node11 = new ListNode(1);
    const node22 = new ListNode(2);
    const node33 = new ListNode(3);
    const node44 = new ListNode(4);
    const node55 = new ListNode(5);
    node11.next = node22
    node22.next = node33
    node33.next = node44
    node44.next = node55

    const node1 = new ListNode(1);
    const node2 = new ListNode(2);
    const node3 = new ListNode(3);
    const node4 = new ListNode(4);
    const node5 = new ListNode(5);
    node1.next = node2
    node2.next = node3
    node3.next = node4
    node4.next = node5
    console.log(JSON.stringify(removeNthFromEnd1(node1, 5)), '122222')
    console.log(JSON.stringify(removeNthFromEnd2(node11, 5)), '11111')
}




/**
 * 完全反转一个链表
 * 输入: 1->2->3->4->5->NULL   输出: 5->4->3->2->1->NULL
 */
const reverseList = function(head) {
    let cur = head
    let pre = null
    while(cur){
        let next = cur.next
        cur.next = pre

        pre = cur
        cur = next
    }
}
{
    const node1 = new ListNode(1);
    const node2 = new ListNode(2);
    const node3 = new ListNode(3);
    const node4 = new ListNode(4);
    const node5 = new ListNode(5);
    node1.next = node2
    node2.next = node3
    node3.next = node4
    node4.next = node5
    // console.log(JSON.stringify(node1), '2')
    console.log(JSON.stringify(reverseList(node1)), '2')
}


const reverseList22 = function(head) {
    let list = [];
    
    while(head){
        list.push(head);
        head = head.next;
    }

    // console.log(list);
    let headItem = new ListNode();
    let cur = headItem;
    while(list.length){
        let item = list.pop();
        item.next = null;
        cur.next = item;
        cur = cur.next
    }
    return headItem.next
}

{
    const node1 = new ListNode(1);
    const node2 = new ListNode(2);
    const node3 = new ListNode(3);
    const node4 = new ListNode(4);
    const node5 = new ListNode(5);
    node1.next = node2
    node2.next = node3
    node3.next = node4
    node4.next = node5
    console.log(JSON.stringify(reverseList22(node1)), '22gzh')
}































/**
 * 环状链表
 * [3,2,1,4] 输出：true
 */

function hasCycle(node){
    let cur = node
    while(cur){
        if(cur.flag){
            return { flag: true, val: cur.val}
        }else {
            cur.flag = true;
            cur = cur.next
        }
    }
    return false
}
{
    const node1 = new ListNode(3);
    const node2 = new ListNode(2);
    const node3 = new ListNode(1);
    const node4 = new ListNode(4);
    node1.next = node2
    node2.next = node3
    node3.next = node4
    node4.next = node2
    console.log(JSON.stringify(hasCycle(node1)), '判断是否存在环状链表')
}



{
    const KEY = {
        '1': [''],
        '2': ['a', 'b', 'c'],
        '3': ['d', 'e', 'f'],
        '4': ['g', 'h', 'i'],
        '5': ['j', 'k', 'l'],
        '6': ['m', 'n', 'o'],
        '7': ['p', 'q', 'r', 's'],
        '8': ['t', 'u', 'v'],
        '9': ['w', 'x', 'y', 'z']
    }

    const letterCombinations = (digits) => {
        const list = digits.split('');
        const alllist = []
        for (const iterator of list) {
            alllist.push(KEY[iterator])
        }
        
        let result = []
        const [head, ...otherList] = alllist
        if(!otherList.length){
            console.log(otherList, head);
            return head
        }
        for (let index = 0; index < otherList.length; index++) {
            const item = otherList[index];

            let copylist = result.slice();
            let listArr = copylist.length ? copylist : head;
            result = []

            for (let headIdx = 0; headIdx < listArr.length; headIdx++) {
                const headItem = listArr[headIdx];
                
                for (let idx = 0; idx < item.length; idx++) {
                    const element = item[idx];
                    result.push( headItem + element )
                }
            }
        }
        // console.log(alllist);
        return result
    }
    console.log(letterCombinations('2'));
}










{
    /**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} head
 * @param {number} k
 * @return {ListNode}
 */
var rotateRight = function(head, k) {
    let last = head
    let cur = head
    let count = 1;
    // let list = []
    while(last){
        count++
        last = last.next
        // list.push(last)
    }

    let stp = k % count;
    
    while(stp >= 0){
        stp--
        cur = cur.next
    }

    let tmp2 = cur
    while(tmp2 && tmp2.next) {
        tmp2 = tmp2.next
    }
    tmp2.next = head



    // let endhead = head
    // let len = count - (k % count)
    // while(len != 0){
    //     len--
    //     head = head.next
    // }
    // last.next = head
    // start.next = 

    // cur.next = null;
    // cur.next = head;

    // let newHead = cur;
    // while(newHead.next){
    //     newHead = newHead.next
    // }
    // newHead.next = head
    
    console.log(cur, head);
    
};
}

