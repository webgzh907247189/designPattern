export const nodeOps = {
    insert(child, parent, anchor = null) {
        parent.insertBefore(child, anchor); // anchor 为 null 的话 insertBefore 可以等价于 appendChild
    },
    // 删除节点
    remove(child) {
        let parentNode = child.parentNode;
        if (parentNode) {
            parentNode.removeChild(child);
        }
    },
    // 文本节点
    // 元素节点动态变更
    setElementText(el, text) {
        // 不采用 innerHTML 用 textContent
        el.textContent = text;
    },
    setText(node, text) {
        node.nodeValue = text;
    },
    querySelector(selector) {
        return document.querySelector(selector);
    },
    parentNode(node) {
        return node.parentNode;
    },
    nextSibiling(node) {
        return node.nextSibiling;
    },
    createElement(ele) {
        return document.createElement(ele);
    },
    createText(ele) {
        return document.createTextNode(ele);
    },
};
//# sourceMappingURL=nodeOps.js.map