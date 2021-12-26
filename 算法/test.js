
class ListNode {
    constructor(val, next){
        // this.val = val ??= val;
        this.val = val ? val : null;
        this.next = next ? next : null;
    }
}

// function reverseLink(head, n){
//     let pre = null
//     let cur = head
//     while(n--){
//         let next = cur.next
//         cur.next = pre
//         pre = cur
//         cur = next
//     }
//     // console.log(head, cur, pre, 'reverseLink');
//     head.next = cur
//     return pre

//     // let cur1 = pre
//     // while(cur1.next){
//     //     cur1 = cur1.next
//     // }
//     // cur1.next = cur;
//     // return pre
// }
// var reverseBetween = function(head, left, right) {
//     if(left === right){
//         return head
//     }
//     let head0 = new ListNode()
//     head0.next = head
//     let curLeft = result = head0
    
//     let count = right - left + 1
//     while(--left){
//         curLeft = curLeft.next
//         // left--
//     }
//     console.log('count', curLeft);
//     curLeft.next = reverseLink(curLeft.next, count)
//     return result.next;
// };

// const node1 = new ListNode(1);
// const node2 = new ListNode(2);
// const node3 = new ListNode(3);
// const node4 = new ListNode(4);
// const node5 = new ListNode(5);
// node1.next = node2
// node2.next = node3
// node3.next = node4
// node4.next = node5

// console.log(JSON.stringify(reverseBetween(node1, 2, 4)))



const node1 = new ListNode(1);
const node2 = new ListNode(2);
const node3 = new ListNode(3);
const node4 = new ListNode(4);
node1.next = node2
node2.next = node3
node3.next = node4

var swapPairs = function(head) {
    let head0 = new ListNode(null, head);
    let cur = head0;
    while(cur && cur.next && cur.next.next){
        let next1 = cur.next
        let next2 = next1.next;
        let next3 = next2.next
        next2.next = next1
        next1.next = next3
        cur = cur.next.next
    }
    // console.log(head0, cur);
    return cur
};
console.log(JSON.stringify(swapPairs(node1)))