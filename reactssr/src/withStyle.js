import React from 'react'
export default function (Cpmponent,style){
    return class extends React.Component{
        componentWillMount(){
            if(this.props.staticContext){
                this.props.staticContext.csses.push(style._getCss())
            }
        }

        render(){
            return <Cpmponent {...this.props}/>
        }
    }
}