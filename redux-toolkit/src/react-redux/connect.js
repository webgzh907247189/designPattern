import { ReactContext } from ".";
import React from "react";
import { bindActionCreators } from '../redux'

export default function connect(mapStateToprops, mapDispatchToProps) {
  return function (Wrapper) {

    return class extends React.Component {
      static contextType = ReactContext;
      constructor(props, context) {
        super(props);

        const { store: { getState, subscribe, dispatch } = {} } = context;
        this.state = mapStateToprops(getState());
        this.unsubscribe = subscribe(() => {
          this.setState(mapStateToprops(getState()));
        });

        let boundAction
        if (typeof mapDispatchToProps === "function") {
            boundAction = mapDispatchToProps(dispatch)
            // {
            //     xxx: add(){
            //         dispatch({type: ADD})
            //     }
            // }
        } else {
            boundAction = bindActionCreators(mapDispatchToProps, dispatch)
            // {
            //     xxx: (...args)=>{
            //         dispatch(action[xxx](args))
            //     }
            // }
        }
        this.boundAction = boundAction
      }

      componentWillUnmount() {
        this.unsubscribe();
      }
      render() {
        return <Wrapper {...this.props} {...this.boundAction} {...this.state} />;
      }
    };
  };
}
