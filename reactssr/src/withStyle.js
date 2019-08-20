import React from 'react'
import hoistNonReactStatics from 'hoist-non-react-statics'

export default function (Cpmponent,style){
    class WithStyle extends React.Component{
        componentWillMount(){
            if(this.props.staticContext){
                this.props.staticContext.csses.push(style._getCss())
            }
        }

        render(){
            return <Cpmponent {...this.props}/>
        }
    }

    return hoistNonReactStatics(WithStyle, Cpmponent);
}