import React from "react";
import { connect } from 'react-redux';

import { CounterState } from '../store/reducer'
import actions from '../store/action'

type Props = CounterState & typeof actions;

class Counter extends React.Component<Props>{
    render(){
        return <>
            <p>{this.props.number}</p>
            <button onClick={this.props.increment}>+</button>
            <button onClick={this.props.asyncIncrement}>异步+1</button>
        </>   
    }
}

export default connect((state: CounterState): CounterState => {
    return state
}, actions)(Counter)