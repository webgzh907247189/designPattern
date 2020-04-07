class Component{
    constructor(props,context){
        this.props = props;
        this.context = context;
    }
}

// 在 React 内部，通过这个变量 来判断是不是一个React 组件的
// 在 React 内部，一个是类组件，一个是函数组件

Component.prototype.isReactComponent = {};
export { Component }