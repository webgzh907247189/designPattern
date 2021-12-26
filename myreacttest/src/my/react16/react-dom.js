import { TAG_ROOT }  from './constant';

// 把元素渲染到容器
function render(element, container){
    let rootFiber = {
        tag: TAG_ROOT, // 每个fiber 类似 vdom，每个fiber 含有一个tag
        stateNode: container, // 节点是一个 原生节点，stateNode 指向原生dom元素

        // props.children 是一个数组，里面放的是react元素，vdom 会根据每个 react元素创建对应到 fiber
        props: { children: [element] }, // 这个fiber 到属性对象 children 属性，里面放的是需要渲染到元素
    }

    scheduleRoot(rootFiber);
}

const ReactDOM = {
    render
}
export default ReactDOM;

/**
 * React 里面抽离单独到包 -> vue 3.0 也在抽离单独到包
 * 
 * schedule
 * reconciler 
 */