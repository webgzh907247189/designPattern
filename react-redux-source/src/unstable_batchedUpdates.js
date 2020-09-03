import React from "react";
import ReactDOM, { unstable_batchedUpdates } from "react-dom";

// unstable_batchedUpdates会把子组件的forceUpdate干掉，防止组件在一个批量更新中重新渲染两次 ​​​​
// 应该是从当前的 unstable_batchedUpdates 组件 开始向下 进行 render

// https://zhuanlan.zhihu.com/p/78516581

// 第一个和第三个 button 都只触发了一次 render
// 而第二个 button 触发了两次 render

class App extends React.Component {
  constructor(props) {
    super(props);
    // 记录 render 的执行次数
    this.renderCount = 0;
    this.testRef = React.createRef();
  }

  fn1 = () => {
    this.setState({ a: Math.random() });
    this.setState({ b: Math.random() });
  };

  fn2 = () => {
    // 模拟一个异步操作，真实业务里面可能是网络请求等
    setTimeout(() => {
      this.setState({ a: Math.random() });
      this.setState({ a: Math.random() });
    }, 0);
  };

  fn3 = () => {
    // 模拟一个异步操作，真实业务里面可能是网络请求等
    setTimeout(
      unstable_batchedUpdates(() => {
        console.log(this.forceUpdate, this.refs.test1);
        // this.setState({ a: Math.random() });
        // this.setState({ a: Math.random() });
        this.forceUpdate();
        // this.refs.test1.forceUpdate();
      }),
      0
    );
  };

  render() {
    ++this.renderCount;
    return (
      <div>
        <h1>截止到目前 render 执行次数{this.renderCount}</h1>
        <button onClick={this.fn1}>同步的 setState 两次</button>
        <br />
        <button onClick={this.fn2}>在一个异步的事件循环里 setState 两次</button>
        <br />
        <Test ref="test1" />
        <button onClick={this.fn3}>
          在一个异步的事件循环里 setState 两次, 但是使用
          ReactDOM.unstable_batchedUpdates 强制 batch
        </button>
      </div>
    );
  }
}

// const Test1 = React.forwardRef(Test);
class Test extends React.Component {
  render() {
    console.log("Test--render");
    return <div>1111</div>;
  }
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
