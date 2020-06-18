// import React, { Component } from './source/react';
import React, { Component } from 'react';
import ReactDOM from 'react-dom';

class App extends Component {
  static defaultProps = {
    name: 'app'
  }

  render(){
    let element = React.createElement('div', 
      {id: this.props.title + '__' + this.props.name}, 
      React.createElement('p',{ key: 'p_key' },1), //key: 'p_key',ref: 'p_ref'
      React.createElement('button',{ key: 'button_key', },'+'), // key: 'button_key',ref: 'button_ref'
    )
    console.log(element)
    return element;
  }
}

let element = React.createElement(App, {title: 'test'});
console.log(element)

// ReactDOM.render(element,document.getElementById('root'));


class Child extends Component {
  render(){
    console.log(this.props.children)
    const mappedChildren = React.Children.map(
      this.props.children,
      (item,index) => ([<div key={`div${index}A`}>{item}</div>,<div key={`div${index}B`}>{item}</div>])
    )
    console.log(mappedChildren)
    return (
      <div>
        {
          mappedChildren
        }
      </div>
    )
  }
}
class AppTrue extends Component {
  render(){
    return (
      <Child>
        <div>child1</div>
        <div key="child2">child2</div>
        <div key="child3">child3</div>
        {
          [
            <div key="child4">child4</div>,
            <div key="child5">child5</div>,
            <div key="child6">child6</div>
          ]
        }
      </Child>
    )
  }
}
ReactDOM.render(<AppTrue/>,document.getElementById('root'));
