import React, { Component } from './source/react';
import ReactDOM from 'react-dom';

class App extends Component {
  static defaultProps = {
    name: 'app'
  }

  render(){
    let element = React.createElement('div', 
      {id: this.props.title + '__' + this.props.name}, 
      React.createElement('p',{},1), //key: 'p_key',ref: 'p_ref'
      React.createElement('button',{},'+'), // key: 'button_key',ref: 'button_ref'
    )
    console.log(element)
    return element;
  }
}

let element = React.createElement(App, {title: 'test'});
console.log(element)

ReactDOM.render(element,document.getElementById('root'));
