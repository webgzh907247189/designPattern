class ListNode {
    constructor(val){
        // this.val = val ??= val;
        this.val = val ? val : null;
        this.next = null;
    }
}

// {
//     // 解读: 如果泛型变量T是 () => infer R的`子集`，那么返回 通过infer获取到的函数返回值，否则返回boolean类型
//     type Func<T> = T extends () => infer R ? R : boolean;
//     let func1: Func<number>; // => boolean
//     let func2: Func<''>; // => boolean
//     let func3: Func<() => Promise<number>>; // => Promise<number>
// }

/**
 * 链表的合并
 * 将两个有序链表合并为一个新的有序链表并返回
 * 
 * 1->2->4, 1->3->4 输出：1->1->2->3->4->4
 */
const mergeTwoLists = function (l1, l2) {
    // 定义头结点，确保链表可以被访问到
    let head = new ListNode()
    // cur 这里就是咱们那根“针”
    let cur = head
    // “针”开始在 l1 和 l2 间穿梭了
    while (l1 && l2) {
        // 如果 l1 的结点值较小
        if (l1.val <= l2.val) {
            // 先串起 l1 的结点
            cur.next = l1
            // l1 指针向前一步
            l1 = l1.next
        } else {
            // l2 较小时，串起 l2 结点
            cur.next = l2
            // l2 向前一步
            l2 = l2.next
        }

        // “针”在串起一个结点后，也会往前一步
        cur = cur.next

    }

    // 处理链表不等长的情况
    cur.next = l1 == null ? l2 : l1;
    // 返回起始结点
    return head.next
};

{
    const node1 = new ListNode(1);
    const node2 = new ListNode(2);
    const node3 = new ListNode(4);
    node1.next = node2
    node2.next = node3


    const node11 = new ListNode(1);
    const node22 = new ListNode(3);
    const node33 = new ListNode(4);
    node11.next = node22
    node22.next = node33
    console.log(mergeTwoLists(node1, node11), '1')
}




/**
 * 链表结点的删除
 * 给定一个排序链表，删除所有重复的元素，使得每个元素只出现一次
 * 1->1->4   1->4
 * 1->1->2->3->3  1->2->3
 */ 
const deleteDuplicates = function(head) {
    // 设定 cur 指针，初始位置为链表第一个结点
    let cur = head;
    while(cur){
        if(cur.val && cur.next && cur.val === cur.next.val){
            cur.next = cur.next.next
        } else {
            cur = cur.next
        }
    }

    return head
};

{
    const node1 = new ListNode(1);
    const node2 = new ListNode(1);
    const node3 = new ListNode(4);
    node1.next = node2
    node2.next = node3


    const node11 = new ListNode(1);
    const node22 = new ListNode(1);
    const node33 = new ListNode(2);
    const node44 = new ListNode(3);
    const node55 = new ListNode(3);
    node11.next = node22
    node22.next = node33
    node33.next = node44
    node44.next = node55
    console.log(deleteDuplicates(node1), '2')
    console.log(deleteDuplicates(node11), '2')
}


/**
 * 删除问题的延伸——dummy 结点登场
 * 给定一个排序链表，删除所有含有重复数字的结点，只保留原始链表中 没有重复出现的数字。
 * 
 * 1->1->4   4
 * 1->1->2->3->3->3->4  2->4
 */
const deleteDuplicates222 = function(head) {
    const dummy = new ListNode();
    dummy.next = head;
    let cur = dummy;
    while(cur){
        if(cur.next && cur.next.next && cur.next.val === cur.next.next.val){
            let val = cur.next.val
            while(cur.next && cur.next.val === val){
                cur.next = cur.next.next 
            }
        } else {
            cur = cur.next
        }
    }

    return dummy.next
};

{
    const node1 = new ListNode(1);
    const node2 = new ListNode(1);
    const node3 = new ListNode(4);
    node1.next = node2
    node2.next = node3


    const node11 = new ListNode(1);
    const node22 = new ListNode(1);
    const node33 = new ListNode(2);
    const node44 = new ListNode(3);
    const node55 = new ListNode(3);
    const node66 = new ListNode(3);
    const node77 = new ListNode(4);
    node11.next = node22
    node22.next = node33
    node33.next = node44
    node44.next = node55
    node55.next = node66
    node66.next = node77
    console.log(deleteDuplicates222(node1), '3')
    console.log(JSON.stringify(deleteDuplicates222(node11)), '3')
}