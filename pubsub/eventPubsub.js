/**
 * https://juejin.cn/post/6991992950876028959
 */

window._on = window.addEventListener;
window._off = window.removeEventListener;
window._emit = (type, data) => window.dispatchEvent(new CustomEvent(type, {
    detail: data
}));;

window._once = (type, callback) => window.addEventListener(type, callback, {
    once: true, // 表示 listener 在添加之后最多只调用一次。如果是 true， listener 会在其被调用之后自动移除。
    capture: true // 表示 listener 会在该类型的事件捕获阶段传播到该 EventTarget 时触发。
});




function onEventX(ev) {
    console.log("event-x 收到数据:", ev.detail);
}

// 订阅
window._on("event-x", onEventX);
window._once("event-once", ev => console.log("event-once 收到数据:", ev.detail));



// once
window._emit("event-once", { uid: -100, message: "you love me" });
window._emit("event-once", { uid: -100, message: "you love me" });
// 订阅和取消订阅
window._emit("event-x", { uid: 100, message: "i love you" })
window._off("event-x", onEventX);
window._emit("event-x", { uid: 100, message: "i love you" })











// addEventListener，removeEventListener，dispatchEvent是EventTarget.prototype中的方法
class EventEmitter extends EventTarget {
    on = this.addEventListener;
    off = this.removeEventListener;
    emit = (type, data) => this.dispatchEvent(new CustomEvent(type, { detail: data }));
    once = (type, callback) => this.on(type, callback, { once: true, capture: true });
}
