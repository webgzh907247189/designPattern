// 从跟节点开始渲染 和调度
/**
 * 每个渲染阶段 有两个阶段  ( diff 和 render 其实是一样)
 * ->  diff(对比新旧vdom)  -> 拆分 使用fiber拆分任务，大任务拆分为小任务 (按照帧进行调度，可以暂停，看当前这一帧调度情况)
 * 
 * -> render 阶段成果  ->  是effect list 知道哪些节点更新哪些节点删除，哪些节点新增
 * render 阶段 (比较耗时)  两个任务 1.根据vdom生成fiber树  2. 生成 effect List
 * 
 * ->  commit 阶段  
 * dom更新创建阶段，不可暂停，必须保证连续性
 */

 import { TAG_ROOT } from './constant';

 let nextUnitOfWork = null
 let workInProgressRoot = null
function scheduleRoot(rootFiber){
    workInProgressRoot = rootFiber // 保留 rootFiber 下面会修改 rootFiber，保存一个副本
    nextUnitOfWork = rootFiber   
}

// 循环执行工作
function workLoop(deadLine){
    // 是否需要让出执行任务控制权
    let shouldYield = false

    while(nextUnitOfWork && !shouldYield){
        nextUnitOfWork = performUnitOfWork(nextUnitOfWork)

        shouldYield = deadLine.timeRemaining() < 1; //没有时间，让出执行任务控制权
    }

    if(nextUnitOfWork){
        requestIdleCallback(workLoop, { timeout: 500 })
    }else{
        console.log('render 阶段结束')
    }
}

// 返回新的 下个单元 work
function performUnitOfWork(currentFiber){
    beginWork(currentFiber)
}

// 创建dom元素
function beginWork(currentFiber){
    if(currentFiber.tag === TAG_ROOT){
        updateHostRoot(currentFiber)
    }
}

function updateHostRoot(){
    
}

requestIdleCallback(workLoop, { timeout: 500 })