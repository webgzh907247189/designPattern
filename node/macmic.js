/**
 * 浏览器就两个队列 宏任务 微任务
 * node 分成n个队列
 * setImmediate 与 setTimeout 是不同的队列，对应的是 check, time
 * 
 * node 事件环 ->  每取完一个宏任务，清空微任务队列 跟 浏览器保持一致
 * 老版本的node 是清空整个任务队列，才进行微任务清空
 */

{
    // 浏览器与Node的事件循环(Event Loop)区别
    // 一个浏览器通常由以下常驻线程组成：
    //     GUI 渲染线程  (，解析HTML、CSS，构建DOM树，布局和绘制等)
    //     JavaScript引擎线程  (责处理 JavaScript脚本，执行代码。该线程与 GUI渲染线程互斥，当 JS引擎线程执行 JavaScript脚本时间过长，将导致页面渲染的阻塞)
    //     定时触发器线程 (负责执行异步定时器一类的函数的线程，如： setTimeout，setInterval。)
    //     事件触发线程 (主要负责将准备好的事件交给 JS引擎线程执行)
    //     异步http请求线程 (负责执行异步请求一类的函数的线程，如： Promise，axios，ajax等)
    

    // Node.js的运行机制如下:
    //     V8引擎解析JavaScript脚本。
    //     解析后的代码，调用Node API。
    //     libuv库负责Node API的执行。它将不同的任务分配给不同的线程，形成一个Event Loop（事件循环），以异步的方式将任务的执行结果返回给V8引擎。
    //     V8引擎再将结果返回给用户。
    
    
    
    // node中的事件循环的顺序：
    //     外部输入数据-->轮询阶段(poll)-->检查阶段(check)-->关闭事件回调阶段(close callback)-->定时器检测阶段(timer)-->
    //     I/O事件回调阶段(I/O callbacks)-->闲置阶段(idle, prepare)-->轮询阶段（按照该顺序反复运行）
        
    //     1.update_time
    //     //在事件循环的开头，这一步的作用实际上是为了获取一下系统时间，以保证之后的timer有个计时的标准。这个动作会在每次事件循环的时候都发生，确保了之后timer触发的准确性。（其实也不太准确....)
        
    //     timers 阶段：这个阶段执行timer（setTimeout、setInterval）的回调
    //     I/O callbacks(pedding callback) 阶段：处理一些上一轮循环中的少数未执行的 I/O 回调
    //     idle, prepare 阶段：仅node内部使用
    //     poll 阶段：获取新的I/O事件, 适当的条件下node将阻塞在这里 (wrireFile readFile方法)
    //     check 阶段：执行 setImmediate() 的回调
    //     close callbacks 阶段：执行 socket 的 close 事件回调   
}


{
    // 执行顺序不一定 -> 代码执行的时候，node服务比较慢，
    setImmediate(()=>{
        console.log('setImmediate')
    })

    setTimeout(()=>{
        console.log('setTimeout')
    })
}



let fs = require('fs')
let path = require('path')
{
    // 执行顺序是固定的，因为 poll阶段下面是 check阶段 
    // setImmediate--readFile ->  setTimeout--readFile

    fs.readFile(path.resolve(__dirname,'./test.js'),()=>{
        setTimeout(()=>{
            console.log('setTimeout--readFile')
        })

        setImmediate(()=>{
            console.log('setImmediate--readFile')
        })
    })
}


{
    process.nextTick(()=>{
        console.log('process-nextTick')
    })

    Promise.resolve().then(()=>{
        console.log('promise-then')
    })
}   