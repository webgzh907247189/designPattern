export const patchEvent = (el, eventName, naxtVal) => {
    // 先移除事件，在绑定
    // remove -> add  ---->  const add = () => { 自定义事件 }
    let invokers = el._vei || (el._vei = {});
    let extis = invokers[eventName];
    // 已经绑定过事件了,并且这一次需要重新绑定 新事件
    if (extis && naxtVal) {
        // 直接更新事件
        extis.value = naxtVal;
    }
    else {
        let event = eventName.slice(2).toLowerCase();
        if (naxtVal) {
            let invoker = invokers[eventName] = createInvoker(naxtVal);
            el.addEventListener(event, invoker);
        }
        else if (extis) {
            // 上次绑定的 存在事件， 这次取消了这个事件
            el.removeEventListener(event, extis);
            invokers[eventName] = undefined;
        }
    }
};
// 每次更新 value 属性
function createInvoker(cb) {
    const invoker = (e) => invoker.value(e);
    invoker.value = cb;
    return invoker;
}
//# sourceMappingURL=event.js.map