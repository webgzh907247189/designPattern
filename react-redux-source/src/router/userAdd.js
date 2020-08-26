import React, { createRef } from "react";
import { withRouter, Prompt } from "react-router";

export default class UserAdd extends React.Component {
  constructor(props) {
    super(props);
    this.userNameRef = createRef();
    this.state = { isBlock: false };
  }

  addForm = () => {
    const val = this.userNameRef.current.value;
    this.setState({ isBlock: val.length ? true : false });
    let user = { id: Date.now(), userName: val };
    let userListStr = JSON.parse(localStorage.getItem("userList")) ?? [];

    userListStr.push(user);
    console.log(userListStr);

    localStorage.setItem("userList", JSON.stringify(userListStr));

    // 这个 props.history 来自于 Route 组件传递的属性
    this.props.history.push("/user/list");
  };

  render() {
    console.log(this.state.isBlock);
    return (
      <>
        <Prompt
          when={this.state.isBlock}
          message={(location) => {
            return `请问是否要跳转${location.pathname}`
          }}
        ></Prompt>
        <input ref={this.userNameRef} />
        <button onClick={this.addForm}>添加</button>
        <TestWithRouter1>测试withRouter</TestWithRouter1>
      </>
    );
  }
}

function TestWithRouter(props) {
  const onJump = () => {
    props.history.push("/login");
  };

  return (
    <>
      <button onClick={onJump}>{props.children}</button>
    </>
  );
}
const TestWithRouter1 = withRouter(TestWithRouter);
