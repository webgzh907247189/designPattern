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

                if(typeof action == 'function'){
                    this.boundAction = action(context.store.dispatch,props)
                    // {
                    //     xxx: add(){
                    //         dispatch({type: ADD})
                    //     }
                    // }
                }else{
                    this.boundAction = bindActionCreators(action,context.store.dispatch)
                    // {
                    //     xxx: ()=>{
                    //         dispatch(action[xxx]())
                    //     }
                    // }
                }
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
                // 在这里，每次render 都会重新计算
                // let boundAction = bindActionCreators(action,this.context.store.dispatch)
                return <WarppendCom {...this.state} {...this.boundAction}/>
            }
        }
    }
}