class ListNode {
    constructor(val){
        // this.val = val ??= val;
        this.val = val ? val : null;
        this.next = null;
    }
}

const node11 = new ListNode(1);
const node22 = new ListNode(2);
const node33 = new ListNode(3);
const node44 = new ListNode(4);
const node55 = new ListNode(5);
node11.next = node22
node22.next = node33
node33.next = node44
node44.next = node55


var rotateRight = function(head, k) {
    // const dummy = new ListNode()
    let fast = head
    while(fast.next){
        fast = fast.next
    }
    fast.next = head
    console.log(JSON.stringify(head));
    // while(k != 0){
    //     k--
    //     fast = fast.next
    // }
    // fast.next = null;
};
console.log(rotateRight(node11, 2))