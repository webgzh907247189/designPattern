import React from "react";
import { Route } from "react-router-dom";
import { LOCATION_CHANGE } from "./action";

// 当派发一个动作，告诉仓库修改状态
export default class ConnectedRouter extends React.Component{
    componentDidMount(){

    }

    render(){
        return <Route history={this.props.history}>
            {
                this.props.children
            }
        </Route>
    }
}   