import React from "react";
import { Route } from "react-router-dom";
import { LOCATION_CHANGE } from "./action";
import { ReactReduxContext } from "react-redux";

// 当派发一个动作，告诉仓库修改状态
export default class ConnectedRouter extends React.Component{
    static contextType = ReactReduxContext
    
    componentDidMount(){
        this.unListener = this.props.history.listen((location, action) => {
            this.context.store.dispatch({
                type: LOCATION_CHANGE,
                payload: {location,action}
            })
        })
    }

    componentWillUnmount(){
        this.unListener();
    }

    render(){
        return <Route history={this.props.history}>
            {
                this.props.children
            }
        </Route>
    }
}   