import React from 'react'
import ReactReduxContext from './context' 
import bindActionCreators from '../redux/bindActionCreators'

/**
 * 此方法把 组件和仓库进行关联 ->  连接
 */

export default function(mapStateToprops,action){
    return (WarppendCom) =>{
        return class extends React.Component{
            // ??? 不加的话，下面的context 没有值
            static contextType = ReactReduxContext
    
            constructor(props,context){
                super(props)
                this.state = mapStateToprops(context.store.getState())
            }
    
            componentDidMount(){
                this.unSubscribe = this.context.store.subscribe(()=>{
                    this.setState(
                        mapStateToprops(this.context.store.getState())
                    )
                })
            }
    
            componentWillUnmount(){
                this.unSubscribe()
            }
    
            render(){
                let boundAction = bindActionCreators(action,this.context.store.dispatch)
                return <WarppendCom {...this.state} {...boundAction}/>
            }
        }
    }
}