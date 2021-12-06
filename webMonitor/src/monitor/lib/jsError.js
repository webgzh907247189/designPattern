import getlastEvent from "../util/getlastEvent";
import getSelector from '../util/getSelector';
import tracker from "../util/tracker";

// https://mp.weixin.qq.com/s/d-P8s51U6IfJ-VrRkGygLA
export function injectError(){
    // 加上 return true， 错误就不会抛到控制台
    // window.onerror = function (msg, url, row, col, error) {
    //     console.log(error, '111--error');
    //     // return true;
    // }

    window.addEventListener('error', (event) => {
        // debugger
        // console.log(event, 'event');
        let lastEvent = getlastEvent(); // 最后一个交互事件
        // console.log(lastEvent, 'lastEvent');

        // js 或者 css 资源加载错误
        if(event.target && (event.target || event.href)){
            let log = {
                kind: 'stability', // 监控指标到大类 稳定性
                type: 'error', //小类型 错误
                errorType: 'resourceError',
                // messgae: event.message,
                filename: event.target.src || event.href,
                tagName: event.target.tagName,
                // getSelector 返回元素到选择器
                selector: getSelector(event.target), // 最后一个操作到元素
            }
            tracker.send(log)
        }else {
            let log = {
                kind: 'stability', // 监控指标到大类 稳定性
                type: 'error', //小类型 错误
                errorType: 'jsError',
                messgae: event.message,
                filename: event.filename,
                position: `${event.lineno}..${event.colno}`,
                stack: getLines(event.error.stack), // 错误堆栈
    
                // getSelector 返回元素到选择器
                selector: lastEvent ? getSelector(lastEvent.path) : '', // 最后一个操作到元素
            }
            tracker.send(log)
        }
    }, true) // 捕获 link 或者 script 加载错误 必须要在 捕获阶段完成




    window.addEventListener('unhandledrejection', (event) => {
        console.log(event, 'event')
        let lastEvent = getlastEvent(); // 最后一个交互事件

        let message
        let reason = event.reason
        let stack = ''
        let line= 0 ;
        let col = 0;
        let filename;
        // 被 reject 出来的
        if(typeof reason === 'string'){
            message = reason
        }else if(typeof reason === 'object'){  // 没有调用 reject()
            if(reason.stack){
                let mactchResult = reason.stack.match(/at\s+(.+):(\d+):(\d+)/)
                filename = mactchResult[1]
                line = mactchResult[2]
                col = mactchResult[3]
            }
            message = reason.message
            stack = getLines(reason.stack);
        }

        tracker.send({
            kind: 'stability', // 监控指标到大类 稳定性
            type: 'error', //小类型 错误
            errorType: 'promiseError',
            message,
            filename,
            position: `${line}..${col}`,
            stack, // 错误堆栈

            // getSelector 返回元素到选择器
            selector: lastEvent ? getSelector(lastEvent.path) : '', // 最后一个操作到元素
        })
    })
}

function getLines(stack){
    return stack.split('\n').slice(1).map(item => item.replace(/^\s+at\s+/g, '')).join('^')
}

