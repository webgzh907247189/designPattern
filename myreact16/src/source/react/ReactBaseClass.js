let emptyObject = {};

class Component{
    constructor(props,context){
        this.props = props;
        this.context = context;
        this.refs = emptyObject;
    }
}

// 在 React 内部，通过这个变量 来判断是不是一个React 组件的
// 在 React 内部，一个是类组件，一个是函数组件

// 不在 class 上面，在 prototype 上面
Component.prototype.isReactComponent = {};

class PureComponent extends Component {

}
PureComponent.prototype.isPureReactComponent = true;

export { Component }